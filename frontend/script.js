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
    const texts = ["Time Saving", "Your own personal assistant", "Innovative", "Make Every Minute Count with AI.", "Meet SynthoTime SmartPilot"];
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

// Initialize the typing effect after the Spline design is finished
function onSplineLoad() {
    setTimeout(() => {
        document.getElementById('typing-container').style.opacity = 1; // Show the title
        typeText(); // Start the typing animation
        document.querySelector('.form-container').style.opacity = 1; // Show the form container
    }, 13500); // Adjust this delay to control when the title and form appear
}

window.onload = function() {
    onSplineLoad(); // Initialize after the Spline design is loaded
}

document.addEventListener("DOMContentLoaded", () => {
    const typingText = "Productivity, ";
    const typingContainer = document.getElementById("typing-text");
    let index = 0;

    function type() {
        if (index < typingText.length) {
            typingContainer.textContent += typingText.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }

    type();

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

            // Function to retrieve and log data from Firestore
            async function retrieveData() {
                try {
                    const snapshot = await getDocs(collection(db, 'submissions'));
                    const submissionsList = [];
                    snapshot.forEach((doc) => {
                        submissionsList.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    console.log('Submissions:', submissionsList);
                } catch (error) {
                    console.error('Error retrieving documents:', error);
                }
            }
            
            // Clear the form fields after submission
            form.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    });    

    
});



