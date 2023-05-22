export default function timeline() {

    return (

        <ul className="timeline">

            <li>
                <div className="direction-r">
                    <div className="flag-wrapper">
                        <span className="flag">OpenClassrooms</span>
                        <span className="time-wrapper"><span className="time">2022 - present</span></span>
                    </div>
                    <div className="desc">Formation Développeur web, en route pour une nouvelle vie.</div>
                </div>
            </li>

            <li>
                <div className="direction-l">
                    <div className="flag-wrapper">
                        <span className="flag">Centravet</span>
                        <span className="time-wrapper"><span className="time">2017 - 2022</span></span>
                    </div>
                    <div className="desc">Employé comme préparateur de commandes et cariste dans un dépôt vétérinaire.</div>
                </div>
            </li>

            <li>
                <div className="direction-r">
                    <div className="flag-wrapper">
                        <span className="flag">Intérim</span>
                        <span className="time-wrapper"><span className="time">2009 - 2017</span></span>
                    </div>
                    <div className="desc">Occupation de différents postes dans plusieurs entreprises en tant qu'intérimaire : Cariste, Préparateur de commandes, Magasinier..</div>
                </div>
            </li>

        </ul>
    );
}