

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







