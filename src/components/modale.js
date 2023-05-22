import React, { useState, useEffect } from 'react';

export default function Modale(props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
        // Bloquer le défilement de l'arrière-plan lorsque la modale est ouverte
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown); // Bloquer la navigation par onglets
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
    }, [isOpen]);

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
        <button className="modalBtn" onClick={openModal}>Voir plus <img src="images/arrow.png" alt="une flèche" /></button>

        {isOpen && (
            <div className="modal" tabIndex="-1" role="dialog" aria-modal="true" onKeyDown={handleKeyDown}>
            <div className="modal-content">
                <h2>{ props.titre.toLowerCase() }</h2>
                {/* <p>Contenu de la modale</p> */}
                <div className="modal-inner-box">
                    <div className="modal-img"><img src={props.bground} alt="screen du projet" /></div>
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