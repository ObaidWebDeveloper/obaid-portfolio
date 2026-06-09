const express = require('express');
const fs = require('fs');
const routes = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pages = ["about", "skills", "contact"];

routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());

function skillsFunc() {
    const readSkills = JSON.parse(fs.readFileSync("database/skills.json", 'utf-8'));
    let data = "";

    readSkills.forEach((skill) => {
        data += `
        <div class="skill" title="${skill.name}">
        <img src="/images/skills/${skill.name.split(" ").join("-")}.svg" alt="learn ${skill.name}">
        ${skill.name}
        <div class="precentageBar_container" style="--value:'${skill.knowledge}%';--colorValue:${skill.knowledge}%;">
            <span></span>
        </div>
    </div>`;
    })

    return data;
};

function skillImages() {
    const readSkills = JSON.parse(fs.readFileSync("database/skills.json", 'utf-8'));
    let data = "";

    readSkills.forEach((skill) => {
        data += `<img src="/images/skills/${skill.name.split(" ").join("-")}.svg" alt="learn ${skill.name}">`;
    });
    
    return data;
}

routes.get('/', (req, res) => {
    res.render('index', { page: "home", pages: pages, skillImages: skillImages() });
})

routes.get('/about', (req, res) => {
    res.render('index', { page: "about", pages: pages });
})

routes.get('/skills', (req, res) => {
    res.render('index', { page: "skills", pages: pages, skills: skillsFunc() });
})

routes.get('/contact', (req, res) => {
    res.render('index', { page: "contact", pages: pages });
})

routes.get('/cv', (req, res) => {
    res.render('index', { page: "cv", pages: pages });
})

routes.post('/send', async (req, res) => {
    const body = req.body;

    let message = "";

    try {
        const { subject, to, text } = body;
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: "mobaidwebdeveloper@gmail.com",
                pass: "gvmk ogvt zltb ziff",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
  from: '"Obaid Portfolio" <motech508@gmail.com>',
  to: "motech508@gmail.com",
  subject: `📩 New Contact Form Submission from ${subject}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #2563eb;">Obaid Portfolio</h2>
      <p>You have received a new message from your website contact form.</p>

      <hr>

      <p><strong>Name:</strong> ${subject}</p>
      <p><strong>Email:</strong> ${to}</p>

      <p><strong>Message:</strong></p>
      <div style="background:#f5f5f5;padding:15px;border-radius:5px;">
        ${text}
      </div>

      <hr>

      <p style="color:#666;font-size:12px;">
        This email was sent from the Obaid Portfolio contact form.
      </p>
    </div>
  `,
};

        let info = await transporter.sendMail(mailOptions);

        message = { type: true, message: 'Email Sent Successfully!' };
    } catch (error) {
        message = { type: false, message: `Email Sending Failed: ${error.message}`};
    }

    res.send(message);
});


routes.get('/sitemap.xml', (req, res) => {
    const sitemapFile = fs.readFileSync('sitemap.xml','utf-8');
    res.send(sitemapFile);
})

// 404 not found route
routes.use((req, res) => {
    res.status(404).render('index', { page: "404", pages: pages });
});

module.exports = routes;
