export default class Router {
    routes = {};
    backgroundImages = {};

    add(routeName, page, backgroundImage) {
        this.routes[routeName] = page;

        if (backgroundImage) {
            this.backgroundImages[routeName] = backgroundImage;
        }
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();

        window.history.pushState({}, "", event.target.href);
        
        this.handle();
    }

    handle() {
        const { pathname } = window.location;
        const route = this.routes[pathname] || this.routes[404];
        const backgroundImage = this.backgroundImages[pathname];

        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
        }

        this.updateActiveLink(pathname);

        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
        });
    }

    updateActiveLink(pathname) {
        document.querySelectorAll('nav a').forEach(link => {
            if (link.getAttribute('href') === pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}