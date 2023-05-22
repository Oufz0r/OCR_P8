export default function Skillbar(props) {
    return (
        <div id={ props.name } className={ `color${props.color}` }>
            <div data-skill={ props.skill }>{ props.name }</div>
        </div>
    )
}