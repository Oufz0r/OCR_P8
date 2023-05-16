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
                            <center><img src="images/external-link.png" alt="link icon" /></center>
                            { props.children }
                        </div>
                    </div>
                </div>
        </>
    )
}