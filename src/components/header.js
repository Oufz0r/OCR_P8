export default function Header() {

    window.addEventListener('scroll', function() {
        const navUnderline = document.querySelectorAll("nav span div");
            if(window.scrollY > 850 && window.innerWidth > 1200) {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#2f435e";
                }
            } else {
                for(let i=0; i<navUnderline.length; i++) {
                    navUnderline[i].style.backgroundColor = "#ececec";
                }
            }
        });
    
    return (
            <header className="App-header">
                <h1>
                    <span>dp</span>
                </h1>
                <nav>
                    <span>à propos<div /></span>
                    <span>mes projets<div /></span>
                    <span><a href="http://s693680073.onlinehome.fr/1CV/index.html" target="_blank" rel="noreferrer">curriculum vitæ</a><div /></span>
                </nav>
            </header>
        )
    }