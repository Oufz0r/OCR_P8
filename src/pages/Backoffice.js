import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConnectDB from '../components/connectDB';
// eslint-disable-next-line
import { getFirestore, collection, where, onSnapshot, getDocs, getDoc, updateDoc, setDoc, doc } from 'firebase/firestore';
// import { getDatabase, onValue, child, ref, get, update, set} from 'firebase/database';
// eslint-disable-next-line
import { initializeApp } from 'firebase/app';

import user from '../user.json';
// import projets from '../projets.json';

export default function Backoffice() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [projets, setProjets] = useState([]);
    const [docId, setDocId] = useState([]);

    // dotenv.config();

    function handleDataReceived(data) {
        setProjets(data);
    }

    const { projectId } = useParams();

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // const dbRef = ref(db);
    // get(child(dbRef, `/projets`))
    // .then((snapshot) => {
    //     if (snapshot.exists()) {
    //         // console.log(snapshot.val());
    //         setProjets(snapshot.val());
            
    //     } else {
    //         console.log("No data available");
    //     }
    //     }).catch((error) => {
    //         console.error(error);
    // });



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
                // alert('Vous êtes déconnecté.');
                setProjets([]);
                window.history.replaceState({}, document.title, "/backoffice/");
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
    }, [loggedIn, projets]);

    useEffect(() => {
        const backButton = document.getElementById("backButton");
        if(backButton) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                projectId ? (
                    window.location.href = "/backoffice/"
                ) : (
                    window.location.href = "/"
                );
            });
        }
    },[loggedIn, projets, projectId])

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






    // mettre à jour le projet dans la base de données
    const majONEProjet = () => {
        const titre = document.getElementById('modTitre').value;
        const url = document.getElementById('modUrl').value;
        const github = document.getElementById('modGithub').value;
        const images = document.getElementById('modImages').value;
        const tags = document.getElementById('modTags').value;
        const small = document.getElementById('modSmall').value;
        const long = document.getElementById('modLong').value;
        
        // Split et Supprime les espaces supplémentaires autour de chaque image/tag
        const imagesArray = images.split(',');
        const cleanedImagesArray = imagesArray.map((image) => image.trim());
        const tagsArray = tags.split(',');
        const cleanedTagsArray = tagsArray.map((tag) => tag.trim());
        
        // Remplacer les retours à la ligne par des \n
        const cleanedLong = long.replace(/\n/g, '');
        
        const projetRef = doc(db, 'projets', (docId).toString());
        
        updateDoc(projetRef, {
            titre: titre,
            id: projectId,
            url: url,
            github: github,
            images: cleanedImagesArray,
            tags: cleanedTagsArray,
            smalldesc: small,
            longdesc: cleanedLong,
        })
            .then(() => {
            alert('Projet mis à jour !');
            })
            .catch((error) => {
            console.log('Problème de mise à jour', error);
            alert('Problème de mise à jour');
            });
        };
    

        useEffect(() => {
            const collectionRef = collection(db, "projets");
            
            getDocs(collectionRef)
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.id === projectId) { // Remplacez "id" par le nom de votre champ d'ID à l'intérieur du document
                        setDocId(doc.id);
                        console.log(doc.id);
                    }
                });
                })
                .catch((error) => {
                console.log("Error getting documents:", error);
                });
        }, [projectId, db]);


        if(projets.length !== 0 || !loggedIn)
        // if(projets.length !== 0)
        {
    if(loggedIn) {
        // window.history.replaceState({}, document.title, "/backoffice");
            return (
                <div id="backofficeBox">
                    <div id="doorUp"></div>
                    <div id="doorDown"></div>
                    {/* { hashedPassword } */}
                    <h2>Gestion de mes projets</h2>
                    {
                        projectId ? (<h4 className="saveButton" onClick={majONEProjet}>Enregistrer les modifications</h4>) : (<h4 className="addButton">Ajouter un projet</h4>)
                    }
                    {/* <span className="addProject">Ajouter un projet</span> */}
                    <div className="projectList">
                        {/* <textarea value={ projects }></textarea> */}
                        {/* <button>Enregistrer les modifications</button> */}
                        {Array.isArray(projets) ? (
                            projets.map((project, index) => (
                                projectId ? (
                                    projectId === project.id ? (
                                <div className="project" key={index}>
                                    <h3><a href={`./${project.id}`}>{project.titre}</a></h3>
                                    <form formid={index}>
                                        Titre
                                        <input type="text" name="titre" id="modTitre" defaultValue={project.titre} />
                                        Url
                                        <input type="text" name="url" id="modUrl" defaultValue={project.url} />
                                        Github
                                        <input type="text" name="github" id="modGithub" defaultValue={project.github} />
                                        Tags
                                        <input type="text" name="tags" id="modTags" defaultValue={project.tags} />
                                        Images
                                        <input type="text" name="images" id="modImages" defaultValue={project.images} />
                                        Small desc
                                        <textarea type="text" name="smalldesc" id="modSmall" defaultValue={project.smalldesc}></textarea>
                                        Long desc
                                        <textarea type="text" name="longdesc" id="modLong" defaultValue={project.longdesc.replace(/\\n/g, '\n')}></textarea>
                                        {/* {project.images.map((image, index) => (
                                            <input type="text" name={`image${index}`} />
                                        ))} */}
                                    </form>
                                </div>
                                    ) : ''
                                ) : (
                                    <div className="project" key={index}>
                                    <a href={`./${project.id}`}><h3>{project.titre}{docId.id}</h3></a>
                                </div>
                                )
                            ))
                            ) : (
                            <p>Aucun projet trouvé.</p>
                        )}
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
                <form method="POST" id="loginForm">
                    <input id="emailInput" type="email" name="email" placeholder='Email' required />
                    <input id="passwordInput" type="password" name="password" placeholder='Mot de passe' required />
                    <button id="loginButton">Se connecter</button>
                </form>
            </div>
            // alert("Mauvaise combinaison email / mot de passe");
            )
    }
}

return (
    <ConnectDB onDataReceived={handleDataReceived} />
);
}