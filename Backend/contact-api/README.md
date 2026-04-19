# Contact API (Vercel)

API serverless pour l'envoi d'emails via Nodemailer.

## Endpoint

- POST /api/contact
- OPTIONS /api/contact (preflight CORS)

## Variables d'environnement requises

- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- TO_EMAIL

## CORS

Utiliser la variable ALLOWED_ORIGINS sous forme de liste CSV.

Exemple:

https://gdgproductions.ca,https://www.gdgproductions.ca,http://localhost:4321

## Déploiement

1. Installer Vercel CLI si besoin:

npm i -g vercel

2. Se connecter:

vercel login

3. Déployer en production depuis ce dossier:

vercel --prod

4. Tester:

curl -i -X OPTIONS "https://VOTRE-URL.vercel.app/api/contact" \
  -H "Origin: https://gdgproductions.ca" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"

La réponse doit contenir Access-Control-Allow-Origin et retourner 204.
