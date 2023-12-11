

//RECUPERATION DU DOM 
const galleryElem = document.querySelector(".gallery");


//FONCTION main
//RECUPERE LES PROJETS
//FILTRES
//GERER LA MODIFICATION
function main() {
    getProjects().then((projects) => {
        afficherGallery(projects);
        createCategories();
        listeCategories();
    });
};





//RECUPERATION DES DONNEES DEPUIS SWAGGER
async function getProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const projects = await reponse.json();
    return projects;
}

function afficherGallery() {
    const arrayProjects = projects[0];
/*     const arrayProjects = getProjects;
 */    arrayProjects.forEach((works) => {
        const figure = document.createElement("figure");
        galleryElem.appendChild(figure);

        const img = document.createElement("img");
        img.src = works[i].imageUrl;
        figure.appenChild(img);

        const figCaption = document.createElement("figCaption");
        figCaption.textContent = works[i].title;
        figure.appenChild(figCaption);
    });
}

//RECUPERATION DU SWAGGER POUR FILTRE
async function getCategorie() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();
    return categories;
}
//INITIALISATONS
let activeStep = 0;
let arrayCategories = categories.length - 1;
/* let categoryId = categories(categorie.id) */

//JE CREE LES BUTTONS
function createCategories() {
    let categoriesButton = document.querySelector('.gallery');
    categoriesButton.forEach((categories, key) => {
        let gallery = document.createElement('button');
        button.classList.add('button');
        button.textContent = categories.name
        gallery.appendChild(button);
    })
}
//JE METS LES ELEMENTS DANS UNE LISTE POUR ENSUITE LES TRIER PAR CATEGORIE: ID ET AJOUTE UN EVENEMENT AU CLIC
function listeCategories() {
    activeStep++;
    for (let i = 0; i < arrayCategories.length; i++) {
        categoriesButton.addEventListener('click', (categories.id))


    }
}







main();







