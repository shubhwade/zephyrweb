import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/contacts';
import { MapPin, Mail, Phone, ExternalLink, Send, CheckCircle2, Copy } from 'lucide-react';

export function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    committee: 'TSDW',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (onShowToast) {
        onShowToast('Please fill in your name, email, and message.', 'error');
      }
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onShowToast) {
        onShowToast('Message transmitted. The TSDW team will respond shortly.', 'success');
      }
      setFormData({
        name: '',
        email: '',
        committee: 'TSDW',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  const copyNumber = (num, label = 'Number') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num);
    }
    if (onShowToast) {
      onShowToast(`${label} (${num}) copied to clipboard.`);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-4 border-black pb-4 sm:pb-5">
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          Contact & Connect
        </h1>
      </div>

      {/* 2. Top 3-Column Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Card 1: Campus Location */}
        <div className="neo-card-lg p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
              <MapPin className="w-4 h-4 stroke-[2.5px]" />
            </div>

            <div className="space-y-0.5">
              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1px_1px_0px_0px_#000]">
                CAMPUS LOCATION
              </span>
              <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight">
                TCET Mumbai
              </h3>
            </div>

            <p className="text-xs text-black/80 font-medium leading-relaxed font-body">
              Thakur Educational Campus, Shyamnarayan Thakur Marg, Thakur Village, Kandivali East, Mumbai 400101.
            </p>
          </div>

          <div className="pt-3 border-t-2 border-black">
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-neo font-bold text-black hover:opacity-60 transition-colors uppercase tracking-wider"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5px]" />
            </a>
          </div>
        </div>

        {/* Card 2: Official Desks */}
        <div className="neo-card-lg p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
              <Mail className="w-4 h-4 stroke-[2.5px]" />
            </div>

            <div className="space-y-0.5">
              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1px_1px_0px_0px_#000]">
                EMAIL DIRECTORY
              </span>
              <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight">
                Official Desks
              </h3>
            </div>

            <div className="space-y-1.5 font-body text-xs">
              {CONTACT_INFO.emails.map((e) => (
                <div key={e.address} className="flex items-center justify-between gap-2 p-2 bg-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  <span className="font-neo font-bold text-black text-[10px] uppercase tracking-wider">{e.label}:</span>
                  <a
                    href={`mailto:${e.address}`}
                    className="font-medium text-black hover:opacity-60 transition-colors truncate text-xs underline"
                  >
                    {e.address}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t-2 border-black font-neo font-bold text-[10px] uppercase tracking-wider text-black">
            Response Time: &lt; 24 Hours
          </div>
        </div>

        {/* Card 3: Central Helplines */}
        <div className="neo-card-lg p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
              <Phone className="w-4 h-4 stroke-[2.5px]" />
            </div>

            <div className="space-y-0.5">
              <span className="px-2 py-0.5 bg-white text-black border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1px_1px_0px_0px_#000]">
                DIRECT HELPLINES
              </span>
              <h3 className="font-neo font-black text-lg sm:text-xl text-black uppercase tracking-tight">
                Student Leads
              </h3>
            </div>

            <div className="space-y-1.5 font-body text-xs">
              {CONTACT_INFO.phones.map((p) => (
                <div
                  key={p.number}
                  className="flex items-center justify-between gap-2 p-2 bg-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000]"
                >
                  <div>
                    <span className="font-neo font-bold text-[10px] text-black uppercase tracking-wider block">{p.label}</span>
                    <span className="font-neo font-black text-black text-xs">{p.number}</span>
                  </div>
                  <button
                    onClick={() => copyNumber(p.number, p.label)}
                    className="p-1 hover:opacity-60 text-black transition-colors"
                    aria-label={`Copy ${p.label} number`}
                  >
                    <Copy className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t-2 border-black font-neo font-bold text-[10px] uppercase tracking-wider text-black">
            Operating Hours: 08:00 — 20:00 IST
          </div>
        </div>

      </div>

      {/* 3. Main 2-Column Section: Inquiry Form & Chapter Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left: Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="neo-card-lg p-6 sm:p-8 space-y-6 h-full flex flex-col justify-between">
            
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
                INQUIRY FORM
              </span>
              <h2 className="font-neo font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-black/80 font-body font-medium">
                For registrations, rulebook clarifications, or general inquiries.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 sm:p-8 bg-black text-white border-3 border-black text-center space-y-3 shadow-[4px_4px_0px_0px_#000] my-auto">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mx-auto text-black shadow-[2px_2px_0px_0px_#000]">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5px]" />
                </div>
                <h3 className="font-neo font-black text-2xl text-white uppercase">
                  Message Transmitted
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-body font-medium max-w-sm mx-auto">
                  Thank you. The TSDW team will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-neo text-xs font-bold uppercase text-black tracking-wider block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm text-black focus:outline-none focus:bg-black/5 transition-all font-body font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-neo text-xs font-bold uppercase text-black tracking-wider block">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email address"
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm text-black focus:outline-none focus:bg-black/5 transition-all font-body font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-neo text-xs font-bold uppercase text-black tracking-wider block">
                      Chapter
                    </label>
                    <select
                      value={formData.committee}
                      onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm text-black focus:outline-none focus:bg-black/5 transition-all font-body font-medium"
                    >
                      <option value="TSDW">TSDW Central Desk</option>
                      <option value="CSI">CSI</option>
                      <option value="ASCE">ASCE</option>
                      <option value="OWASP">OWASP</option>
                      <option value="TRS">TRS</option>
                      <option value="ACM">ACM</option>
                      <option value="S4DS">S4DS</option>
                      <option value="IEEE">IEEE</option>
                      <option value="IETE">IETE</option>
                      <option value="SIGAI">ACM-SIGAI</option>
                      <option value="IOT">IOT / IEI</option>
                      <option value="ASME">ASME</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-neo text-xs font-bold uppercase text-black tracking-wider block">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Topic of inquiry"
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm text-black focus:outline-none focus:bg-black/5 transition-all font-body font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-neo text-xs font-bold uppercase text-black tracking-wider block">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm text-black focus:outline-none focus:bg-black/5 transition-all font-body font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="neo-btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 stroke-[2.5px]" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

        {/* Right: Chapter Coordinators Directory (5 cols) */}
        <div className="lg:col-span-5">
          <div className="neo-card-lg p-6 sm:p-8 space-y-5 h-full flex flex-col justify-between">
            
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-wider inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
                CHAPTER HELPLINES
              </span>
              <h2 className="font-neo font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
                11 Committee Leads
              </h2>
              <p className="text-xs sm:text-sm text-black/80 font-body font-medium">
                Reach student committee coordinators directly for event-specific questions.
              </p>
            </div>

            {/* Scrollable Helplines List */}
            <div className="space-y-2.5 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1">
              {CONTACT_INFO.committeeHelplines.map((c) => (
                <div
                  key={c.committee}
                  className="flex items-center justify-between p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-neo font-black text-xs text-black">{c.committee}</span>
                      <span className="text-[10px] text-black">•</span>
                      <span className="font-body text-xs text-black/80">{c.lead}</span>
                    </div>
                    <span className="font-neo font-bold text-xs text-black block mt-0.5">
                      {c.phone}
                    </span>
                  </div>

                  <button
                    onClick={() => copyNumber(c.phone, c.committee)}
                    className="p-1.5 text-black hover:opacity-60 transition-colors"
                    aria-label={`Copy contact for ${c.committee}`}
                  >
                    <Copy className="w-4 h-4 stroke-[2.5px]" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 text-center border-t-2 border-black">
              <span className="font-neo font-bold text-[10px] text-black uppercase tracking-wider">
                Autonomous • Affiliated to Mumbai University
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
