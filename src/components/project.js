import { useEffect } from "react";
import Modale from '../components/modale';

export default function Project(props) {
    
    useEffect(() => {
        // animation
        // console.log(props.ident);
    },[]);

    return (
        <>
                <div className="project">
                    <a href={ props.url !== "" ? props.url : props.ghlink } className="project-link" target="_blank" rel="noopener noreferrer">
                        <div>
                            { props.titre }
                        </div>
                    </a>
                    <div style={{backgroundImage:`url(${props.bground})`}} className="bground">
                        {/* <p>{ props.children }</p> */}
                        <div className="inner-desc">
                            <div className="descLinks">
                                {/* <a href={ props.url } target="_blank" rel="noopener noreferrer" className={props.url !== "" ? "" : "hidden"}><img src="images/external-link.png" alt="link icon" className="invert" /></a> */}
                                {/* <a href={ props.ghlink } target="_blank" rel="noopener noreferrer" className={props.ghlink !== "" ? "" : "hidden"}><img src="images/GitHub_Logo_White.png" className="github-logo" alt="github icon" /></a> */}
                                <span><Modale ident={props.ident} bground={props.bground} titre={props.titre} url={props.url} ghlink={props.ghlink} longdesc={props.longdesc} childs={props.children} /></span>
                            </div>
                            { props.children }
                        </div>
                    </div>
                </div>
        </>
    )
}