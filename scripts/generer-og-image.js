/**
 * Génère public/og-image.jpg — l'aperçu affiché quand un lien du site est partagé
 * sur WhatsApp, Facebook, LinkedIn ou X.
 *
 *   node scripts/generer-og-image.js
 *
 * À relancer si le logo, la photo de fond ou la signature changent.
 *
 * Format 1200 × 630 : le standard Open Graph. WhatsApp recadre au carré depuis
 * le centre pour les petits aperçus, donc tout ce qui compte reste centré.
 * Sortie en JPEG plutôt qu'en PNG : WhatsApp ignore les images trop lourdes,
 * et une photo se compresse bien mieux en JPEG.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const W = 1200;
const H = 630;
const racine = path.join(__dirname, "..");
const sortie = path.join(racine, "public", "og-image.jpg");

async function main() {
  const fond = await sharp(path.join(racine, "public", "images", "hero-lecture-mali.jpg"))
    .resize(W, H, { fit: "cover", position: "attention" })
    .toBuffer();

  // Voile vert soutenu : la photo reste lisible, le texte blanc passe partout.
  const voile = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%"   stop-color="#0b4232" stop-opacity="0.82"/>
           <stop offset="100%" stop-color="#072e26" stop-opacity="0.90"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${H}" fill="url(#v)"/>
     </svg>`
  );

  const logo = await sharp(path.join(racine, "public", "logos", "logo-ecos-sahel.png"))
    .resize({ height: 150, fit: "inside" })
    .toBuffer();
  const { width: logoW } = await sharp(logo).metadata();

  const texte = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
       <style>
         .titre { font-family: Arial, Helvetica, sans-serif; font-size: 76px; font-weight: bold;
                  fill: #ffffff; letter-spacing: 6px; }
         .sign  { font-family: Arial, Helvetica, sans-serif; font-size: 27px; font-weight: bold;
                  fill: #efb52e; letter-spacing: 3px; }
         .base  { font-family: Arial, Helvetica, sans-serif; font-size: 25px; fill: #d7e6df; }
       </style>
       <text x="50%" y="392" text-anchor="middle" class="titre">ECOS SAHEL</text>
       <text x="50%" y="444" text-anchor="middle" class="sign">EDUCATION - COHESION SOCIALE - RESILIENCE</text>
       <text x="50%" y="516" text-anchor="middle" class="base">ECOS Mali (Bamako) et ECOS Burkina Faso (Ouagadougou)</text>
       <rect x="${W / 2 - 60}" y="474" width="120" height="3" fill="#efb52e" rx="2"/>
     </svg>`
  );

  await sharp(fond)
    .composite([
      { input: voile, top: 0, left: 0 },
      { input: logo, top: 128, left: Math.round((W - logoW) / 2) },
      { input: texte, top: 0, left: 0 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(sortie);

  const { size } = fs.statSync(sortie);
  console.log(`og-image.jpg genere : ${W}x${H}, ${Math.round(size / 1024)} Ko`);
  if (size > 300 * 1024) {
    console.warn("ATTENTION : au-dela de ~300 Ko, WhatsApp peut ignorer l'apercu.");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
