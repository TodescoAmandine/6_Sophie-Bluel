

//RECUPERATION DU DOM 
const galleryElem = document.querySelector(".gallery");


//FONCTION main
//RECUPERE LES PROJETS
//FILTRES
//GERER LA MODIFICATION
function main() {
    getProjects().then((projects) => {//on veux qu'en premier la fonction à jourer soit get project pui afficher gallerie
        afficherGallery(projects);
    });
};





//RECUPERATION DES DONNEES DEPUIS SWAGGER
//persistance de données,const reponse va recupérer les infos sur cet Url pour les convertir au format json
async function getProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');//par defaut http est GET
    const projects = await reponse.json();
    return projects;
    /*     console.log(projects);
    */
}

//projects est composé de éléments figures, qui contient une image, qui contient un fig caption
//dans cette fonction on créé l'élément figure que l'on va rattacher au parent  gallerie
//puis on crée les éléments img et fig caption que l'on va rattacher au parent figure
function afficherGallery() {

    //je mets les projects dans un tableau
    /*     const arrayProjects = projects[0];*/

    const arrayProjects = getProjects();

    arrayProjects.forEach((works) => {

        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        /*  figure.classList.add("galleryElem"); */

        /* document.querySelector(gallery).appenChild(figure); */ //ou gallery.appenchild(figure);

        //on créer les éléments img
        const img = document.createElement("img");
        //on indique le chemin pour récupérer les images dans API works
        img.src = works.imageUrl;
        figure.appenChild(img);

        const figCaption = document.createElement("figCaption");
        //on indique le chemin pour récupérer les textes dans API works
        figCaption.textContent = works.title;
        figure.appenChild(figCaption);
    });
}



main();









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
    for (let i = 0; i < projects.length; i++) {
        const arrayProjects = projects[i];
        /*     const arrayProjects = getProjects;
        /*  */
        /*arrayProjects.forEach((works) => {*/
        const figure = document.createElement("figure");
        galleryElem.appendChild(figure);

        const img = document.createElement("img");
        img.src = works[i].imageUrl;
        figure.appenChild(img);

        const figCaption = document.createElement("figCaption");
        figCaption.textContent = works[i].title;
        figure.appenChild(figCaption);
    };
}














//RECUPERATION DU SWAGGER POUR FILTRE
async function getCategorie() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();
    return categories;
}


// 2 pistes pour filtres:


const btnsCategories = document.createElement("button");
btnsCategories = getCategorie;
btnsCategories.classList.add("button");
btnsCategories.appendChild("gallery");

btnsCategories.addEventListener("click", => {
    const categoriesFiltrees = categories.filter(categories){
    return categories.id = 1;
}
});







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







