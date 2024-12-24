const ToggleMenu = document.querySelector(".togglemenuI");
const MainActive = document.querySelector(".mainBody");
const X = document.querySelector(".x");
const Bar = document.querySelector(".bar");
const BrandNav = document.querySelector(".brandNav");
const links = document.querySelectorAll("a.navlink");

function openClose() {
    if (MainActive.classList.contains("active")) {
        MainActive.classList.remove("active");
        setTimeout(() => {
            BrandNav.classList.remove("hidden");
        }, 200);
        X.style.display = 'block';
        Bar.style.display = 'none';
        localStorage.setItem("sidebarState", "expanded");
    } else {
        MainActive.classList.add("active");
        setTimeout(() => {
            BrandNav.classList.add("hidden");
        }, 10);
        X.style.display = 'none';
        Bar.style.display = 'block';
        localStorage.setItem("sidebarState", "collapsed");
    }
}

function updateActiveLink() {
    const currentPath = window.location.pathname;
    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("activeA");
        } else {
            link.classList.remove("activeA");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebarState = localStorage.getItem("sidebarState");
    if (sidebarState === "collapsed") {
        MainActive.classList.add("active");
        BrandNav.classList.add("hidden");
        X.style.display = 'none';
        Bar.style.display = 'block';
    } else {
        MainActive.classList.remove("active");
        BrandNav.classList.remove("hidden");
        X.style.display = 'block';
        Bar.style.display = 'none';
    }

    updateActiveLink();
});

links.forEach(link => {
    link.addEventListener("click", (event) => {
        const url = event.currentTarget.getAttribute("href");
        window.history.pushState({}, "", url);
        updateActiveLink();
    });
});

ToggleMenu.addEventListener("click", openClose);