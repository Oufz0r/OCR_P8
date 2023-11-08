import React, { useState, useEffect } from 'react';
import Separateur from '../components/separateur';
import Project from '../components/project';
import Tag from '../components/tag';
import Header from '../components/header';
import Footer from '../components/footer';
import Timeline from '../components/timeline';
import Skillbar from '../components/skillbar';
import ContactForm from '../components/contactForm';

import ConnectDB from '../components/connectDB';
// eslint-disable-next-line
// import { getDatabase, onValue, child, ref, get, update, set} from 'firebase/database';
// eslint-disable-next-line
// import { initializeApp } from 'firebase/app';
// import Modale from '../components/modale';
// import { Form } from 'react-router-dom';
// import data from '../projets.json';

export default function Home(props) {
    const [projets, setProjets] = useState([]);

    function handleDataReceived(data) {
        setProjets(data);
    }





        // Utilisation d'un useEffect pour s'assurer que la page est chargée avant que JS ne récupére les éléments
    useEffect(() => {
        let spans = document.querySelectorAll("nav span");
        const logoCatch = document.querySelector("header h1 span");
        const logoCentral = document.querySelector("#logoCentral");
        const photoMe = document.querySelector(".photoMe");
        const backTop = document.querySelector("#backTop");
        
        // const logoH1 = document.querySelector("header h1");
        // const header = document.querySelector("header");
        // const nav = document.querySelector("nav");
        // const navLinks = document.querySelectorAll("nav span, nav a");


        // Vérifier si les éléments sont définis avant d'accéder à leurs propriétés
        if (logoCatch && logoCentral && backTop) {


            // Animation du prénom+nom qui tombe lettre par lettre
            logoCentral.textContent = "damien pernin";
            let timeLoop = 10;
            logoCentral.style.opacity = "0";
            setTimeout(() => {
                logoCentral.style.opacity = "1";
                const logoName = logoCentral.textContent;
                let fullName = logoName.split('');
                logoCentral.style.transition = "0.3s";
                logoCentral.textContent = '';
                for(let i=0; i < fullName.length; i++) {
                    // console.log(fullName[i]);
                    // newFullName =+ `<span>${fullName[i]}</span>`;
                    let letterBox = document.createElement("span");
                        letterBox.textContent = fullName[i];
                        letterBox.style.margin = "0px";
                        letterBox.style.opacity = "0";
                        letterBox.style.position = "relative";
                        letterBox.style.transition = "1s";
                        letterBox.style.top = "-150px";
                        setTimeout(() => {
                            letterBox.style.top = "30px";
                            letterBox.style.opacity = "1";
                            setTimeout(() => {
                                letterBox.style.top = "0px";
                            }, 1000);
                        }, timeLoop);
                        timeLoop = timeLoop+100;
                        if(fullName[i] === " ") {
                            letterBox.style.width = "20px";
                        }
                    logoCentral.appendChild(letterBox);
                }
            }, 500);

            // Animation du prénom+nom qui devient le logo
            setTimeout(() => {
                // clearTimeout(logoAnim);
                const logoName = logoCentral.textContent;
                const fullName = logoName.split(' ');
                let prenom = fullName[0];
                let nom = fullName[1];
                let count = 0;
                const intervalNom = setInterval(() => {
                    if (count < nom.length - 1) {
                        let newNom = nom.substring(0, nom.length - count - 1);
                        logoCentral.textContent = `${prenom} ${newNom}`;
                        count++;
                    } else {
                        nom = nom.substring(0, nom.length - count);
                        logoCentral.textContent = `${prenom}${nom}`;
                        clearInterval(intervalNom);
                    }
                }, 80);
                
                setTimeout(() => {
                    count = 0;
                    const intervalPrenom = setInterval(() => {
                        if (count < prenom.length - 1) {
                            let newPrenom = prenom.substring(0, prenom.length - count - 1);
                            logoCentral.textContent = `${newPrenom}${nom}`;
                            count++;
                        } else {
                            clearInterval(intervalPrenom);
                            logoRoll();
                            count = 0;
                        }
                    }, 80);
                }, 480);
            }, 4500);


        // animation au lancement de la page
        function logoRoll() {
            setTimeout(() => {
                logoCentral.style.transition = "0.5s";
                logoCentral.style.transform = "rotate(360deg)";
                logoCentral.style.fontWeight = "bold";
                setTimeout(() => {
                    if (window.innerWidth < 1000) {
                        logoCentral.style.fontSize = "250px";
                    } else {
                        logoCentral.style.fontSize = "500px";
                    }
                    setTimeout(() => {
                        logoCentral.style.transition = "0.5s";
                        if (window.innerWidth < 1000) {
                            logoCentral.style.fontSize = "150px";
                        } else {
                            logoCentral.style.fontSize = "300px";
                        }
                        setTimeout(() => {
                            logoCentral.style.fontSize = "0px";
                            // logoCentral.setAttribute("class", "logoReady");
                            setTimeout(() => {
                                // logoCentral.innerHTML = "Damien PERNIN<br>DÉVELOPPEUR FULL-STACK dans le 54";
                                // logoCentral.innerHTML = "Damien PERNIN<br>DÉVELOPPEUR FRONT-END dans le 54";
                                logoCentral.innerHTML = "Damien PERNIN<br>DÉVELOPPEUR WEB dans le 54";
                                logoCentral.style.fontSize = "";
                                logoCentral.setAttribute('class', 'logoCentralEnd');
                                // logoCentral.innerHTML = "< DÉVELOPPEUR FRONT-END dans le 54 />";
                                // logoCentral.style.fontSize = "48px";
                                // logoCentral.style.fontFamily = "Cerebri";
                                // logoCentral.style.display = "none";
                                // faire pop un texte Développeur front-end avec ma photo
                                setTimeout(() => {
                                    logoCentral.style.transition = "0s";
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 500);
                }, 500);
            }, 500);
        }
        



        // liens vers les sections
        let allSpanHomeLinks = document.querySelectorAll('.scrollHome');
        for(let n=0; n < allSpanHomeLinks.length; n++) {
            allSpanHomeLinks[n].addEventListener("click", () => {
                const home = document.querySelector("#home");
            home.scrollIntoView({ behavior: "smooth" });
            })
        }

        let allSpanAproposLinks = document.querySelectorAll('.scrollApropos');
        for(let n=0; n < allSpanAproposLinks.length; n++) {
            allSpanAproposLinks[n].addEventListener("click", () => {
                const aPropos = document.querySelector("#apropos");
            aPropos.scrollIntoView({ behavior: "smooth" });
            })
        }

        let allSpanProjetsLinks = document.querySelectorAll('.scrollProjets');
        for(let n=0; n < allSpanProjetsLinks.length; n++) {
            allSpanProjetsLinks[n].addEventListener("click", () => {
                const projets = document.querySelector("#projets");
            projets.scrollIntoView({ behavior: "smooth" });
            })
        }

        let allSpanContactLinks = document.querySelectorAll('.scrollContact');
        for(let n=0; n < allSpanContactLinks.length; n++) {
            allSpanContactLinks[n].addEventListener("click", () => {
                const contact = document.querySelector("#contact");
            contact.scrollIntoView({ behavior: "smooth" });
            })
        }

        // spans[0].addEventListener("click", () => {
        //     const aPropos = document.querySelector("#apropos");
        //     aPropos.scrollIntoView({ behavior: "smooth" });
        // });
        
        // spans[1].addEventListener("click", () => {
        //     const projets = document.querySelector("#projets");
        //     const projetsPosition = projets.getBoundingClientRect();
        //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        //     const scrollTarget = projetsPosition.top + scrollTop + 1;
        //     window.scrollTo({ top: scrollTarget, behavior: "smooth" });
        // });

        // spans[2].addEventListener("click", () => {
        //     const contact = document.querySelector("#contact");
        //     contact.scrollIntoView({ behavior: "smooth" });
        // });




        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
              // L'utilisateur a scrollé vers le bas
                // On fait apparaitre la flèche back to top
                backTop.style.display = "inline";
                backTop.style.filter = "invert(80%)";
                let valueOpa = 1-((window.scrollY)/400);
                logoCentral.style.opacity = `${valueOpa}`;
            } else {
              // L'utilisateur est en haut de la page
                backTop.style.display = "none";
                logoCentral.style.opacity = "1";
            }
        });

        backTop.addEventListener("click", () => {
            const scrollToOptions = {
                top: 0,
                behavior: "smooth"
            };
            window.scrollTo(scrollToOptions);
            // remove du underline static
            for(let n=0; n < spans.length; n++) {
                let underDiv = spans[n].querySelector("div");
                underDiv.removeAttribute('class', '');
            }
        });

        logoCatch.addEventListener("click", () => {
            const scrollToOptions = {
                top: 0,
                behavior: "smooth"
            };
            window.scrollTo(scrollToOptions);
            // remove du underline static
            for(let n=0; n < spans.length; n++) {
                let underDiv = spans[n].querySelector("div");
                underDiv.removeAttribute('class', '');
            }
        });
        
        
        //calcule de mon age
        const monAgeDiv = document.querySelector("#monAge");
        let monAge = new Date().getFullYear()-1989;
        monAgeDiv.textContent = monAge;

        // Mes compétences
function skillGrow() {
    const allSkills = document.querySelectorAll('#competences > div');
    for(let n=0; n < allSkills.length; n++)
    {
        // console.log(allSkills[n]);
        const div = allSkills[n].querySelector('div');
        const skill = div.getAttribute('data-skill');
        div.style.width = "0%";
        setTimeout(() => {
            div.style.transition = "0.5s";
            div.style.width = `${skill}%`;
        }, 250);
    }
}



// Animation lorsqu'on arrive sur les différentes Sections
let skillStatus = 0;
window.addEventListener('scroll', () => {
    // A PROPOS
    const aPropos = document.querySelector('#apropos');
    const aProposPosition = aPropos.getBoundingClientRect();
    if (aProposPosition.top <= window.innerHeight * -0.1 && aProposPosition.bottom >= window.innerHeight * -0.1) {
        if(skillStatus === 0) {
            skillGrow();
            skillStatus = 1;
        }
        // ajout du underline static
        for(let n=0; n < spans.length; n++) {
            let underDiv = spans[n].querySelector("div");
            underDiv.removeAttribute('class', '');
        }
        const activeSpan = 0;
        let underDiv = spans[activeSpan].querySelector("div");
        underDiv.setAttribute('class', 'active');
    }
    // console.log("TOP:" + aProposPosition.top + " / BOTTOM: " + aProposPosition.bottom + " / INNER: " + window.innerHeight);
    if (aProposPosition.top <= window.innerHeight * 0.5 && aProposPosition.bottom >= window.innerHeight * 0.5) {
        // logoCatch.style.color = "#2f435e";
        photoMe.style.opacity = "1";
    }
    // PROJETS
    const projets = document.querySelector('#projets');
    const projetsPosition = projets.getBoundingClientRect();
    // console.log("TOP:" + projetsPosition.top + " / BOTTOM: " + projetsPosition.bottom + " / INNER: " + window.innerHeight);
    if (projetsPosition.top <= window.innerHeight * 0.4 && projetsPosition.bottom >= window.innerHeight * 0.4) {
        // logoCatch.style.color = "#2f435e";
        setTimeout(() => {
            // charger les images en différé
            const bgrounds = document.querySelectorAll(".bground");
            bgrounds.forEach(function(bground) {
                const imageUrl = bground.dataset.src;
                if (imageUrl) {
                    const img = new Image();
                    img.src = imageUrl;
                    img.addEventListener("load", function() {
                        bground.style.backgroundImage = 'url("' + imageUrl + '")';
                    });
                }
            });

            const projectCard = document.querySelectorAll(".project");
            let timeLoopCard = 100;
            for(let n=0; n < projectCard.length; n++) {
                setTimeout(() => {
                    // projectCard[n].style.height = "500px";
                    projectCard[n].style.opacity = "1";
                    // projectCard[n].style.width = "400px";
                }, timeLoopCard);
                timeLoopCard = timeLoopCard + 200;
            }
        }, 10);
        // ajout du underline static
        for(let n=0; n < spans.length; n++) {
            let underDiv = spans[n].querySelector("div");
            underDiv.removeAttribute('class', '');
        }
        const activeSpan = 1;
        let underDiv = spans[activeSpan].querySelector("div");
        underDiv.setAttribute('class', 'active');
    }
    // CONTACT
    const contact = document.querySelector('#contact');
    const contactPosition = contact.getBoundingClientRect();
    // console.log("TOP:" + contactPosition.top + " / BOTTOM: " + contactPosition.bottom + " / INNER: " + window.innerHeight);
    if (contactPosition.top <= window.innerHeight * 0.4 && contactPosition.bottom >= window.innerHeight * 0.4) {
        // logoCatch.style.color = "#2f435e";
        // ajout du underline static
        for(let n=0; n < spans.length; n++) {
            let underDiv = spans[n].querySelector("div");
            underDiv.removeAttribute('class', '');
        }
        const activeSpan = 2;
        let underDiv = spans[activeSpan].querySelector("div");
        underDiv.setAttribute('class', 'active');
    }
    // Logo hors section
    const home = document.querySelector('#home');
    const homePosition = home.getBoundingClientRect();
    if (homePosition.top < window.innerHeight * 0 && homePosition.bottom > window.innerHeight * 0) {
        // logoCatch.style.color = "white";
    }
    // Les séparateurs
    const separateurs = document.querySelectorAll('.separateur');
    for(let n=0; n < separateurs.length; n++) {
        const separateurPosition = separateurs[n].getBoundingClientRect();
        if (separateurPosition.top < window.innerHeight * 0 && separateurPosition.bottom > window.innerHeight * 0) {
            // logoCatch.style.color = "white";
        }
    }
});
        }
        
    }, [projets]);




// ================================================ MAP PROJETS JSON ===============================================

    // const projects = data.map((project, index) => {
    //     const tags = project.tags.map((tag, tagIndex) => (
    //         <Tag key={tagIndex}>{tag}</Tag>
    //     ));
    //     return (
    //         <Project key={index} ident={project.id} titre={project.titre} bground={`/images/${project.images[0]}`} url={project.url} ghlink={project.github} className="project-card" longdesc={project.longdesc}>
    //             <p className="bg-white txt-dark small-desc">{project.smalldesc}</p>
    //             <div className="tag-box">
    //                 { tags }
    //             </div>
    //         </Project>
    //     );
    // });





    if(projets.length !== 0)
    {
        return (
            <>
            <Header />
            <div className="homeBox">
                <section id="home">
                    <div id="homeBackground"></div>
                    <div id="homeFilter"></div>
                    <div id="logoCentral">damien pernin</div>
                    {/* {console.log(data)} */}
                    {/* <div id="logoCentral">dp</div> */}

                    <div id="reseaux">
                        <div><a href="https://github.com/Oufz0r"><img src="images/github.png" alt="github" /></a></div>
                        <div><a href="https://www.linkedin.com/in/damien-pernin-723274169/"><img src="images/linkedin.png" alt="linkedin" /></a></div>
                        {/* <div><a href="https://www.instagram.com/s0oap_/"><img src="images/instagram.png" alt="instagram" /></a></div> */}
                    </div>
                </section>

                <div id="backTop"><img src="/images/up-arrow.png" alt="flèche de retour en haut de page" /></div>

                <section id="apropos" className="sec-box mrg-bot100">
                    <h2>À propos</h2>

                    <img src='https://firebasestorage.googleapis.com/v0/b/portfolio-19aed.appspot.com/o/photoMe.jpg?alt=media' className='photoMe' alt='Damien Pernin' />

                    <p className="p-large w70">Je m'appelle Damien Pernin, j'ai <span id="monAge"></span> ans et suis passionné par le monde numérique depuis mes 12 ans. Ce que j'aime, voir des maquettes et des idées prendre vie sur mon écran, découvrir et acquiérir de nouvelles compétences. Doté d'une patience inébranlable, d'une grande capacité d'adaptation, mon autonomie viendra embellir le tout.</p>

                    <p className="p-large w70">Étudier les langages et voir l'évolution du monde numérique comme la Réalité Virtuelle, voilà ce qui me passionne. Je mettrai à votre disposition toutes mes compétences, mes connaissances et espère en acquérir d'autres dans mes futurs collaborations avec vous.</p>

                    <div className="w70 mrg-top100">
                        <h3>Mes compétences</h3>
                        <center>
                            <div id="competences" className="mrg-top25 centrer-row">
                                <Skillbar name="html" color="A" skill="100" />
                                <Skillbar name="css" color="B" skill="95" />
                                <Skillbar name="javascript" color="C" skill="95" />
                                <Skillbar name="react" color="D" skill="70" />
                                <Skillbar name="nodejs" color="E" skill="65" />
                                <Skillbar name="mongodb" color="F" skill="60" />
                                <Skillbar name="php" color="G" skill="65" />
                                <Skillbar name="mysql" color="H" skill="70" />
                                <Skillbar name="vscode" color="B" skill="90" />
                                <Skillbar name="firestore" color="A" skill="60" />
                                <Skillbar name="netlify" color="D" skill="70" />
                                <Skillbar name="vue" color="C" skill="65" />
                                {/* <Skillbar name="photoshop" color="H" skill="70" /> */}
                                {/* <div id="php">
                                    <div data-skill="30">php</div>
                                </div>
                                <div id="sql">
                                    <div data-skill="20">sql</div>
                                </div> */}
                            </div>
                        </center>
                    </div>
                    <div className="w70 mrg-top100 mrg-bot100">
                        <h3>Mon parcours</h3>
                        <div id="parcours" className="mrg-top25">
                            <Timeline />
                        </div>
                    </div>
                </section>

                <Separateur />

                <section id="projets" className="sec-box">
                    <h2>Mes projets</h2>
                    <div className="project-Box">
                        {/* { projects } */}
                        {Array.isArray(projets) ? (
                            projets.map((project, index) => (
                                <Project key={index} ident={project.id} titre={project.titre} bground={`${project.images[0]}`} url={project.url} ghlink={project.github} className="project-card" longdesc={project.longdesc}>
                                    <p className="bg-white txt-dark small-desc">{project.smalldesc}</p>
                                    <div className="tag-box">
                                        {
                                            project.tags.map((tag, tagIndex) => (
                                                <Tag key={tagIndex}>{tag}</Tag>
                                            ))
                                        }
                                    </div>
                                </Project>
                            ))
                        ) : ''}
                    </div>
                </section>

                <Separateur />

                <section id="contact" className="sec-box">
                    <h2>Me contacter</h2>
                    <div className="contact-Box">
                        <ContactForm />
                        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScgOC7XKAz4E0vqGZmOAKUxp26DM1DF2jc5CFEcc0w0BuBgwg/viewform?embedded=true" width="640" height="689" frameborder="0" marginheight="0" marginwidth="0" title="contact">Chargement…</iframe> */}
                    </div>
                </section>

                <Footer />

                </div>
            </>
        )
    }

    return (
        <ConnectDB onDataReceived={handleDataReceived} />
    );
    // });
}