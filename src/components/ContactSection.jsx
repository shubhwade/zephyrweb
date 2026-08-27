import React from 'react';
import { CONTACT_INFO } from '../data/contacts';
import { ArrowRight, AtSign, Mail, MessageCircle, Phone } from 'lucide-react';

export function ContactSection() {
  const { technicalQueries, helpline, outreachHelpline, professionalBodyContacts } = CONTACT_INFO;

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b-4 border-black pb-4 sm:pb-5">
        <p className="font-neo font-black text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-black/75 mb-2">
          Contacts
        </p>
        <h1 className="font-neo font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight uppercase">
          Need help? Reach the right team directly.
        </h1>
      </header>

      <section className="space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-[0.22em] inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
            Technical Queries
          </span>
        </div>

        <div className="neo-card-lg p-5 sm:p-6 lg:p-7 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="space-y-4 max-w-2xl">
              <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                <Mail className="w-5 h-5 stroke-[2.5px]" />
              </div>

              <div className="space-y-2">
                <h2 className="font-neo font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">
                  Technical Team
                </h2>
                <p className="font-body text-sm sm:text-base text-black/80 font-medium leading-relaxed">
                  Having trouble with registration, the website, or any technical issue?
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-xl">
              <a
                href={`mailto:${technicalQueries.email}`}
                className="neo-btn-primary flex-1 text-center justify-center flex items-center gap-2"
              >
                <Mail className="w-4 h-4 stroke-[2.5px]" />
                <span>Email Technical Team</span>
              </a>

              <a
                href={technicalQueries.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="neo-btn-secondary flex-1 text-center justify-center flex items-center gap-2"
              >
                <AtSign className="w-4 h-4 stroke-[2.5px]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${technicalQueries.email}`}
              className="group flex items-center justify-between gap-3 border-2 border-black bg-[#f5f0e8] px-3 py-3 transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_#000]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4 stroke-[2.5px]" />
                </span>
                <span className="font-neo font-black text-[10px] sm:text-[11px] uppercase tracking-[0.22em] truncate">
                  {technicalQueries.email}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 stroke-[2.5px] shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={technicalQueries.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 border-2 border-black bg-[#f5f0e8] px-3 py-3 transition-all duration-200 hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_#000]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <AtSign className="w-4 h-4 stroke-[2.5px]" />
                </span>
                <span className="font-neo font-black text-[10px] sm:text-[11px] uppercase tracking-[0.22em] truncate">
                  {technicalQueries.instagramHandle}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 stroke-[2.5px] shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-[0.22em] inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
            Technical Helpline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {helpline.map((person) => (
            <div
              key={person.name}
              className="neo-card-lg p-4 sm:p-5 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                  <Phone className="w-4 h-4 stroke-[2.5px]" />
                </div>

                <a
                  href={`tel:${person.phone}`}
                  className="inline-flex items-center gap-1 font-neo font-black text-[10px] uppercase tracking-[0.18em] text-black hover:opacity-70 transition-opacity"
                  aria-label={`Call ${person.name}`}
                >
                  <span>Call</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
                </a>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-neo font-black text-xl text-black uppercase tracking-tight">
                  {person.name}
                </h3>
                <p className="font-body text-xs sm:text-sm text-black/75 font-medium">
                  {person.role}
                </p>
              </div>

              <a
                href={`tel:${person.phone}`}
                className="mt-4 flex items-center gap-2 border-2 border-black bg-[#f5f0e8] px-3 py-2.5 font-neo font-black text-[11px] uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />
                <span>{person.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-[0.22em] inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
            Outreach Helpline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {outreachHelpline.map((person) => (
            <div
              key={person.name}
              className="neo-card-lg p-4 sm:p-5 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                  <Phone className="w-4 h-4 stroke-[2.5px]" />
                </div>

                <a
                  href={`tel:+91${person.phone}`}
                  className="inline-flex items-center gap-1 font-neo font-black text-[10px] uppercase tracking-[0.18em] text-black hover:opacity-70 transition-opacity"
                  aria-label={`Call ${person.name}`}
                >
                  <span>Call</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
                </a>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-neo font-black text-xl text-black uppercase tracking-tight">
                  {person.name}
                </h3>
                <p className="font-body text-xs sm:text-sm text-black/75 font-medium">
                  {person.role}
                </p>
              </div>

              <a
                href={`tel:+91${person.phone}`}
                className="mt-4 flex items-center gap-2 border-2 border-black bg-[#f5f0e8] px-3 py-2.5 font-neo font-black text-[11px] uppercase tracking-[0.16em] text-black transition-colors hover:bg-black hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />
                <span>{`+91 ${person.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}`}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-0.5 bg-black text-white border-2 border-black font-neo font-black text-[10px] uppercase tracking-[0.22em] inline-block shadow-[1.5px_1.5px_0px_0px_#000]">
            Professional Body Contacts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {professionalBodyContacts.map((contact) => (
            <div
              key={contact.committee}
              className="neo-card-lg p-4 sm:p-5 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#000]">
                  <Phone className="w-4 h-4 stroke-[2.5px]" />
                </span>

                <a
                  href={`tel:${contact.phone}`}
                  className="text-black hover:opacity-70 transition-opacity"
                  aria-label={`Call ${contact.name} for ${contact.committee}`}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </a>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="font-neo font-black text-base sm:text-lg text-black uppercase tracking-tight leading-tight">
                  {contact.committee}
                </h3>

                <div>
                  <p className="font-body text-xs sm:text-sm text-black/75 font-medium">
                    {contact.name}
                  </p>
                  <p className="font-neo font-black text-[10px] uppercase tracking-[0.2em] text-black/70 mt-1">
                    {contact.role}
                  </p>
                </div>

                <a
                  href={contact.whatsapp ? `https://api.whatsapp.com/send?phone=91${contact.phone}` : `tel:${contact.phone}`}
                  target={contact.whatsapp ? '_blank' : undefined}
                  rel={contact.whatsapp ? 'noreferrer' : undefined}
                  className="flex items-center gap-2 border-2 border-black bg-[#f5f0e8] px-3 py-2.5 font-neo font-black text-[10px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
                >
                  {contact.whatsapp ? <MessageCircle className="w-3.5 h-3.5 stroke-[2.5px]" /> : <Phone className="w-3.5 h-3.5 stroke-[2.5px]" />}
                  <span>{contact.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
