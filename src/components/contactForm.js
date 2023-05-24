import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Effectuez ici l'envoi des données du formulaire, par exemple via une API
        
        // Réinitialisez les champs du formulaire après l'envoi
        setName('');
        setEmail('');
        setMessage('');
    };
    
    return (
        <form name="contact-portfolio" method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact-portfolio" />
        <div>
        <label htmlFor="name">Nom :</label><br />
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="email">Email :</label><br />
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <label htmlFor="message">Message :</label><br />
        <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        </div>
        <center>
        <button type="submit">Envoyer</button>
        </center>
        </form>
        );
    };
    
    export default ContactForm;
