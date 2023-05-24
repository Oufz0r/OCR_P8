import React from "react";

export default function contactForm() {
    return (
        <div>
            <form
                name="contact portfolio"
                method="post"
                netlify
                netlify-honeypot="bot-field"
                onSubmit="submit"
            >
                <input type="hidden" name="form-name" value="contact portfolio" />

                <div>
                    <label htmlFor="nom">Nom
                        <input id="nom" type="text" name="nom" />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">Email
                        <input id="email" type="email" name="email" />
                    </label>
                </div>
                <div>
                    <label htmlFor="message">Message
                        <textarea id="message" name="message"></textarea>
                    </label>
                </div>

                <button type="submit">Envoyer</button>

            </form>
        </div>
    )
}