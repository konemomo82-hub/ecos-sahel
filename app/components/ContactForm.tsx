"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

type Scope = "portal" | "mali" | "burkina";

export default function ContactForm({ locale }: { locale: "fr" | "en" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [scope, setScope] = useState<Scope>("portal");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) { setStatus("error"); return; }
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name, email, organization: organization || null, scope, message,
    });
    if (error) { setStatus("error"); return; }
    setStatus("sent");
    setName(""); setEmail(""); setOrganization(""); setMessage(""); setScope("portal");
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-sent">
        <p>{locale === "fr" ? "Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement." : "Thank you, your message has been sent. We'll get back to you soon."}</p>
        <button className="button ghost" onClick={() => setStatus("idle")}>{locale === "fr" ? "Envoyer un autre message" : "Send another message"}</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-row">
        <label>{locale === "fr" ? "Nom" : "Name"}*
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>Email*
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <div className="contact-row">
        <label>{locale === "fr" ? "Organisation (facultatif)" : "Organisation (optional)"}
          <input value={organization} onChange={(e) => setOrganization(e.target.value)} />
        </label>
        <label>{locale === "fr" ? "Votre message concerne" : "Your message is about"}
          <select value={scope} onChange={(e) => setScope(e.target.value as Scope)}>
            <option value="portal">{locale === "fr" ? "ECOS Sahel (général)" : "ECOS Sahel (general)"}</option>
            <option value="mali">ECOS Mali</option>
            <option value="burkina">ECOS Burkina Faso</option>
          </select>
        </label>
      </div>
      <label>{locale === "fr" ? "Message" : "Message"}*
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </label>
      {status === "error" && <p className="contact-error">{locale === "fr" ? "Une erreur est survenue, merci de réessayer dans un instant." : "Something went wrong, please try again in a moment."}</p>}
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (locale === "fr" ? "Envoi…" : "Sending…") : (locale === "fr" ? "Envoyer le message" : "Send message")}
      </button>
    </form>
  );
}
