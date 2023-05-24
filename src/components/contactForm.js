import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoie des données du formulaire via une requête POST
    fetch('../contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Succès de l'envoi de l'e-mail
          alert('Votre message a été envoyé avec succès.');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          // Erreur lors de l'envoi de l'e-mail
          alert('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
        alert('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
      });
  };

  return (
    <form name="contact-v1" onSubmit={handleSubmit} netlify="true" netlify-honeypot="bot-field">
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
