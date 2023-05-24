import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // Le formulaire a été soumis avec succès
        alert('Message envoyé !');
        // Réinitialiser les champs du formulaire
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => alert(error));
  };

  return (
    <form data-netlify="true" name="contact" method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <label>
        Nom:
        <input name="name" type="text" value={name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input name="email" type="text" value={email} onChange={handleChange} required />
      </label>
      <label>
        Message:
        <textarea name="message" value={message} onChange={handleChange} required></textarea>
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
}


// import React, { useState } from 'react';

// const ContactForm = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validation des données
//         if (!name || !email || !message) {
//             setError('Veuillez remplir tous les champs du formulaire.');
//             return;
//         }
        
//         try {
//             // Envoi des données du formulaire au script PHP
//             const response = await fetch('contact.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name, email, message }),
//             });
            
//             // Vérification de la réponse du script PHP
//             const data = await response.json();
//             if (response.ok && data.success) {
//                 // Succès de l'envoi de l'e-mail
//                 setSuccess(true);
//                 setError('');
//                 // Réinitialisez les champs du formulaire après l'envoi
//                 setName('');
//                 setEmail('');
//                 setMessage('');
//             } else {
//                 // Erreur lors de l'envoi de l'e-mail
//                 setError(data.message || 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.');
//                 setSuccess(false);
//             }
//         } catch (error) {
//             // Erreur lors de la requête vers le script PHP
//             setError('Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.');
//             setSuccess(false);
//         }
//     };
    
//     return (
//         <form onSubmit={handleSubmit}>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">Le message a été envoyé avec succès !</p>}
//         <div>
//         <label htmlFor="name">Nom :</label><br />
//         <input
//         type="text"
//         id="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         />
//         </div>
//         <div>
//         <label htmlFor="email">Email :</label><br />
//         <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         />
//         </div>
//         <div>
//         <label htmlFor="message">Message :</label><br />
//         <textarea
//         id="message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         ></textarea>
//         </div>
//         <center>
//         <button type="submit">Envoyer</button>
//         </center>
//         </form>
//     );
// };

// export default ContactForm;
