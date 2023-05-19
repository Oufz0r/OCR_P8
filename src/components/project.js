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
                            <center>
                                <a href={ props.url } target="_blank" rel="noopener noreferrer"><img src="images/external-link.png" alt="link icon" className={props.url !== "" ? "invert" : "hidden invert"} /></a>
                                <a href={ props.ghlink } target="_blank" rel="noopener noreferrer"><img src="images/GitHub_Logo_White.png" className={props.ghlink !== "" ? "github-logo" : "hidden github-logo"} alt="github icon" /></a>
                            </center>
                            { props.children }
                        </div>
                    </div>
                </div>
        </>
    )
}