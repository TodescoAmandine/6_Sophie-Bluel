/* import { loginListenerEnvoyer } from "./login.js";
 */

//RECUPERATION DU DOM
const galleryElem = document.querySelector(".gallery");
const portfolioElem = document.querySelector("#portfolio");



//FONCTION main
//RECUPERE LES PROJETS

function main() {
    getProjects().then((projects) => {
        afficherGallery(projects);
    });

    getCategories().then((categories) => {
        afficherCategories(categories)
    });
    loginForm()
}


//RECUPERATION DES DONNEES DEPUIS SWAGGER
async function getProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const projects = await reponse.json();
    return projects;
}

function afficherGallery(projects, filter) {
    if (filter !== undefined && filter !== 'Tous') {
        projects = projects.filter((project) => project.category.name === filter)
    }

    galleryElem.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const figure = document.createElement("figure");
        galleryElem.appendChild(figure);

        const img = document.createElement("img");
        img.src = projects[i].imageUrl;
        figure.appendChild(img);

        const figCaption = document.createElement("figCaption");
        figCaption.textContent = projects[i].title;
        figure.appendChild(figCaption);
    }
}


//FILTRES//RECUPERATION DU SWAGGER POUR FILTRE

async function getCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();
    return categories;
}

function afficherCategories(categories) {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter_container');
    portfolioElem.insertBefore(filterContainer, galleryElem);

    const allElement = {
        'id': 0,
        'name': 'Tous'
    }

    // Unshift = ajouter l'élément au début du tableau/objet
    categories.unshift(allElement)

    categories.forEach((category, key) => {
        let filter = document.createElement('button');
        filter.classList.add('button');

        if (key === 0) {
            filter.classList.add('active');
        }
        filter.innerHTML = category.name

        filter.addEventListener('click', () => {
            /*     if (key !== 0) { */

            filter.classList.remove('active');
            filterGallery(category.name);
            /*       } */
        });
        filterContainer.appendChild(filter);
    })
}

function filterGallery(filter) {
    getProjects().then((projects) => {
        afficherGallery(projects, filter);
    });
}

main();







