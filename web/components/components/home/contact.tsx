import { Clock, Mail, Phone } from "lucide-react";
import { BOOKING_URL, EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start your teen's success story?</h2>
          <p className="mt-3 max-w-xl text-indigo-100">
            Reach out to our team with any question. We reply within 24 hours.
          </p>
          <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <Mail size={18} /> {EMAIL}
            </a>
            <a href={PHONE_HREF} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/20">
              <Phone size={18} /> {PHONE}
            </a>
            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
              <Clock size={18} /> Mon–Sat, 9am–7pm
            </div>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-indigo-700 transition hover:bg-indigo-50"
          >
            Book a free appointment
          </a>
        </div>
      </div>
    </section>
  );
}
