import React from "react";

export default function Form() {
    window.addEventListener('scroll', function() {
        // A PROPOS
        const contactSec = document.querySelector('#contact');
        const contactSecPosition = contactSec.getBoundingClientRect();

        if(contactSecPosition.top <= window.innerHeight * 0.4) {
            const contactBoxGet = document.querySelector(".contact-Box");
            contactBoxGet.style.right = "0";
            contactBoxGet.style.opacity = "1";
        }
    });

    return (
        <form id="contact-form" name="contact-portfolio" method="post">
        <input type="hidden" name="form-name" value="contact-portfolio" />
        <p>
            {/* <fieldset> */}
                {/* <legend>Nom</legend> */}
                {/* <label htmlFor="name">Nom</label> <br /> */}
                <input type="text" id="name" name="name" placeholder="Nom" required />
            {/* </fieldset> */}
        </p>
        <p>
            {/* <fieldset> */}
            {/* <legend><label htmlFor="email">Email</label></legend> */}
            {/* <label htmlFor="email">Email</label> <br /> */}
            <input type="email" id="email" name="email" placeholder="Email" required />
            {/* </fieldset> */}
        </p>
        <p>
            {/* <fieldset> */}
            {/* <legend>Message</legend> */}
            {/* <label htmlFor="message">Message</label> <br /> */}
            <textarea id="message" name="message" placeholder="Message" required></textarea>
            {/* </fieldset> */}
        </p>
        <p className="centerIt">
            <input type="submit" value="Envoyer" />
        </p>
        </form>
    );
}