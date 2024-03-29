import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConnectDB from '../components/connectDB';

import Lost from './Lost';

import React from 'react';
// eslint-disable-next-line
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// import { getDatabase, onValue, child, ref, get, update, set} from 'firebase/database';
// eslint-disable-next-line
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import user from '../user.json';
// import projets from '../projets.json';

export default function Backoffice() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [projets, setProjets] = useState([]);
    const [docId, setDocId] = useState('');
    const [eraseStatus, setEraseStatus] = useState(false);
    const [checkProject, setCheckProject] = useState(false);

    const loggedStatus = localStorage.getItem('loggedIn');

    // dotenv.config();

    function handleDataReceived(data) {
        setProjets(data);
    }

    // function modifiedContent() {
    //     const saveButton = document.querySelector('.saveButton');
    //         let checkClass = saveButton.getAttribute('class');
    //         if(checkClass.includes('hidden')) {
    //             saveButton.setAttribute('class', 'saveButton');
    //         }
    // }

    // // Affichage du contenu de la textarea dans la div .wysiwyg
    // function longModifiedContent() {
    //     const showTextarea = document.querySelector('.wysiwyg');
    //     const theTextarea = document.getElementById('modLong').value;
    //     showTextarea.innerHTML = theTextarea;
    //     console.log(theTextarea);
    //     const saveButton = document.querySelector('.saveButton');
    //         let checkClass = saveButton.getAttribute('class');
    //         if(checkClass.includes('hidden')) {
    //             saveButton.setAttribute('class', 'saveButton');
    //     }
    // }

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
    const storage = getStorage(app);

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

        if (!loggedIn) {
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
        }
    },[loggedIn]);

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
                setCheckProject(false);
                setDocId('');
                window.history.replaceState({}, document.title, "/backoffice/");
            });
        }

        function openDoors() {
            const doorUp = document.getElementById("doorUp");
            const doorDown = document.getElementById("doorDown");
    
            if (doorUp && doorDown) {
                doorUp.style.top = "-50vh";
                doorDown.style.bottom = "-50vh";
            }
        }


        if(loggedIn) {
            // lancement de l'animation
            setTimeout(() => {
                openDoors();
            }, 100);
        }
    }, [loggedIn, projets, projectId]);

    useEffect(() => {
        const backButton = document.getElementById("backButton");
        if(backButton) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                setProjets([]);
                setCheckProject(false);
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
        } else if((!loggedIn && enteredPassword !== "" && !passwordMatches) || (!loggedIn && enteredEmail !== "" && !emailMatches)) {
            // affichage d'une alerte pour annoncer un mauvais combo email/password
            alert('Email et/ou mot de passe incorrect(s).');
        }
    }, [baseEmail, basePassword, enteredEmail, enteredPassword, loggedIn]);






    // ======================================================== C R U D =====================================================

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
                const saveButton = document.querySelector('.saveButton');
                saveButton.setAttribute('class', 'saveButton hidden');
            })
            .catch((error) => {
                console.log('Problème de mise à jour : ', error);
                alert('Problème de mise à jour, consultez la console.');
            });
    };

        
        // supprimer un projet dans la base de données
        const deleteProjet = () => {
            if (!eraseStatus) {
                let timerDel = 5;
                let eraseButton = document.querySelector('.eraseButton');
                eraseButton.textContent = `J'en suis sûr ! (${timerDel})`;
                eraseButton.style.backgroundColor = "#944a4ae7";
                const alarmAnim = setInterval(() => {
                    eraseButton.style.backgroundColor = "#c46262e7";
                    timerDel--;
                    eraseButton.textContent = `J'en suis sûr ! (${timerDel})`;
                    setTimeout(() => {
                        eraseButton.style.backgroundColor = "#944a4ae7";
                    }, 500);
                }, 1000);
                setInterval(() => {
                    clearInterval(alarmAnim);
                    eraseButton.style.backgroundColor = "#2f435e";
                    eraseButton.textContent = "Supprimer le projet";
                    timerDel = 5;
                    setEraseStatus(false);
                }, 5550);
                setEraseStatus(true);
            } else if (eraseStatus) {
                const projetRef = doc(db, 'projets', docId.toString());
                
                deleteDoc(projetRef)
                .then(() => {
                    alert('Projet supprimé !');
                    window.location.href = "/backoffice/";
                })
                .catch((error) => {
                    console.log('Problème de suppression : ', error);
                    alert('Problème de suppression, consultez la console.');
                });
                setEraseStatus(false);
            }
        };


        // Récupérer l'id du document dans firestore via l'id du projet
        useEffect(() => {
            const collectionRef = collection(db, "projets");
            
            getDocs(collectionRef)
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.id === projectId) {
                        setDocId(doc.id);
                        setCheckProject(true);
                        // console.log(doc.id);
                    }
                });
                })
                .catch((error) => {
                console.log("Error getting documents:", error);
                });
        }, [projectId, db, checkProject]);




        const handleImageUpload = async (event) => {
            const file = event.target.files[0];
            if(file) {
                const storageRef = ref(storage, file.name);
                await uploadBytes(storageRef, file);
                alert('Image mise en ligne !');
                
                // Récupérer l'URL de téléchargement de l'image
                const imageUrl = await getDownloadURL(storageRef);
                
                console.log(imageUrl);

                if(projectId)
                {
                    // placer l'URL dans l'input images
                    const inputImages = document.getElementById('modImages');
                    inputImages.value += `,${file.name}`;
                    modifiedContent();
                    // inputImages.defaultValue += `https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/${file.name}?alt=media`;
                }
            }
        };


        // Ouverture du form pour ajouter un projet
        function openAddProject() {
            window.location.href = "/backoffice/Add";
        }


        // GESTION TEXTAREA
        function modifiedContent() {
            const saveButton = document.querySelector('.saveButton');
                let checkClass = saveButton.getAttribute('class');
                if(checkClass.includes('hidden')) {
                    saveButton.setAttribute('class', 'saveButton');
                }
        }

        // Affichage du contenu de la textarea dans la div .wysiwyg
        function longModifiedContent() {
            const showTextarea = document.querySelector('.wysiwyg').innerHTML;
            const theTextarea = document.getElementById('modLong');
            theTextarea.value = showTextarea;
            // showTextarea.innerHTML = theTextarea.value;
            const saveButton = document.querySelector('.saveButton');
                let checkClass = saveButton.getAttribute('class');
                if(checkClass.includes('hidden')) {
                    saveButton.setAttribute('class', 'saveButton');
            }
        }

        // Une fois un projet sélectionné, on charge le contenu du textarea dans la div de visualisation wysiwyg
        function loadHtmlOneTime() {
        setTimeout(() => {
            // console.log('loaded');
            const showTextarea = document.querySelector('.wysiwyg');
            const theTextarea = document.getElementById('modLong').value;
            showTextarea.innerHTML = theTextarea;
        }, 100);
    }

    // wrapper la sélection entre des balises ( <b>sélection</b> )
    function wrapIt(balise) {
        // Récupérer la sélection de texte
        const selection = window.getSelection();
        // Vérifier s'il y a une sélection de texte
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            // Créer une balise <b> pour le texte en gras
            const boldElement = document.createElement(`${balise}`);
            // Appliquer la balise <b> autour de la sélection de texte
            range.surroundContents(boldElement);
            // Effacer la sélection de texte après l'application du style
            selection.removeAllRanges();
        
            // Créer un nouveau range après l'élément <b>
            const newRange = document.createRange();
            newRange.setStartAfter(boldElement);
            newRange.collapse(true);
        
            // Sélectionner le nouveau range
            selection.addRange(newRange);
        
            // Mettre à jour le textarea
            const showTextarea = document.querySelector('.wysiwyg').innerHTML;
            const theTextarea = document.getElementById('modLong');
            theTextarea.value = showTextarea;

            // afficher le bouton d'enregistrement après modification
            const saveButton = document.querySelector('.saveButton');
                let checkClass = saveButton.getAttribute('class');
                if(checkClass.includes('hidden')) {
                    saveButton.setAttribute('class', 'saveButton');
            }
        }
    }


    // Supprimer les balises dans la sélection
    function removeTags() {
        // Récupérer la sélection de texte
        const selection = window.getSelection();
    
        // Vérifier s'il y a une sélection de texte
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
        
            // Extraire le contenu de la sélection
            const extractedContents = range.extractContents();
        
            // Créer un conteneur temporaire
            const tempContainer = document.createElement('div');
            tempContainer.appendChild(extractedContents);
        
            // Supprimer les balises HTML spécifiques du contenu extrait
            const cleanedContent = removeSpecificTags(tempContainer.innerHTML);
        
            // Créer un fragment de document pour réinsérer le contenu nettoyé
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cleanedContent;
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
        
            // Insérer le contenu nettoyé dans la sélection
            range.deleteContents();
            range.insertNode(fragment);
        
            // Effacer la sélection de texte après la suppression des balises
            selection.removeAllRanges();
        
            // Mettre à jour le contenu de la div .wysiwyg
            const showTextarea = document.querySelector('.wysiwyg').innerHTML;
            const theTextarea = document.getElementById('modLong');
            theTextarea.value = showTextarea;
        
            // Afficher le bouton d'enregistrement après modification
            const saveButton = document.querySelector('.saveButton');
            let checkClass = saveButton.getAttribute('class');
            if (checkClass.includes('hidden')) {
                saveButton.setAttribute('class', 'saveButton');
            }
        }
    }
    
    function removeSpecificTags(html) {
        // Supprimer les balises HTML spécifiques du contenu
        const cleanedContent = html.replace(/<\/?(?:b|u|i|h4)>/g, '');
        return cleanedContent;
    }
    





        // ajouter une image à l'endroit du curseur texte
        const insertImage = () => {
            const img = document.createElement('img');
            img.src = '/images/arrow.png';
            img.alt = 'fleche';
            img.style.transform = "rotate(180deg)";
            img.style.width = "15px";
            img.style.height = "17px";
        
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            
            range.insertNode(img);
            
            // Créer un nouveau range après l'image
            const newRange = document.createRange();
            newRange.setStartAfter(img);
            newRange.collapse(true);
            
            // Sélectionner le nouveau range
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            // Mettre à jour le textarea
            const showTextarea = document.querySelector('.wysiwyg').innerHTML;
            const theTextarea = document.getElementById('modLong');
            theTextarea.value = showTextarea;
            
            // Définir le focus sur l'élément éditable
            const wysiwygElement = document.querySelector('.wysiwyg');
            wysiwygElement.focus();
        };



        if(projets.length !== 0 || !loggedStatus)
        // if(projets.length !== 0)
        {
    if(loggedIn) {
        localStorage.setItem('nbProjets', projets.length);
        // On vérifie que l'id du projet existe
        if(checkProject === false && projectId) {
            return (<Lost />)
        }
        // window.history.replaceState({}, document.title, "/backoffice");
            return (
                <div id="backofficeBox">
                    <div id="doorUp"></div>
                    <div id="doorDown"></div>
                    {docId ? (loadHtmlOneTime()) : ''}
                    {/* { hashedPassword } */}
                    <h2>Gestion de mes projets</h2>
                    {/* <input type="file" onChange={handleImageUpload} /> */}
                    {/* <img src="" className="imageHere" alt="uploaded one" /> */}
                    {
                        projectId ? (<h4 className="saveButton hidden" onClick={majONEProjet}>Enregistrer les modifications</h4>) : (<h4 className="addButton" onClick={openAddProject}>Ajouter un projet</h4>)
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
                                        <input type="text" name="titre" id="modTitre" defaultValue={project.titre} onChange={modifiedContent} />
                                        Url
                                        <input type="text" name="url" id="modUrl" defaultValue={project.url} onChange={modifiedContent} />
                                        Github
                                        <input type="text" name="github" id="modGithub" defaultValue={project.github} onChange={modifiedContent} />
                                        Tags
                                        <input type="text" name="tags" id="modTags" defaultValue={project.tags} onChange={modifiedContent} />
                                        Images
                                        <input type="text" name="images" id="modImages" defaultValue={project.images} onChange={modifiedContent} />
                                        Small desc
                                        <textarea type="text" name="smalldesc" id="modSmall" defaultValue={project.smalldesc} onChange={modifiedContent}></textarea>
                                        Long desc<br />
                                        <button className="htmlButton" type="button" onClick={() => wrapIt('h4')}>Titre</button>
                                        <button className="htmlButton" type="button" onClick={() => wrapIt('b')}>Gras</button>
                                        <button className="htmlButton" type="button" onClick={() => wrapIt('i')}>Italique</button>
                                        <button className="htmlButton" type="button" onClick={() => wrapIt('u')}>Souligner</button>
                                        <button className="htmlButton hidden" type="button" onClick={() => wrapIt('p')}>Paragraphe</button>
                                        <button className="htmlButton" type="button" onClick={insertImage}>Flèche</button>
                                        <button className="htmlButton" type="button" onClick={removeTags}>Eff. balises</button>
                                        {/* className hidden */}
                                        <textarea type="text" name="longdesc" id="modLong" className="hidden" defaultValue={project.longdesc.replace(/\n/g, '')}></textarea>
                                        <div className="wysiwyg" contentEditable="true" spellCheck="true" onInputCapture={longModifiedContent}></div>
                                        {/* {project.images.map((image, index) => (
                                            <input type="text" name={`image${index}`} />
                                        ))} */}
                                    </form>
                                    <label htmlFor="files" className="button">Ajouter un screen</label>
                                    <input type="file" id="files" style={{ visibility: 'hidden' }} onChange={handleImageUpload} />
                                    <button className="eraseButton" onClick={deleteProjet}>Supprimer le projet</button>
                                </div>
                                    ) : ''
                                ) : (
                                    <div className="project" key={index}>
                                        {}
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
    } else if (!loggedStatus) {
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