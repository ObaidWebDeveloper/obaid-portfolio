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
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
        };

        let info = await transporter.sendMail(mailOptions);

        message = { type: true, message: 'Email Sent Successfully!' };
    } catch (error) {
        message = { type: false, message: `Email Sending Failed: ${error.message}`};
    }

    res.send(message);
});

routes.use((req, res) => {
    res.status(404).render('index', { page: "404", pages: pages });
});


module.exports = routes;