"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to a form handler (e.g. Formspree, API route)
    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 bg-primary-50 border border-primary-200 rounded-lg text-center">
        <CheckCircle className="h-10 w-10 text-primary-600 mx-auto mb-3" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-warm-900">
          Thank you!
        </h3>
        <p className="text-warm-600 mt-1">
          Your message has been received. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Name"
        name="name"
        placeholder="Your name"
        required
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-medium text-warm-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="rounded-md border border-warm-300 bg-white px-3 py-2 text-sm placeholder:text-warm-400 focus:outline-2 focus:outline-offset-0 focus:outline-primary-500 focus:border-primary-500 resize-y"
          placeholder="Tell us about your practice or how we can help..."
          required
        />
      </div>

      {error && (
        <p className="text-sm text-crisis-600">{error}</p>
      )}

      <Button type="submit" size="lg">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Message
      </Button>
    </form>
  );
}
