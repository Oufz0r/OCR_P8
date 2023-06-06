import { useEffect, useState } from 'react';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Add() {
    const [loggedIn, setLoggedIn] = useState(false);
    // const nbProjets = localStorage.getItem('nbProjets');

    // On vérifie l'état de connexion
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn === 'true') {
            setLoggedIn(true);
        }
    },[loggedIn]);

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


    useEffect(() => {
        const backButton = document.getElementById("backButton");
        if(backButton) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                    window.location.href = "/backoffice/"
            });
        }
    },[loggedIn])


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

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if(file) {
            const storageRef = ref(storage, file.name);
            await uploadBytes(storageRef, file);
            alert('Image mise en ligne !');
            
            // Récupérer l'URL de téléchargement de l'image
            const imageUrl = await getDownloadURL(storageRef);
            
            console.log(imageUrl);

                // placer l'URL dans l'input images
                const inputImages = document.getElementById('modImages');
                if(inputImages.value === '')
                {
                    inputImages.value += `${file.name}`;
                } else {
                    inputImages.value += `,${file.name}`;
                }
                modifiedContent();
                // inputImages.defaultValue += `https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/${file.name}?alt=media`;
        }
    };


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

    // sauvegarder le projet dans la bdd
    function saveProject() {
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

        const projetsCollectionRef = collection(db, 'projets');

        let nbProjets = parseInt(localStorage.getItem('nbProjets'));
        // console.log(nbProjets);
        let newId = nbProjets+1;

        addDoc(projetsCollectionRef, {
            id: newId.toString(),
            titre: titre,
            url: url,
            github: github,
            images: cleanedImagesArray,
            tags: cleanedTagsArray,
            smalldesc: small,
            longdesc: cleanedLong,
        })
        .then((docRef) => {
            alert('Projet ajouté avec succès !');
            window.location.href = "/backoffice/";
            // Effectuer d'autres actions nécessaires après l'ajout du projet
        })
        .catch((error) => {
            console.log('Problème d\'ajout du projet : ', error);
            alert('Problème d\'ajout du projet, consultez la console.');
        });
    }

        if(loggedIn)
        {
    return (
        <>
        <div className="newAdd">
            <h4 className="saveButton hidden" onClick={saveProject}>Enregistrer le projet</h4>
            <div className="project">
                <h3>Nouveau projet</h3>
                <form>
                    Titre
                    <input type="text" name="titre" id="modTitre" placeholder="Titre" onChange={modifiedContent} />
                    Url
                    <input type="text" name="url" id="modUrl" placeholder="Url" onChange={modifiedContent} />
                    Github
                    <input type="text" name="github" id="modGithub" placeholder="Github" onChange={modifiedContent} />
                    Tags
                    <input type="text" name="tags" id="modTags" placeholder="Tags: HTML,CSS,JS.." onChange={modifiedContent} />
                    Images
                    <input type="text" name="images" id="modImages" placeholder="Screens" onChange={modifiedContent} />
                    Small desc
                    <textarea type="text" name="smalldesc" id="modSmall" placeholder="Petite description" onChange={modifiedContent}></textarea>
                    Long desc<br />
                    <button className="htmlButton" type="button" onClick={() => wrapIt('h4')}>Titre</button>
                    <button className="htmlButton" type="button" onClick={() => wrapIt('b')}>Gras</button>
                    <button className="htmlButton" type="button" onClick={() => wrapIt('i')}>Italique</button>
                    <button className="htmlButton" type="button" onClick={() => wrapIt('u')}>Souligner</button>
                    <button className="htmlButton hidden" type="button" onClick={() => wrapIt('p')}>Paragraphe</button>
                    <button className="htmlButton" type="button" onClick={insertImage}>Flèche</button>
                    <button className="htmlButton" type="button" onClick={removeTags}>Eff. balises</button>
                    <textarea type="text" name="longdesc" id="modLong" className="hidden"></textarea>
                    <div className="wysiwyg" contentEditable="true" spellCheck="true" placeholder="Longue description" onInputCapture={longModifiedContent}></div>
                    {/* {project.images.map((image, index) => (
                        <input type="text" name={`image${index}`} />
                    ))} */}
                </form>
                <label htmlFor="files" className="button">Ajouter un screen</label>
                <input type="file" id="files" style={{ visibility: 'hidden' }} onChange={handleImageUpload} />
                    <button id="backButton">Retour</button>
            </div>
        </div>
        </>
    )
    } else {
        return (
            <h2>Vous n'êtes pas connecté.</h2>
        )
    }
}