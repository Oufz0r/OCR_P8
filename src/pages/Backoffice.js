import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import dotenv from 'dotenv';

// import { getDatabase, ref, onValue, set} from "firebase/database";
// eslint-disable-next-line
import { getDatabase, onValue, ref } from 'firebase/database';
// eslint-disable-next-line
import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/app';
// import 'firebase/database';

import user from '../user.json';
import projets from '../projets.json';

dotenv.config();

export default function Backoffice() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const projectsRef = ref(db, 'projets');

    onValue(projectsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data); // Afficher les données récupérées de la base de données
    });

//     const db = getDatabase();
// const starCountRef = ref(db, '/projets');
//     onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//         // updateStarCount(postElement, data);
//     });

    // firebase.initializeApp(firebaseConfig);
    // const projectsRef = database.ref('projets');


    const baseEmail = user.email;
    const basePassword = user.password;

    // const hashedPassword = bcrypt.hashSync(password, 10);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn === 'true') {
            setLoggedIn(true);
        }

        const formGet = document.getElementById("loginForm");

        if(formGet)
        {
            formGet.addEventListener("submit", (e) => {
                e.preventDefault();
        
                let email = document.getElementById("emailInput").value;
                let password = document.getElementById("passwordInput").value;
        
                setEnteredEmail(email);
                setEnteredPassword(password);
            });
        }
    },[]);

    useEffect(() => {
        const decoButton = document.getElementById("decoButton");
        if (decoButton) {
            decoButton.addEventListener("click", (e) => {
                e.preventDefault();
                setEnteredEmail('');
                setEnteredPassword('');
                setLoggedIn(false);
                localStorage.removeItem('loggedIn');
                alert('Vous êtes déconnecté.');
            });
        }

        function openDoors() {
            const doorUp = document.getElementById("doorUp");
            const doorDown = document.getElementById("doorDown");
    
            doorUp.style.top = "-50vh";
            doorDown.style.bottom = "-50vh";
        }

        if(loggedIn) {
            // lancement de l'animation
            setTimeout(() => {
                openDoors();
            }, 500);
        }
    }, [loggedIn]);

    useEffect(() => {
        const backButton = document.getElementById("backButton");
        if(backButton) {
            backButton.addEventListener("click", (e) => {
                console.log('lol');
                e.preventDefault();
                window.location.href = "/";
            });
        }
    },[loggedIn])

    useEffect (() => {
        const passwordMatches = bcrypt.compareSync(enteredPassword, basePassword);
        let emailMatches = false;

        if(baseEmail === enteredEmail) {
            emailMatches = true;
        }

        if(passwordMatches && emailMatches) {
            setEnteredEmail('');
            setEnteredPassword('');
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
        }
    }, [baseEmail, basePassword, enteredEmail, enteredPassword, loggedIn]);






    // projectsRef.on('value', (snapshot) => {
    //     const projectsData = snapshot.val();
    //     // Faites quelque chose avec les données récupérées, par exemple, mettez-les à jour dans le state de votre composant React
    // });


    const projects = projets.map((project, index) => {
        return (
            JSON.stringify(project, null, 2)
        );
    });


    if(loggedIn) {
            return (
                <div id="backofficeBox">
                    <div id="doorUp"></div>
                    <div id="doorDown"></div>
                    {/* { hashedPassword } */}
                    <h2>Contenu du fichier JSON</h2>
                    <h3>projets.json</h3>
                    {/* <span className="addProject">Ajouter un projet</span> */}
                    <div className="projectList">
                        <textarea value={ projects }></textarea>
                        {/* <button>Enregistrer les modifications</button> */}
                    </div>
                    <button id="decoButton">Logout</button>
                    <button id="backButton">Retour</button>
                </div>
            )
    } else {
        return (
            // formulaire de connexion
            <div id="loginBox">
                <button id="backButton">Retour</button>
                <h1>Connexion</h1>
                <form id="loginForm">
                    <input id="emailInput" type="email" name="email" placeholder='Email' required />
                    <input id="passwordInput" type="password" name="password" placeholder='Mot de passe' required />
                    <button id="loginButton">Se connecter</button>
                </form>
            </div>
            // alert("Mauvaise combinaison email / mot de passe");
            )
    }
}