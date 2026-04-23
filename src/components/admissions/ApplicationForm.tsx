"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { programOptions } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ApplicationForm() {
  const t = useTranslations("admissions.form");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-cream-100 py-20 sm:py-24">
      <Container size="narrow">
        <SectionTitle
          eyebrow=""
          heading={t("heading")}
          subheading={t("subheading")}
        />

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-lift sm:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl text-primary">
                  {t("successTitle")}
                </h3>
                <p className="mt-3 max-w-md text-sm text-muted">
                  {t("successBody")}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-accent-700 hover:text-accent-600"
                >
                  ←
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-5 sm:grid-cols-2"
              >
                <Field label={t("name")} name="name" required />
                <Field label={t("fatherName")} name="fatherName" required />
                <Field label={t("cnic")} name="cnic" />
                <Field label={t("phone")} name="phone" type="tel" />
                <Field
                  label={t("email")}
                  name="email"
                  type="email"
                  required
                  className="sm:col-span-2"
                />
                <Select
                  label={t("program")}
                  name="program"
                  className="sm:col-span-2"
                >
                  {programOptions.map((p) => (
                    <option key={p} value={p}>
                      {t(`programs.${p}`)}
                    </option>
                  ))}
                </Select>
                <TextArea
                  label={t("message")}
                  name="message"
                  className="sm:col-span-2"
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
      </Container>
    </section>
  );
}

const fieldClass =
  "w-full rounded-xl border border-primary-100 bg-cream/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/30";

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
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
  className,
}: {
  label: string;
  name: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        dir="auto"
        className={cn(fieldClass, "resize-y")}
      />
    </label>
  );
}

function Select({
  label,
  name,
  className,
  children,
}: {
  label: string;
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/70">
        {label}
      </span>
      <select name={name} className={fieldClass}>
        {children}
      </select>
    </label>
  );
}
