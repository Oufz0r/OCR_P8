import React from "react";

export default function Form() {
  return (
    <form name="contact-portfolio" method="post">
      <input type="hidden" name="form-name" value="contact-portfolio" />
      <p>
        <label htmlFor="name">Nom</label> <br />
        <input type="text" id="name" name="name" required />
      </p>
      <p>
        <label htmlFor="email">Email</label> <br />
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="message">Message</label> <br />
        <textarea id="message" name="message" required></textarea>
      </p>
      <p>
        <input type="submit" value="Envoyer" />
      </p>
    </form>
  );
}