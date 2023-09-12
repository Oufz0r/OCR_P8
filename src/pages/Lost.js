// import { doc } from "firebase/firestore";

export default function Lost() {
    let Oups = "Oups! La page que<BR>vous demandez n'existe pas.";
    let Oups1 = Oups.split("<BR>")[0];
    let Oups2 = Oups.split("<BR>")[1];
    let brOups = '';
    if(window.screen.width <= 1440){brOups=<br />;}

    if(window.location.href !== 'https://damien-pernin.netlify.app/') {
        const htmlCore = document.getElementsByTagName("html");
        htmlCore.style.backgroundColor = '#2f435e';
    }

    return (
        <div className="box404">
            <div className="error-slot">
                <div className="big-text">404</div>
                {/* <div className="small-text">Oups! La page que vous demandez n'existe pas.</div> */}
                <div className="small-text">{ Oups1 } { brOups } { Oups2 }</div>
            </div>
            <a href="/">Retourner à la page d'accueil</a>
        </div>
    )
}