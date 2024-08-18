// backend/routes/submit.js

import express from 'express';
import { db } from '../firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const router = express.Router();

router.post('/submit', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const docRef = await addDoc(collection(db, "submissions"), {
            firstName,
            lastName,
            email
        });
        console.log("Document written with ID: ", docRef.id);

        res.redirect('/confirmation');
    } catch (e) {
        console.error("Error adding document: ", e);
        res.status(500).send("Error submitting form");
    }
});

export default router;
