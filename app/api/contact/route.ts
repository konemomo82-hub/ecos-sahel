import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";

const scopeLabel: Record<string, string> = {
  portal: "ECOS Sahel (portail)",
  mali: "ECOS Mali",
  burkina: "ECOS Burkina Faso",
};

type Payload = {
  name?: string;
  email?: string;
  organization?: string | null;
  scope?: string;
  message?: string;
  website?: string; // pot de miel : invisible pour un humain, rempli par les robots
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Un robot a rempli le champ caché : on répond 200 sans rien enregistrer ni envoyer,
  // pour ne pas lui signaler qu'il a été filtré.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const organization = (body.organization ?? "")?.trim() || null;
  const scope = body.scope && scopeLabel[body.scope] ? body.scope : "portal";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nom, email et message sont obligatoires." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "Message trop long." }, { status: 400 });
  }

  // 1. Enregistrement en base : c'est le filet de sécurité. Même si l'email ne part
  //    pas, le message reste consultable dans l'onglet Messages de /admin.
  let stored = false;
  if (supabase) {
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, organization, scope, message });
    if (error) {
      console.error("[contact] enregistrement en base impossible :", error.message);
    } else {
      stored = true;
    }
  }

  // 2. Notification par email vers la boîte de l'association.
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO || user;
  let mailed = false;

  if (host && user && pass && to) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // 465 = TLS implicite, 587 = STARTTLS
        auth: { user, pass },
      });
      await transporter.sendMail({
        // L'expéditeur doit être la boîte authentifiée : un serveur SMTP refuse
        // d'envoyer au nom d'un domaine tiers. L'adresse du visiteur va en replyTo,
        // ce qui permet de lui répondre directement depuis la messagerie.
        from: `"Site ECOS Sahel" <${user}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `[${scopeLabel[scope]}] Message de ${name}`,
        text: [
          `Nom          : ${name}`,
          `Email        : ${email}`,
          `Organisation : ${organization ?? "non précisée"}`,
          `Concerne     : ${scopeLabel[scope]}`,
          "",
          "Message :",
          message,
          "",
          "Envoyé depuis le formulaire de contact d'ecos-sahel.org",
        ].join("\n"),
      });
      mailed = true;
    } catch (err) {
      console.error("[contact] envoi de l'email impossible :", err);
    }
  } else {
    console.warn("[contact] SMTP non configuré : le message est seulement enregistré en base.");
  }

  // Le message est perdu seulement si les deux canaux ont échoué.
  if (!stored && !mailed) {
    return NextResponse.json(
      { error: "Le message n'a pas pu être transmis. Merci de réessayer ou d'écrire directement à contact@ecos-sahel.org." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
