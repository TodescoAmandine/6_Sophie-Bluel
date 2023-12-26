/* import { loginListenerEnvoyer } from "./login.js";
 */


//RECUPERATION DU DOM
const galleryElem = document.querySelector(".gallery");
const portfolioElem = document.querySelector("#portfolio");


//MODALE//
//RECUPERATION DU DOM --- MODALE
//DOM--BANNER
const editorMode = document.getElementById("editor");
/* const editorBanner = document.getElementByI("editor__banner");
 */
let bannerVisible = document.querySelector(".editor__banner");


const editorWindow = document.getElementById("editor__modal--window");
const editorBtnModal = document.getElementById("editor__modal--btn--modif");

//DOM--avant modale
const editModif = document.getElementById("editor__formodif");
const btnModifier = document.querySelector('.editor--btn--modifier');
const inconeModifier = document.querySelector(".editor_icone--modifier ")

//DOM--modale
const modale = document.querySelector(".editor__modal");
const windowModal = document.querySelector(".editor__modal--window");
const titleModal = document.querySelector(".editor__modal--title");

const modalebtn = document.querySelector(".editor__modal--btn--modif");
const btnAjout = document.getElementById("btn_ajout");





//FONCTION main
//RECUPERE LES PROJETS

function main() {
    getProjects().then((projects) => {
        gestionGallery(projects);
    });
    getProjects().then((projects) => {
        afficherGallery(projects);
    });

    getCategories().then((categories) => {
        afficherCategories(categories);
    });

    if (window.localStorage.getItem('userToken') !== null) {
        enableAdmin();
    }
}


function enableAdmin() {
    // changer le lien de login en logout
    document.querySelector('#loginLink').innerHTML = "logout";
    /* Afficher le bandeau noir*/
    bannerVisible.classList.remove("editor__banner");
    bannerVisible.classList.add("editor__banner--visible");
    // Afficher le bouton modifier + icone
    btnModifier.classList.remove("editor--btn--modifier");
    btnModifier.classList.add("editor--btn--modifier--visible");
    inconeModifier.classList.remove("editor_icone--modifier");
    inconeModifier.classList.add("editor_icone--modifier--visible");
    /*     const filterButtons = document.querySelector("filter_container");
        console.log(filterButtons); */

}

/*************MODAL**************/
let modal = null;
const focusableSelector = 'button, a,input, textearea';
let focusables = [];
let previouslyFocusedElement = null;


const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    document.querySelector(':focus');
    focusables[0].focus();
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

}

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    window.setTimeout(function () {
        /*       modal.style.display = "none"; */
        modal = null;
    }, 500);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal", "true");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);

    modal = null;
}

///FONCTION pour garder l'evenement au clic : close uniquement sur le bouton et en dehors de la fenêtre
const stopPropagation = function (e) {
    e.stopPropagation();
}
//FONCTION pour mettre le focus sur le premier élément de la modal et aussi pour ne pas perdre les autres liens focusables quand on revient sur la page accueil
const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftkey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);

});
//CONTROLE AU CLAVIER > touche Escape et Tab
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc");
    closeModal(e);
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
});

//AJOUT DE GALERIE PHOTO DANS MODAL

const modalGallery = document.querySelector(".modal_gallery");

function gestionGallery(projects) {
    modalGallery.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const figure = document.createElement("figure");
        modalGallery.appendChild(figure);

        const img = document.createElement("img");
        img.src = projects[i].imageUrl;
        figure.appendChild(img);

        /*         const greyLine = document.createElement("span");
                greyLine.classList.add("greyspan");
                figure.appendChild(".span");
                console.log(greyLine); */

        /*     const figCaption = document.createElement("figCaption");
            figCaption.textContent = projects[i].title;
            figure.appendChild(figCaption); */
        const trashIcone = document.createElement("i");
        trashIcone.classList.add("fa-solid", "fa-trash-can");
        figure.appendChild(trashIcone);
    }
}










///autre version

// Activer les écouteurs sur le bouton et la modal
/*     btnModifier.addEventListener("click", showModal);
    function showModal() {
        modale.classList.remove("editor__modal");
        modale.classList.add("editor__modal--visible");
        windowModal.classList.remove("editor__modal--window");
        windowModal.classList.add("editor__modal--window--visible");
        titleModal.classList.remove("editor__modal--title");
        titleModal.classList.add("editor__modal--title--visible");
        modalebtn.classList.remove("editor__modal--btn--modif");
        modalebtn.classList.add("editor__modal--btn--modif--visible");
    }; */





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


    //VARIABLE POUR ELEMENT BOUTON TOUS
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

            // Supprime la classe active de tous les boutons
            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.classList.remove('active');
            });

            // Ajoute la classe active au bouton actuellement cliqué
            filter.classList.add('active');


            filterGallery(category.name);

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






