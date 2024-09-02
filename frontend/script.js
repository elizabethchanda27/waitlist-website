// script.js

// Import Firebase functions and configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbkIUZwItTR5OmTMJPZwkcKAiu62BKg2s",
    authDomain: "waitlist-website-6b95a.firebaseapp.com",
    projectId: "waitlist-website-6b95a",
    storageBucket: "waitlist-website-6b95a.appspot.com",
    messagingSenderId: "414717254432",
    appId: "1:414717254432:web:d9d17caf90b16270d91545",
    measurementId: "G-385N2QJ30X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function typeText() {
    const texts = ["Time Saving.", "Your own personal assistant.", "Innovation with AI.", "Make Every Minute Count.", "Meet SynthoTime SmartPilot"];
    let index = 0;
    let typingSpeed = 100; // Speed of typing in milliseconds
    let deletingSpeed = 50; // Speed of deleting in milliseconds
    let delayBetweenTexts = 1500; // Delay between texts

    function typeNextText() {
        const element = document.getElementById("typing-text");
        let text = texts[index];
        let i = 0;
        let typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => deleteText(), delayBetweenTexts);
            }
        }, typingSpeed);
    }

    function deleteText() {
        const element = document.getElementById("typing-text");
        let text = element.textContent;
        let i = text.length;
        let deletingInterval = setInterval(() => {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(deletingInterval);
                index = (index + 1) % texts.length;
                setTimeout(() => typeNextText(), delayBetweenTexts);
            }
        }, deletingSpeed);
    }

    typeNextText(); // Start the typing animation
}

// Show the title and form immediately after the page loads
function onPageLoad() {
    document.getElementById('typing-container').style.opacity = 1; // Show the title
    typeText(); // Start the typing animation
    document.querySelector('.form-container').style.opacity = 1; // Show the form container
}

window.onload = function() {
    onPageLoad(); // Initialize when the page loads
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("waitlist-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    // Hide the confirmation message initially
    confirmationMessage.style.display = "none";

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const firstName = event.target.first_name.value;
        const lastName = event.target.last_name.value;
        const email = event.target.email.value;
    
        try {
            // Add form data to Firestore
            await addDoc(collection(db, 'submissions'), {
                firstName,
                lastName,
                email
            });
    
            // Show confirmation message
            confirmationMessage.textContent = "Submitted, you will be notified by email when the product is ready!";
            confirmationMessage.style.fontSize = "1.5rem";
            confirmationMessage.style.color = "#28a745";
            confirmationMessage.style.marginTop = "1rem";
            confirmationMessage.style.textAlign = "center";
            confirmationMessage.style.display = "block";
    
            // Trigger confetti animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Clear the form fields after submission
            form.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    });    
});
