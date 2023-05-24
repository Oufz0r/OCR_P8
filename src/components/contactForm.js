import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoie des données du formulaire via une requête POST
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeFormData({ name, email, message })
    })
      .then(() => {
        // Succès de l'envoi de l'e-mail
        alert('Votre message a été envoyé avec succès.');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
        alert('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
      });
  };

  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  return (
    <form name="contact-v1" data-netlify="true" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom :</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email :</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message :</label><br />
        <textarea
          id="message"
          name="message"
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
