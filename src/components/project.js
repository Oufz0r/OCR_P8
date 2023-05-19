import { useEffect } from "react"

export default function Project(props) {
    
    useEffect(() => {
        // animation
    },[]);

    return (
        <>
                <div className="project">
                    <a href={ props.url } className="project-link" target="_blank" rel="noopener noreferrer">
                        <div>
                            { props.titre }
                        </div>
                    </a>
                    <div style={{backgroundImage:`url(${props.bground})`}} className="bground">
                        {/* <p>{ props.children }</p> */}
                        <div className="inner-desc">
                            <div className="descLinks">
                                <a href={ props.url } target="_blank" rel="noopener noreferrer" className={props.url !== "" ? "" : "hidden"}><img src="images/external-link.png" alt="link icon" className="invert" /></a>
                                <a href={ props.ghlink } target="_blank" rel="noopener noreferrer" className={props.ghlink !== "" ? "" : "hidden"}><img src="images/GitHub_Logo_White.png" className="github-logo" alt="github icon" /></a>
                            </div>
                            { props.children }
                        </div>
                    </div>
                </div>
        </>
    )
}