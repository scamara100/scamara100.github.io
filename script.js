// Initialiser EmailJS avec la clé publique
emailjs.init("yhKgECpzxd8luohBv"); // Remplace par ta clé publique EmailJS

// Sélecteurs
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const resumeButton = document.querySelector('.button-resume');
const contactForm = document.querySelector('.button-contact');
const contactFormElement = document.getElementById("contact-form"); // Vérification correcte du formulaire
const statusMessage = document.getElementById("status-message"); // Affichage des messages d'état
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Responsive Navigation Toggle
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
}

// ✅ Scroll vers les sections
document.querySelectorAll('.navbar-links li a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Ajuster pour le menu fixe
                behavior: 'smooth'
            });
        }
        // Fermer le menu en mode mobile
        if (navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
        }
    });
});

// ✅ Ouvrir le CV dans un nouvel onglet
if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        window.open('https://docs.google.com/document/d/1xybEm0nsDVYC_wU-yetr14s7YngPuWdEH_5X2meeEy8/edit?tab=t.0', '_blank');
    });
}

// ✅ Vérification et soumission du formulaire de contact via EmailJS
if (contactFormElement) {
    contactFormElement.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupération des champs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Vérification que tous les champs sont remplis
        if (name === "" || email === "" || message === "") {
            statusMessage.innerText = "❌ Please fill in all fields.";
            statusMessage.style.color = "red";
            return;
        }
        if (!emailPattern.test(email)) {
        statusMessage.innerText = "❌ Please enter a valid email.";
        statusMessage.style.color = "red";
        return;
        }

        const serviceID = "scamara100"; // Remplace par ton vrai service_id
        const templateID = "scamara100"; // Remplace par ton vrai template_id

        const formData = {
            user_name: name,
            user_email: email,
            message: message,
        };

        // Envoi de l'email avec EmailJS
        emailjs.send(serviceID, templateID, formData)
            .then(response => {
                statusMessage.innerText = "✅ Message sent successfully!";
                statusMessage.style.color = "green";
                contactFormElement.reset(); // Réinitialise le formulaire
            })
            .catch(error => {
                statusMessage.innerText = "❌ Error when sending.";
                statusMessage.style.color = "red";
                console.error("Erreur EmailJS :", error);
            });
    });
}
