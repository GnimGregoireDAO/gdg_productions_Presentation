// api/contact.js

// 1. Importation de nodemailer
const nodemailer = require('nodemailer');

// 2. Fonction principale (Vercel l'appel automatiquement)
module.exports = async function handler(req, res){

    // 3. Gérer les requetes CORS preflight (le navigateur envoie OPTIONS avant POST)
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // 4. Accepter uniquement POST
    if (req.method !== 'POST'){
       return res.status(405).json({ error: 'Methode non autorisée' })
    }

    // 5. Ajouter les headers CORS pour la réponse
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');

    // 6. Extraire les données du formulaire par destructuration d'objets
    const {name, email, message, consent_marketing, consent_timestamp} = req.body;

    // 7. Validation des champs
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis'});
    }

    if (name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'Nom invalide (2-100 caracteres)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return res.status(400).json({ error: 'Email invalide' });
    }
    try {
        // 8. Créer le transporteur SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, //true pour port 465, false pour 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }

        });

        // 9. Envoyer l'email
        await transporter.sendMail({
            from: `"Formulaire Site" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL,
            replyTo: email, // Permet de répondre directement au client
            subject: `[Contact Site] Message de ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\nConsentement marketing: ${consent_marketing ? 'OUI' : 'NON'}\nDate: ${consent_timestamp}\n\nMessage:\n${message}`,
            html: `
                <h2>Nouveau message du formulaire</h2>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Consentement marketing:</strong> ${consent_marketing ? '✅ OUI' : '❌ NON'}</p>
                <p><strong>Date consentement:</strong> ${consent_timestamp || 'N/A'}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
      `
        });

        // 10. Répondre succes
        return res.status(200).json({ ok: true, message: 'Email envoyé avec succes' });

    } catch (error) {
        // 11. Log l'erreur coté serveur (visible dans Vercel logs)
        console.error('Erreur envoi email:', error.message);
        return res.status(500).json({error: 'Erreur serveur, réesayer plus tard'});
    }

};