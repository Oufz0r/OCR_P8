import { useEffect } from "react";

export default function Separateur() {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            let sepaLogo = document.querySelectorAll(".separateur span");
            let valueOpa = (window.scrollY)/3;
            for(let n=0; n < sepaLogo.length; n++) {
                sepaLogo[n].style.transform = `rotate(${valueOpa}deg)`;
            }
        })
    },[]);


    return (
        <div className="separateur">
            <span>dp</span>
        </div>
    )
}