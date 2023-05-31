export default function Footer() {
    return (
        <footer>
            <ul className="icons">
                <li><a href="https://github.com/Oufz0r"><ion-icon name="logo-github"></ion-icon></a></li>
                <li><a href="https://www.linkedin.com/in/damien-pernin-723274169/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                {/* <li><a href="https://www.instagram.com/s0oap_/"><ion-icon name="logo-instagram"></ion-icon></a></li> */}
            </ul>
            <ul className="menu">
                    <li><span className="scrollHome">Home</span></li>
                    <li><span className="scrollApropos">À propos</span></li>
                    <li><span className="scrollProjets">Mes projets</span></li>
                    <li><span className="scrollContact">Contact</span></li>
            </ul>
                <div className="footer-copyright">
                    <p>Portfolio développé par Damien PERNIN</p>
                </div>
        </footer>
    )
}