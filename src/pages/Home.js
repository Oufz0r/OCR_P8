import React, { useEffect } from 'react';
import Separateur from '../components/separateur';
import Project from '../components/project';
import Tag from '../components/tag';

export default function Home(props) {
    useEffect(() => {
        let spans = document.querySelectorAll("nav span");
        const logoCatch = document.querySelector("header span");
        const logoCentral = document.querySelector("#logoCentral");
        const backTop = document.querySelector("#backTop");
        logoCentral.style.fontSize = "80px";


        // Vérifier si les éléments sont définis avant d'accéder à leurs propriétés
        if (logoCatch && logoCentral && backTop) {


            setTimeout(() => {
                const logoName = logoCentral.textContent;
                const fullName = logoName.split(' ');
                let prenom = fullName[0];
                let nom = fullName[1];
                // console.log(prenom + nom);
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
                }, 100);
                
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
                    }, 100);
                }, 600);
            }, 2000);

        // animation au lancement de la page
        function logoRoll() {
            setTimeout(() => {
                logoCentral.style.transition = "0.5s";
                logoCentral.style.transform = "rotate(360deg)";
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
                            logoCentral.style.transition = "0s";
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }
        
        // logoRoll();



        for(let n=0; n < spans.length; n++) {
            spans[n].addEventListener("click", (e) => {
                // function animation avant l'autoscroll
                
            });
        }


        
        spans[0].addEventListener("click", () => {
            const aPropos = document.querySelector("#apropos");
            aPropos.scrollIntoView({ behavior: "smooth" });
        });
        
        spans[1].addEventListener("click", () => {
            const projets = document.querySelector("#projets");
            const projetsPosition = projets.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollTarget = projetsPosition.top + scrollTop + 1;
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
              // L'utilisateur a scrollé vers le bas
                // On fait apparaitre la flèche back to top
                backTop.style.display = "inline";
                backTop.style.filter = "invert(80%)";
                // spans[3].style.display = 'none';
                let valueOpa = 1-((window.scrollY)/400);
                spans[0].style.opacity = `${valueOpa}`;
                spans[1].style.opacity = `${valueOpa}`;
                spans[2].style.opacity = `${valueOpa}`;
                logoCentral.style.opacity = `${valueOpa}`;
                for(let n=0; n < spans.length; n++) {
                    if(spans[n].style.opacity < 0.2){spans[n].style.display = 'none';}
                    if(spans[n].style.opacity >= 0.2){spans[n].style.display = 'inline';}
                }
            } else {
              // L'utilisateur est en haut de la page
                backTop.style.display = "none";
                // spans[3].style.display = 'inline';
                spans[0].style.opacity = "1";
                spans[1].style.opacity = "1";
                spans[2].style.opacity = "1";
                logoCentral.style.opacity = "1";
            }
        });

        backTop.addEventListener("click", () => {
            const scrollToOptions = {
                top: 0,
                behavior: "smooth"
            };
            window.scrollTo(scrollToOptions);
        });

        logoCatch.addEventListener("click", () => {
            const scrollToOptions = {
                top: 0,
                behavior: "smooth"
            };
            window.scrollTo(scrollToOptions);
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



// Animation lorsqu'on arrive sur À propos
let skillStatus = 0;
window.addEventListener('scroll', () => {
    // A PROPOS
    const aPropos = document.querySelector('#apropos');
    const aProposPosition = aPropos.getBoundingClientRect();
    if (aProposPosition.top <= window.innerHeight * 0.5 && aProposPosition.bottom >= window.innerHeight * 0.5) {
        if(skillStatus === 0) {
            skillGrow();
            skillStatus = 1;
        }
    }
    // console.log("TOP:" + aProposPosition.top + " / BOTTOM: " + aProposPosition.bottom + " / INNER: " + window.innerHeight);
    if (aProposPosition.top <= window.innerHeight * 0 && aProposPosition.bottom >= window.innerHeight * 0) {
        logoCatch.style.color = "#2f435e";
    }
    // PROJETS
    const projets = document.querySelector('#projets');
    const projetsPosition = projets.getBoundingClientRect();
    // console.log("TOP:" + projetsPosition.top + " / BOTTOM: " + projetsPosition.bottom + " / INNER: " + window.innerHeight);
    if (projetsPosition.top <= window.innerHeight * 0 && projetsPosition.bottom >= window.innerHeight * 0) {
        logoCatch.style.color = "#2f435e";
    }
    // Logo hors section
    const home = document.querySelector('#home');
    const homePosition = home.getBoundingClientRect();
    if (homePosition.top < window.innerHeight * 0 && homePosition.bottom > window.innerHeight * 0) {
        logoCatch.style.color = "white";
    }
    // Les séparateurs
    const separateurs = document.querySelectorAll('.separateur');
    for(let n=0; n < separateurs.length; n++) {
        const separateurPosition = separateurs[n].getBoundingClientRect();
        if (separateurPosition.top < window.innerHeight * 0 && separateurPosition.bottom > window.innerHeight * 0) {
            logoCatch.style.color = "white";
        }
    }
});
        }
        
    }, []);

    



    return (
        <>
            <section id="home">
                <nav>
                    <span>À PROPOS</span>
                    <span>MES PROJETS</span>
                    <span><a href="http://s693680073.onlinehome.fr/1CV/index.html" target="_blank" rel="noreferrer">CURRICULUM VITÆ</a></span>
                </nav>

                <div id="logoCentral">damien pernin</div>
                {/* <div id="logoCentral">dp</div> */}

                <div id="reseaux">
                    <div><a href="/"><img src="images/github.png" alt="github" /></a></div>
                    <div><a href="/"><img src="images/linkedin.png" alt="linkedin" /></a></div>
                    <div><a href="/"><img src="images/instagram.png" alt="instagram" /></a></div>
                </div>
            </section>

            <div id="backTop"><img src="/images/up-arrow.png" alt="flèche de retour en haut de page" /></div>

            <section id="apropos" className="sec-box">
                <h2>À propos</h2>

                <p className="p-large">Je m'appelle Damien Pernin, rêveur et créateur dans l'âme depuis <span id="monAge"></span>ans. J'aime transformer des maquettes en code pour laisser mon empreinte dans ce monde. Doté d'une patience inébranlable, d'une grande capacité d'adaptation, mon autonomie viendra embellir le tout.</p>

                <p className="p-large">Étudier des langages, découvrir des nouveautés et l'évolution du monde informatique, voilà ce qui me passionne. Je mettrais à votre disposition toutes mes compétences, mes connaissances et espère en acquérir d'autres dans mes futurs collaborations avec vous.</p>

                <div className="mrg-top100">
                    <h3>Mes compétences</h3>
                    <div id="competences" className="mrg-top25">
                        <div id="html">
                            <div data-skill="100">html</div>
                        </div>
                        <div id="css">
                            <div data-skill="90">css</div>
                        </div>
                        <div id="javascript">
                            <div data-skill="60">javascript</div>
                        </div>
                        <div id="react">
                            <div data-skill="55">react</div>
                        </div>
                        <div id="nodejs">
                            <div data-skill="50">nodejs</div>
                        </div>
                        <div id="mongodb">
                            <div data-skill="50">mongodb</div>
                        </div>
                        {/* <div id="php">
                            <div data-skill="30">php</div>
                        </div>
                        <div id="sql">
                            <div data-skill="20">sql</div>
                        </div> */}
                    </div>
                </div>
            </section>

            <Separateur />

            <section id="projets" className="sec-box">
                <h2>Mes projets</h2>
                <div className="project-Box">
                    <Project titre="Booki" bground="/images/screen-booki.png" url="https://oufz0r.github.io/OCR_P2/" className="project-card">
                        <p className="bg-white txt-dark">Intégration d'un site web statique et responsive en HTML/CSS à partir d'une maquette Figma pour un projet de formation OpenClassrooms.</p>
                        <div className="tag-box">
                            <Tag>HTML</Tag>
                            <Tag>CSS</Tag>
                        </div>
                    </Project>
                    <Project titre="Sophie Bluel" bground="/images/screen-sbluel.png" url="https://github.com/Oufz0r/OCR_P3" className="project-card">
                        <p className="bg-white">Développement du Front pour le site de la Photographe Sophie Bluel, et mise en lien avec le backend via une API. (Connexion, ajout et suppression de projets via une modale).</p>
                        <div className="tag-box">
                            <Tag>HTML</Tag>
                            <Tag>CSS</Tag>
                            <Tag>Javascript</Tag>
                            <Tag>NodeJS</Tag>
                        </div>
                    </Project>
                    <Project titre="Kasa" bground="/images/screen-kasa.png" url="https://dreamy-rugelach-7e710f.netlify.app/" className="project-card">
                    <p className="bg-white">Création du Front d'une application web de location immobilière pour Kasa, avec React à partir d'une maquette Figma. Projet de formation OpenclassRooms.</p>
                        <div className="tag-box">
                            <Tag>CSS</Tag>
                            <Tag>React</Tag>
                        </div>
                    </Project>
                </div>
            </section>
        </>
    )
}