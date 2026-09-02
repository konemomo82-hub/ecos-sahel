# Notifications email du formulaire de contact

Le formulaire de contact fonctionne déjà sans rien configurer : chaque message est
enregistré dans Supabase et visible dans l'onglet **Messages** de `/admin`.

Pour recevoir en plus un email à chaque nouveau message, ajoutez ces variables
d'environnement dans hPanel (Node.js → Variables d'environnement), puis
redéployez :

| Variable | Exemple | Description |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.hostinger.com` | Serveur SMTP de votre boîte mail |
| `SMTP_PORT` | `465` | 465 (TLS) ou 587 (STARTTLS) |
| `SMTP_USER` | `contact@ecos-sahel.org` | Adresse d'envoi (doit exister réellement) |
| `SMTP_PASSWORD` | *(mot de passe de cette boîte mail)* | — |
| `CONTACT_TO` | `contact@ecos-sahel.org` | Adresse qui reçoit les notifications (optionnel, sinon = SMTP_USER) |

Si `contact@ecos-sahel.org` est hébergée chez Hostinger (Emails → cette adresse),
les identifiants SMTP sont visibles dans hPanel → Emails → Se connecter →
Configuration manuelle.

Tant que ces variables ne sont pas renseignées, le formulaire continue de
fonctionner normalement : les messages sont juste enregistrés en base, sans
email envoyé. Rien ne casse dans un cas comme dans l'autre.
