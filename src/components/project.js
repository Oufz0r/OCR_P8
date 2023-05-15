export default function Project(props) {
    return (
        <>
                <div className="project">
                    <div>
                        <a href={ props.url }>
                            { props.titre }
                        </a>
                    </div>
                    <div style={{backgroundImage:`url(${props.bground})`}}>
                        <p>{ props.children }</p>
                    </div>
                </div>
        </>
    )
}