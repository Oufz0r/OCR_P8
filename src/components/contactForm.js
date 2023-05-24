import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const myForm = event.target;
        const formData = new FormData(myForm);
        
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => {
                // Succès de l'envoi de l'e-mail
                setSuccess(true);
                setError('');
                // Réinitialisez les champs du formulaire après l'envoi
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch(() => {
                setSuccess(false);
                setError('Votre message n\'a pu être envoyé.');
            });
        };
    
    return (
        <form name="contact" action="" data-netlify="true" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Le message a été envoyé avec succès !</p>}
            <input type="hidden" name="form-name" value="contact" />
            <div>
                <label htmlFor="name">Nom :</label><br />
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email :</label><br />
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="message">Message :</label><br />
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <center>
                <button type="submit">Envoyer</button>
            </center>
        </form>
    );
};

export default ContactForm;
