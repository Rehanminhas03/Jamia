"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl bg-white p-7 shadow-lift sm:p-9">
      <h3 className="font-display text-2xl text-primary">{t("heading")}</h3>
      <p className="mt-2 text-sm text-muted">{t("subheading")}</p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col items-center py-6 text-center"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <h4 className="mt-4 font-display text-xl text-primary">
              {t("successTitle")}
            </h4>
            <p className="mt-2 max-w-sm text-sm text-muted">
              {t("successBody")}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <Field label={t("name")} name="name" required />
            <Field label={t("email")} name="email" type="email" required />
            <Field label={t("phone")} name="phone" type="tel" />
            <Field label={t("subject")} name="subject" required />
            <TextArea
              label={t("message")}
              name="message"
              className="sm:col-span-2"
              required
            />
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                <span>{t("submit")}</span>
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-primary-100 bg-cream/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/30";

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
        {label}
        {required ? <span className="ms-1 text-accent">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        dir="auto"
        className={fieldClass}
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
        {label}
        {required ? <span className="ms-1 text-accent">*</span> : null}
      </span>
      <textarea
        name={name}
        rows={4}
        required={required}
        dir="auto"
        className={cn(fieldClass, "resize-y")}
      />
    </label>
  );
}
