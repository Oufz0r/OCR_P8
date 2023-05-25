import React, { useEffect } from 'react';

export default function Header() {

    useEffect(() => {
        let spans = document.querySelectorAll("nav span");
        const logoCatch = document.querySelector("header h1 span");
        const logoH1 = document.querySelector("header h1");
        const header = document.querySelector("header");
        const nav = document.querySelector("nav");
        const navLinks = document.querySelectorAll("nav span, nav a");


        window.addEventListener('scroll', function() {
            // A PROPOS
            const aPropos = document.querySelector('#apropos');
            const aProposPosition = aPropos.getBoundingClientRect();


            // On Scroll et on garde le header visible ===================================================== < DESKTOP
            if(aProposPosition.top <= window.innerHeight * 0.1 && window.innerWidth > 1360) {
                nav.style.top = "35px";
                header.style.backgroundColor = "white";
                // header.style.boxShadow = "0px 5px 15px #212121";
                logoCatch.style.color = "#2f435e";
                logoH1.style.top = "5px";
                for(let i=0; i<navLinks.length; i++)
                {navLinks[i].style.color = "#2f435e";}
            } else if (aProposPosition.top > window.innerHeight * 0.1  && window.innerWidth > 1360) {
                for(let n=0; n < spans.length; n++) {
                    let underDiv = spans[n].querySelector("div");
                    underDiv.removeAttribute('class', '');
                }
                nav.style.top = "60px";
                header.style.backgroundColor = "";
                // header.style.boxShadow = "none";
                logoCatch.style.color = "white";
                logoH1.style.top = "15px";
                for(let i=0; i<navLinks.length; i++)
                {navLinks[i].style.color = "white";} 
            }

            // On Scroll et on garde le header visible ===================================================== < MOBILE
            if(aProposPosition.top <= window.innerHeight * 0.2 && window.innerWidth <= 1360) {
                nav.style.top = "0px";
                header.style.backgroundColor = "white";
                // header.style.boxShadow = "0px 5px 15px #212121";
                logoCatch.style.color = "#2f435e";
                // logoH1.style.top = "5px";
                for(let i=0; i<navLinks.length; i++)
                {navLinks[i].style.color = "#2f435e";}
            } else if(aProposPosition.top > window.innerHeight * 0.2 && window.innerWidth <= 1360) {
                for(let n=0; n < spans.length; n++) {
                    let underDiv = spans[n].querySelector("div");
                    underDiv.removeAttribute('class', '');
                }
                // nav.style.top = "60px";
                header.style.backgroundColor = "";
                // header.style.boxShadow = "none";
                logoCatch.style.color = "white";
                // logoH1.style.top = "15px";
                for(let i=0; i<navLinks.length; i++)
                {navLinks[i].style.color = "white";} 
            }

            // DESKTOP
            const navUnderline = document.querySelectorAll("nav span div");
            if(window.scrollY > 850 && window.innerWidth > 1360) {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#2f435e";
                    header.setAttribute('class', 'headerActive');
                }
            } else if(window.scrollY <= 850 && window.innerWidth > 1360) {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#ececec";
                    header.removeAttribute('class', 'headerActive');
                }
            }
            // MOBILE
            if(window.scrollY > 600 && window.innerWidth <= 1360) {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#2f435e";
                    header.setAttribute('class', 'headerActive');
                }
            } else if(window.scrollY <= 600 && window.innerWidth <= 1360) {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#ececec";
                    header.removeAttribute('class', 'headerActive');
                }
            }
        });
    },[]);
    
    return (
            <header className="App-header">
                <h1>
                    <span>dp</span>
                </h1>
                <nav>
                    <span className="scrollApropos">à propos<div /></span>
                    <span className="scrollProjets">mes projets<div /></span>
                    <span className="scrollContact">contact<div /></span>
                    {/* <span><a href="http://s693680073.onlinehome.fr/1CV/index.html" target="_blank" rel="noreferrer">curriculum vitæ</a><div /></span> */}
                </nav>
            </header>
        )
    }