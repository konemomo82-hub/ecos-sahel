"use client";

import { useState } from "react";

export default function CopyButton({ value, label, copiedLabel = "✓ Copié" }: { value: string; label: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard indisponible, on ignore silencieusement */
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={handleCopy}>
      {copied ? copiedLabel : `📋 ${label}`}
    </button>
  );
}
