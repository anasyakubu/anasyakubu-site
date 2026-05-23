// src/components/contact/ContactForm.tsx
import React, { useMemo, useState } from 'react';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Check,
  AlertCircle,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


// ---------- Config ----------

const EMAIL = 'yakubuanas04@gmail.com';

const channels = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: '@anasyakubu',
    href: 'https://github.com/anasyakubu',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    value: '/in/anasyakubu',
    href: 'https://linkedin.com/in/anasyakubu',
    icon: FaLinkedin,
  },
  {
    label: 'X / Twitter',
    value: '@anasyakubu',
    href: 'https://x.com/anasyakubu',
    icon: FaXTwitter,
  },
  {
    label: 'YouTube',
    value: '@anasyakubu',
    href: 'https://youtube.com/@anasyakubu',
    icon: FaYoutube,
  },
];

const projectTypes = ['Web App', 'Frontend', 'Full-Stack', 'Freelance', 'Other'];

// ---------- Component ----------

interface FormState {
  name: string;
  email: string;
  type: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    type: 'Web App',
    message: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.email.trim()) e.email = 'An email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'That email looks off';
    if (!form.message.trim()) e.message = 'Tell me a little about it';
    else if (form.message.trim().length < 10)
      e.message = 'A bit more detail, please';
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const update = (key: keyof FormState, val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    // Opens the user's mail client pre-filled. Swap this for a real
    // endpoint (Formspree / Resend / your API) when you have one.
    const subject = encodeURIComponent(
      `[${form.type}] New project enquiry from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="relative bg-zinc-950 text-white border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ---------- Form ---------- */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 02</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Send a message</span>
            </div>

            {sent ? (
              <SuccessState
                name={form.name}
                onReset={() => {
                  setSent(false);
                  setForm({ name: '', email: '', type: 'Web App', message: '' });
                  setTouched({});
                }}
              />
            ) : (
              <div className="space-y-6">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field
                    label="Your name"
                    error={touched.name ? errors.name : undefined}
                  >
                    <input
                      type="text"
                      value={form.name}
                      placeholder="Jane Doe"
                      onChange={e => update('name', e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, name: true }))}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/60 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-colors"
                    />
                  </Field>

                  <Field
                    label="Email"
                    error={touched.email ? errors.email : undefined}
                  >
                    <input
                      type="email"
                      value={form.email}
                      placeholder="jane@company.com"
                      onChange={e => update('email', e.target.value)}
                      onBlur={() => setTouched(p => ({ ...p, email: true }))}
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/60 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-colors"
                    />
                  </Field>
                </div>

                {/* Project type chips */}
                <Field label="Project type">
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update('type', t)}
                        className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] border transition-all duration-300 ${form.type === t
                          ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
                          : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Message */}
                <Field
                  label="Message"
                  error={touched.message ? errors.message : undefined}
                  hint={`${form.message.length} chars`}
                >
                  <textarea
                    value={form.message}
                    rows={6}
                    placeholder="Tell me about your project, timeline, and what you're hoping to build…"
                    onChange={e => update('message', e.target.value)}
                    onBlur={() => setTouched(p => ({ ...p, message: true }))}
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/60 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-colors resize-none leading-relaxed"
                  />
                </Field>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="group inline-flex items-center justify-between gap-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 pl-6 pr-2 py-2 rounded-full transition-colors duration-300"
                  >
                    <span className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.15em] font-semibold">
                      <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Send message
                    </span>
                    <span className="w-10 h-10 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                    </span>
                  </button>

                  <p className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-600">
                    Opens in your mail app
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ---------- Channel rail ---------- */}
          <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/[0.06]">
            <div className="flex items-center gap-3 mb-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ 03</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Direct channels</span>
            </div>

            {/* Channels */}
            <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:bg-amber-400 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <Icon
                        className="w-4 h-4 text-amber-400 group-hover:text-zinc-950 transition-colors"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        {c.label}
                      </div>
                      <div className="font-display text-[15px] text-white group-hover:text-amber-400 transition-colors truncate">
                        {c.value}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:rotate-45 transition-all flex-shrink-0" />
                  </a>
                );
              })}
            </div>

            {/* Location card */}
            <div className="mt-6 relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 overflow-hidden">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-950 border border-white/10 rounded-full">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-amber-400">
                  Based in
                </span>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <MapPin
                  className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0"
                  strokeWidth={2}
                />
                <div>
                  <p className="font-display text-xl font-medium text-white">
                    Kano, Nigeria
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 mt-1">
                    WAT · GMT+1 · Working remotely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Sub-components ----------

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, hint, children }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </label>
      {hint && !error && (
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
          {hint}
        </span>
      )}
      {error && (
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-rose-400">
          <AlertCircle className="w-3 h-3" />
          {error}
        </span>
      )}
    </div>
    {children}
  </div>
);

const SuccessState: React.FC<{ name: string; onReset: () => void }> = ({
  name,
  onReset,
}) => (
  <div className="bg-white/[0.02] border border-emerald-500/20 rounded-2xl p-8 md:p-10 text-center">
    <div className="w-14 h-14 rounded-full bg-emerald-400 mx-auto flex items-center justify-center mb-6">
      <Check className="w-7 h-7 text-zinc-950" strokeWidth={3} />
    </div>
    <h3 className="font-display text-2xl md:text-3xl font-medium text-white tracking-[-0.02em]">
      Thanks{name ? `, ${name.split(' ')[0]}` : ''} — your mail app is open.
    </h3>
    <p className="mt-3 text-zinc-400 text-[15px] leading-relaxed max-w-md mx-auto">
      Just hit send in the window that popped up. If nothing opened, email me
      directly at{' '}
      <a
        href="mailto:yakubuanas04@gmail.com"
        className="text-amber-400 hover:underline underline-offset-4"
      >
        yakubuanas04@gmail.com
      </a>
      .
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 hover:text-amber-400 transition-colors"
    >
      ← Send another
    </button>
  </div>
);

export default ContactForm;