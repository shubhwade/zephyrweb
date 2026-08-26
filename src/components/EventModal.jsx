import React, { useEffect, useMemo, useState } from 'react';
import { X, Phone, Copy, ArrowRight, MessageCircle, Check, AlertCircle, Sparkles } from 'lucide-react';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhoneDisplay,
  getCommitteeContact,
  getRegistrationRouteForEvent,
  normalizePhoneNumber,
} from '../data/committeeContacts';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  college: '',
  teamName: '',
};

export function EventModal({ event, isOpen, onClose, onRegister, onCopyContact }) {
  const [view, setView] = useState('details');
  const [selectedCommittee, setSelectedCommittee] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waPayload, setWaPayload] = useState(null);
  const [openState, setOpenState] = useState('idle');

  const committeeChoices = useMemo(() => {
    if (!event) return [];
    return getRegistrationRouteForEvent(event);
  }, [event]);

  const selectedCommitteeContact = getCommitteeContact(selectedCommittee);
  const isTeamEvent = event && (Number(event.teamMax || 1) > 1 || Number(event.teamMin || 1) > 1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !event) return;
    const nextCommittee = committeeChoices[0] || event.primaryCommittee || event.committee || '';
    setSelectedCommittee(nextCommittee);
    setView('details');
    setFormData(EMPTY_FORM);
    setErrors({});
    setWaPayload(null);
    setOpenState('idle');
    setIsSubmitting(false);
  }, [event, isOpen, committeeChoices]);

  if (!isOpen || !event) return null;

  const handleFieldChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const strippedPhone = formData.phone.trim();
    const sanitizedPhone = normalizePhoneNumber(strippedPhone);

    if (!trimmedName) nextErrors.fullName = 'Full name is required.';
    if (!trimmedEmail) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) nextErrors.email = 'Enter a valid email address.';
    if (!strippedPhone) nextErrors.phone = 'Phone number is required.';
    else if (!sanitizedPhone) nextErrors.phone = 'Enter a valid Indian phone number.';
    if (!event?.title) nextErrors.event = 'Event is missing.';
    if (!selectedCommittee) nextErrors.committee = 'Committee is missing.';
    else if (!selectedCommitteeContact || !selectedCommitteeContact.phone) nextErrors.committee = 'Registration contact unavailable.';

    return { nextErrors, sanitizedPhone };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nextErrors, sanitizedPhone } = validateForm();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setOpenState('error');
      return;
    }

    if (!selectedCommitteeContact || !selectedCommitteeContact.phone) {
      setErrors({ committee: 'Registration contact unavailable. Please try again later.' });
      setOpenState('error');
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setOpenState('preparing');

    const committeeLabel = selectedCommitteeContact.label || selectedCommittee;
    const message = buildWhatsAppMessage({
      eventName: event.title,
      committeeName: committeeLabel,
      cpName: selectedCommitteeContact.name,
      participantName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: sanitizedPhone ? formatPhoneDisplay(sanitizedPhone) : formData.phone.trim(),
      college: formData.college.trim() || 'N/A',
      teamName: formData.teamName.trim() || undefined,
    });

    const waUrl = buildWhatsAppUrl(selectedCommitteeContact.phone, message);

    const payload = {
      eventName: event.title,
      committee: selectedCommittee,
      cpName: selectedCommitteeContact.name,
      cpPhone: selectedCommitteeContact.phone,
      committeeLabel,
      url: waUrl,
      message,
    };

    setTimeout(() => {
      setWaPayload(payload);
      setView('ready');
      setIsSubmitting(false);
      setOpenState('ready');
    }, 400);
  };

  const handleContinueToWhatsApp = () => {
    if (!waPayload || !waPayload.url) {
      setErrors({ committee: 'Registration contact unavailable. Please try again later.' });
      setOpenState('error');
      return;
    }

    const opened = window.open(waPayload.url, '_blank', 'noopener,noreferrer');
    if (opened) {
      setOpenState('sent');
      if (onRegister) onRegister(event);
      return;
    }

    const fallbackUrl = `https://api.whatsapp.com/send?phone=${normalizePhoneNumber(waPayload.cpPhone)}&text=${encodeURIComponent(waPayload.message)}`;
    const fallbackOpened = window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    if (fallbackOpened) {
      setOpenState('sent');
      if (onRegister) onRegister(event);
      return;
    }

    setView('fallback');
    setOpenState('fallback');
  };

  const handleCopyFallback = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        if (onCopyContact) onCopyContact(text);
      } catch {
        // Ignore clipboard failures and keep the fallback flow intact.
      }
    }
  };

  const renderPrimaryButtonLabel = () => {
    if (isSubmitting) return 'Preparing Registration...';
    if (view === 'ready') return 'Continue to WhatsApp →';
    if (openState === 'error') return 'Try Again';
    return 'Register via WhatsApp';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFDF5] border-4 border-black shadow-[10px_10px_0px_0px_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col md:grid md:grid-cols-12 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative md:col-span-5 bg-black border-b-4 md:border-b-0 md:border-r-4 border-black h-48 sm:h-56 md:h-full min-h-[200px] md:min-h-[420px] flex flex-col justify-between p-3 sm:p-4 overflow-hidden">
          <img
            src={event.image || `/event${event.id}.webp`}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/wordmark/zephyr-full-wordmark.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 md:from-black/90 md:via-black/40 md:to-transparent" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
              {event.tag}
            </span>
            <button
              onClick={onClose}
              aria-label="Close event details"
              className="md:hidden p-1.5 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
              {event.category}
            </span>
            {event.isCollab && (
              <span className="px-2.5 py-0.5 bg-white text-black border-2 border-black font-neo font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                Joint Event
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-7 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-y-auto bg-[#FFFDF5] space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 id="event-modal-title" className="font-neo font-black text-xl sm:text-2xl lg:text-3xl text-black uppercase tracking-tight leading-tight">
                {event.title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close event details"
                className="hidden md:flex p-1.5 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors shrink-0 shadow-[2px_2px_0px_0px_#000]"
              >
                <X className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
            {event.collabNote && (
              <div className="flex items-center gap-2 p-2 bg-black/5 border-2 border-black font-neo font-bold text-[11px] text-black">
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5px] shrink-0" />
                <span>{event.collabNote}</span>
              </div>
            )}
          </div>

          {view === 'details' && (
            <>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="font-neo font-bold text-[9px] sm:text-[10px] text-black/70 uppercase tracking-wider block">Reg Fee</span>
                  <span className="font-neo font-black text-sm sm:text-base text-black truncate block">{event.priceDisplay}</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="font-neo font-bold text-[9px] sm:text-[10px] text-white/80 uppercase tracking-wider block">Prize Pool</span>
                  <span className="font-neo font-black text-sm sm:text-base text-white truncate block">{event.prizeDisplay}</span>
                </div>
                <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="font-neo font-bold text-[9px] sm:text-[10px] text-black/70 uppercase tracking-wider block">Format</span>
                  <span className="font-neo font-black text-sm sm:text-base text-black truncate block">{event.teamDisplay}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-neo font-bold text-[10px] uppercase tracking-widest text-black/70 block">Overview</span>
                <p className="font-body text-xs sm:text-[13px] text-black/85 font-normal leading-relaxed line-clamp-4 md:line-clamp-none">{event.desc}</p>
              </div>

              <div className="p-2.5 sm:p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-black border-2 border-black flex items-center justify-center text-white shrink-0">
                    <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </div>
                  <div>
                    <span className="font-neo font-bold text-[9px] uppercase tracking-wider text-black/70 block">Coordinator</span>
                    <span className="font-neo font-black text-xs text-black">+91 {event.phone_no}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => onCopyContact?.(event.phone_no)} className="neo-btn-outline px-2.5 py-1 text-[11px] flex items-center gap-1" aria-label="Copy phone number">
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                  <a href={`tel:+91${event.phone_no}`} className="neo-btn-secondary px-2.5 py-1 text-[11px] flex items-center gap-1" aria-label="Call coordinator">
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-3">
                <button onClick={onClose} className="neo-btn-outline px-4 py-2 text-xs">Back</button>
                <button onClick={() => setView('register')} className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2">
                  <span>Register</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
                </button>
              </div>
            </>
          )}

          {view === 'register' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="font-neo font-black text-[11px] uppercase tracking-[0.22em] text-black/70">Registering for</p>
                <h4 className="font-neo font-black text-xl sm:text-2xl uppercase text-black">{event.title}</h4>
                <p className="font-body text-xs sm:text-sm text-black/75">
                  Organized by: <span className="font-semibold">{selectedCommitteeContact?.label || 'Committee contact pending'}</span>
                </p>
              </div>

              {committeeChoices.length > 1 && (
                <div className="space-y-2">
                  <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Register through</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {committeeChoices.map((committeeKey) => {
                      const contact = getCommitteeContact(committeeKey);
                      const isActive = selectedCommittee === committeeKey;
                      return (
                        <button
                          key={committeeKey}
                          type="button"
                          onClick={() => setSelectedCommittee(committeeKey)}
                          className={`p-2.5 border-2 text-left transition-all ${
                            isActive
                              ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_#000]'
                              : 'bg-white text-black border-black hover:bg-black/5'
                          }`}
                        >
                          <div className="font-neo font-black text-[10px] uppercase tracking-wider">{committeeKey}</div>
                          <div className="font-body text-[10px] mt-1 opacity-80">{contact?.name || 'Contact unavailable'}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Full Name</label>
                  <input value={formData.fullName} onChange={(e) => handleFieldChange('fullName', e.target.value)} className="w-full border-2 border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none" placeholder="Your name" />
                  {errors.fullName && <p className="text-[11px] text-red-700">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Phone Number</label>
                  <input value={formData.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} className="w-full border-2 border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none" placeholder="9876543210" />
                  {errors.phone && <p className="text-[11px] text-red-700">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Email</label>
                  <input value={formData.email} onChange={(e) => handleFieldChange('email', e.target.value)} className="w-full border-2 border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none" placeholder="you@example.com" />
                  {errors.email && <p className="text-[11px] text-red-700">{errors.email}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">College / Organization</label>
                  <input value={formData.college} onChange={(e) => handleFieldChange('college', e.target.value)} className="w-full border-2 border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none" placeholder="TCET" />
                </div>

                {isTeamEvent && (
                  <>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Team Name</label>
                      <input value={formData.teamName} onChange={(e) => handleFieldChange('teamName', e.target.value)} className="w-full border-2 border-black bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none" placeholder="Team Name" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <p className="font-neo font-bold text-[10px] uppercase tracking-[0.18em] text-black/75 block">Team Size</p>
                      <div className="border-2 border-black bg-white px-3 py-2 text-sm text-black font-medium">{event.teamDisplay || `Team of ${event.teamMin || 1}`}</div>
                    </div>
                  </>
                )}
              </div>

              {errors.committee && (
                <div className="flex items-start gap-2 rounded-none border-2 border-red-700 bg-red-50 px-3 py-2 text-red-800 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errors.committee}</span>
                </div>
              )}

              <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-3">
                <button type="button" onClick={() => setView('details')} className="neo-btn-outline px-4 py-2 text-xs">Back</button>
                <button type="submit" disabled={isSubmitting} className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{renderPrimaryButtonLabel()}</span>
                </button>
              </div>
            </form>
          )}

          {view === 'ready' && waPayload && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-black">
                <Check className="w-5 h-5 text-green-800" />
                <span className="font-neo font-black text-[11px] uppercase tracking-[0.18em]">Registration Request Ready</span>
              </div>

              <div className="space-y-2 border-2 border-black bg-white p-3 sm:p-4 shadow-[2px_2px_0px_0px_#000]">
                <p className="font-body text-xs text-black/80">Your registration request for:</p>
                <p className="font-neo font-black text-xl uppercase text-black">{waPayload.eventName}</p>
                <p className="font-body text-xs text-black/80">will be sent to:</p>
                <p className="font-neo font-black text-base uppercase text-black">{waPayload.cpName} — {waPayload.committeeLabel}</p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t-2 border-black">
                <button onClick={() => setView('register')} className="neo-btn-outline px-4 py-2 text-xs">Edit Details</button>
                <button onClick={handleContinueToWhatsApp} className="neo-btn-primary px-5 sm:px-6 py-2 text-xs flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Continue to WhatsApp →</span>
                </button>
              </div>
            </div>
          )}

          {view === 'fallback' && waPayload && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-black">
                <AlertCircle className="w-5 h-5 text-red-700" />
                <span className="font-neo font-black text-[11px] uppercase tracking-[0.18em]">Unable to open WhatsApp</span>
              </div>

              <div className="space-y-2 border-2 border-black bg-white p-3 sm:p-4 shadow-[2px_2px_0px_0px_#000]">
                <p className="font-body text-xs text-black/80">CP: <span className="font-semibold">{waPayload.cpName}</span></p>
                <p className="font-body text-xs text-black/80">Committee: <span className="font-semibold">{waPayload.committeeLabel}</span></p>
                <p className="font-body text-xs text-black/80">Phone: <span className="font-semibold">{formatPhoneDisplay(waPayload.cpPhone)}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleCopyFallback(waPayload.message)} className="neo-btn-secondary px-3 py-2 text-[11px]">Copy Message</button>
                <button onClick={() => handleCopyFallback(formatPhoneDisplay(waPayload.cpPhone))} className="neo-btn-outline px-3 py-2 text-[11px]">Copy Number</button>
              </div>

              <button onClick={() => setView('register')} className="neo-btn-primary px-4 py-2 text-xs w-full">Try Again</button>
            </div>
          )}

          {openState === 'sent' && (
            <div className="flex items-center gap-2 rounded-none border-2 border-green-700 bg-green-50 px-3 py-2 text-green-800 text-xs font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>WhatsApp opened. Please tap Send to contact the CP.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
