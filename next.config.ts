import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [] },
  // Une seule adresse officielle : ecos-sahel.org, sans www. Sans cette redirection,
  // le site répondrait à l'identique sur les deux domaines et Google y verrait du
  // contenu dupliqué. Filet de sécurité au cas où hPanel ne ferait pas la redirection.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ecos-sahel.org" }],
        destination: "https://ecos-sahel.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
