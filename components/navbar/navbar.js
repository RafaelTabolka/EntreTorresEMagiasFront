class AppNavbar extends HTMLElement {
    async connectedCallback () {
        const response = await fetch('/components/navbar/navbar.html');
        const html = await response.text();
        this.innerHTML = html;

        const containerHeader = this.querySelector('.container-header');
        const buttonHamburguer = this.querySelector('.button-hamburguer');

        if (containerHeader !== null && buttonHamburguer !== null) {
            buttonHamburguer.addEventListener('click', () => {
                containerHeader.classList.toggle('container-header--open')
            })
        }

        const currentPath = new URL(window.location.href).pathname; // Pega a url atual
        const ariaCurrent = this.querySelectorAll('.container-header__aria-current');

        ariaCurrent.forEach((a) => {
            const linkPath = new URL(a.href).pathname;
            console.log(currentPath === linkPath)

            if (linkPath === currentPath) {
                a.setAttribute('aria-current', 'page')
            } else {
                a.removeAttribute('aria-current')
            }

        })
        
        const hasLogin = localStorage.getItem('name');
        const toggleLinks = this.querySelectorAll('.container-header__has-login');
        const linkLogin = this.querySelector('.container-header__link-login');
        const logout = this.querySelector('.container-header__logout');
        
        if (hasLogin === null) {
            toggleLinks.forEach((el) => el.remove()); // Remove os elementos do DOM quando não houver login no localStorage
        } else {
            linkLogin.remove();
        }

        logout.addEventListener('click', () => {
            localStorage.removeItem('name');
            location.reload(); // Recarrega a página
            window.location.href = '/pages/home/home.html';
        })
        
    }
}

customElements.define('app-navbar', AppNavbar);