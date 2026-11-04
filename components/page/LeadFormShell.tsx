"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { clinic } from "@/content/site";
import styles from "./LeadFormShell.module.css";

/**
 * The working part of every enquiry form: sends the fields to /api/lead/ (Telegram, plan D4).
 * The thank-you page (and its Meta Pixel Lead event) is only reached after the enquiry was really sent.
 * Personal data is never put in the URL.
 */
export default function LeadFormShell({
  className,
  thankYouPath,
  children,
}: {
  className?: string;
  thankYouPath?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const sending = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (thankYouPath) {
        router.push(thankYouPath);
        return; // stays "sending" until the thank-you page opens
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
    sending.current = false;
  }

  return (
    <form onSubmit={onSubmit} className={className} aria-busy={status === "sending"}>
      {children}
      {/* Bots fill this in, people never see it */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p role="status" className={status === "failed" ? styles.failed : styles.status}>
        {status === "sending" && "Sending…"}
        {status === "sent" && "Thank you. Our team will contact you as soon as possible."}
        {status === "failed" && `Sorry, your message was not sent. Please call us on ${clinic.phoneDisplay}.`}
      </p>
    </form>
  );
}
