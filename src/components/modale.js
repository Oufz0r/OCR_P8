import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// import data from '../projets.json';


export default function Modale(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);


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


    const projetsRef = useMemo(() => collection(db, 'projets'), [db]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const unsubscribe = onSnapshot(projetsRef, (snapshot) => {
            const projetsData = [];
            snapshot.forEach((doc) => {
                projetsData.push(doc.data());
            });
            setData(projetsData);
        }, (error) => {
            console.error(error);
        });

        return () => unsubscribe();
    }, [projetsRef]);



    // ================================================ MAP PROJETS JSON ===============================================
    const imgList = data.filter(project => project.id === props.ident)
    .flatMap(project => project.images);
    const nbImgFromList = imgList.length;

    useEffect(() => {
        let index = 0;
        if (isOpen) {
            // animation d'ouverture
            const modal = document.querySelector('.modal');
            const modalContent = document.querySelector('.modal-content');
            modal.style.opacity = '0';
            modalContent.style.opacity = '0';
            modalContent.style.height = '0px';
            modalContent.style.overflow = 'hidden';
            setTimeout(() => {
                modal.style.transition = '0.3s';
                modal.style.opacity = '1';
                setTimeout(() => {
                    modalContent.style.transition = '0.3s';
                    modalContent.style.opacity = '1';
                    if(window.innerWidth > 1370) {
                        modalContent.style.height = '80%';
                    } else {
                        modalContent.style.height = '100%';
                    }
                    setTimeout(() => {
                        modalContent.style.overflow = 'auto';
                    }, 300);
                }, 200);
            }, 10);
            // Bloquer le défilement de l'arrière-plan lorsque la modale est ouverte
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown); // Bloquer la navigation par onglets

            const imageClick = document.querySelector('.imageClick');
            const arrowPrev = document.getElementById('arrowPrev');
            const arrowNext = document.getElementById('arrowNext');
            arrowPrev.addEventListener('click', () => {
                index = index-1;
                if(index < 0){
                    index = nbImgFromList-1;
                }
                // imageClick.setAttribute('src', `/images/${imgList[index]}`);
                imageClick.setAttribute('src', `https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/${imgList[index]}?alt=media`);
                // console.log('clicked');
            });
            arrowNext.addEventListener('click', () => {
                index = index+1;
                if(index >= nbImgFromList){
                    index = 0;
                }
                // imageClick.setAttribute('src', `/images/${imgList[index]}`);
                imageClick.setAttribute('src', `https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/${imgList[index]}?alt=media`);
                // console.log('clicked');
            });
        } else {
        // Rétablir le défilement de l'arrière-plan lorsque la modale est fermée
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown); // Rétablir la navigation par onglets
        }

        return () => {
        // Nettoyer les événements lorsque le composant est démonté
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, imgList, nbImgFromList]);

    useEffect(() => {
        if (isOpen) {
            // animation de la main pour indiquer qu'il y a plusieurs images et qu'il faut cliquer dessus pour faire défiler
            const tapHere = document.querySelector('.tapHere');
            if(tapHere) {
                let tapLoop = setInterval(() => {
                    tapHere.style.right = "20px";
                    tapHere.style.top = "50%";
                    setTimeout(() => {
                        tapHere.style.right = "";
                        tapHere.style.top = "";
                        setTimeout(() => {
                            tapHere.style.right = "20px";
                            tapHere.style.top = "50%";
                            setTimeout(() => {
                                tapHere.style.right = "";
                                tapHere.style.top = "";
                            }, 150);
                        }, 150);
                    }, 150);
                }, 1500);

                setTimeout(() => {
                    clearInterval(tapLoop);
                    tapHere.style.display = "none";
                }, 6000);
            }
        }
    }, [isOpen])

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 9) {
        // Bloquer la navigation par onglets en maintenant le focus à l'intérieur de la modale
        const modal = document.querySelector('.modal');
        if (modal && !modal.contains(event.target)) {
            event.preventDefault();
            modal.focus();
        }
        }
    };


    return (
        <div>
        <button className="modalBtn" onClick={openModal}>Voir plus <img src="/images/arrow.png" alt="une flèche" /></button>

        {isOpen && (
            <div className="modal" tabIndex="-1" role="dialog" aria-modal="true" onKeyDown={handleKeyDown}>
            <div className="modal-content">
                {/* Contenu de la modale */}
                <h2>{ props.titre.toLowerCase() }</h2>
                <div className="modal-inner-box">
                    <div className="modal-left">
                        <div className="modal-img">
                            {/* <img src={props.bground} alt="screen du projet" /> */}
                            <img src={`https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/${imgList[0]}?alt=media`} alt="screen du projet" className="imageClick" />

                            { imgList.length > 1 ? (
                                <>
                                {/* remplacer par des flèches prév, suiv. */}
                                <img src="/images/prev-next.png" id="arrowPrev" className="prev-next" alt="flèche précédente" />
                                <img src="/images/prev-next.png" id="arrowNext" className="prev-next" alt="flèche suivante" />
                                {/* <div className="tapHere">
                                    <img src="/images/tap.png" alt="cliquez-ici" />
                                </div> */}
                            </>
                            ) : "" }
                        </div>
                        {/* <br /> */}
                        {/* <hr /> */}
                        <div>
                            <a href={ props.url } target="_blank" rel="noopener noreferrer" className={props.url !== "" ? "" : "hidden"}><img src="/images/external-link.png" alt="link icon" /></a>
                            <a href={ props.ghlink } target="_blank" rel="noopener noreferrer" className={props.ghlink !== "" ? "" : "hidden"}><img src="/images/GitHub_Logo_White.png" className="invert" alt="github icon" /></a>
                        </div>
                    </div>
                    <div className="modal-right">
                        <div className="modal-desc-tags">{props.childs}</div>
                        <div className="modal-longdesc" dangerouslySetInnerHTML={{ __html: props.longdesc }}></div>
                    </div>
                </div>
                <button className="closeBtn" onClick={closeModal}>Fermer</button>
            </div>
            </div>
        )}
        </div>
    );
}