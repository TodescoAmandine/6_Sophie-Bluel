//RECUPERATION DU DOM
const galleryElem = document.querySelector(".gallery");
const portfolioElem = document.querySelector("#portfolio");


//DOM- - BANNER
let bannerVisible = document.querySelector(".editor__banner");
let token = '';

//DOM--avant modale
const btnModifier = document.querySelector('.editor--btn--modifier');
const inconeModifier = document.querySelector(".editor_icone--modifier ")

//DOM--MODAL ajout
const btnAjout = document.getElementById("btn_ajout");
const modalAjout = document.getElementById("modal--ajout");
const modalOrigin = document.getElementById("modal--origin");
/* console.log("click", btnAjout);
 */
/*-----------------
    FONCTION main
------------------*/

function main() {
    if (window.localStorage.getItem('userToken') !== null) {
        token = JSON.parse(window.localStorage.getItem('userToken')).token
        enableAdmin();
        document.querySelector(".js-modal").addEventListener("click", openModal);

    }

    getProjects().then((projects) => {
        afficherGallery(projects);
    });

    if (!token) {
        getCategories().then((categories) => {
            afficherCategories(categories);
        });
    }
}
/* document.querySelector(".js-modal").addEventListener("click", openModal);
 */
/* document.addEventListener("DOMContentLoaded", main);
 */
/*-----------------
    MODE ADMIN
------------------*/
function enableAdmin() {
    // changer le lien de login en logout
    document.querySelector('#loginLink').innerHTML = "logout";
    /* Afficher le bandeau noir*/
    bannerVisible.classList.add("editor__banner--visible");
    // Afficher le bouton modifier + icone
    btnModifier.classList.add("editor--btn--modifier--visible");
    inconeModifier.classList.remove("editor_icone--modifier");
    inconeModifier.classList.add("editor_icone--modifier--visible");

/*     const filterButtons = document.querySelector(".filter_container");
 */}
/* --------------
      MODAL
----------------*/
let modal = '';


const openModal = function (e) {
    e.preventDefault();

    //----------Afficher modal----------//
    modal = document.querySelector(e.target.getAttribute("href"));
    /*     console.log("href", e.target.getAttribute("href"));*/
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelectorAll(".js-modal-stop").forEach(e => { e.addEventListener("click", stopPropagation); });



    //----------AFFICHAGE DE LA GALERIE DANS LA MODALE----------//
    getProjects().then((projects) => {
        afficherGallery(projects, null, true);

    });
    //MODAL AJOUT CACHé//
    modalAjout.style.display = "none";
    modalAjout.setAttribute("aria-hidden", "true");
    modalAjout.removeAttribute("aria-modal", "true");

    //MODALE ORIGIN  SUPP AU CLIC//
    btnAjout.addEventListener("click", () => {
        modalOrigin.style.display = "none";
        modalOrigin.setAttribute("aria-hidden", "true");
        modalOrigin.removeAttribute("aria-modal", "true");
        // MODAL AJOUT AFFICHé//
        modalAjout.style.display = null;
        modalAjout.removeAttribute("aria-hidden");
        modalAjout.setAttribute("aria-modal", "true");
        modalAjout.querySelector(".js-modal-close").addEventListener("click", closeModal);



        //FLECHE RETOUR//
        const arrowBack = document.querySelector(".js-arrow");
        arrowBack.addEventListener("click", () => {
            modalAjout.style.display = "none";
            modalAjout.setAttribute("aria-hidden", "true");
            modalAjout.removeAttribute("aria-modal", "true");
            modalOrigin.style.display = null;
            modalOrigin.removeAttribute("aria-hidden", "true");
            modalOrigin.setAttribute("aria-modal", "true");
        })

        addProjectInit();
    });
}

/* const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.remove();
} */

//--------FERMER MODAL----------//
const closeModal = function (e) {
    e.preventDefault();
/*     modal = null;
 */    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal", "true");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
}
console.log(modal);



///FONCTION pour garder l'evenement au clic : close uniquement sur le bouton et en dehors de la fenêtre//
const stopPropagation = function (e) {
    e.stopPropagation();
}

/*
* ------------
*    PROJETS
* ------------
 */

//---------- Récupération des projets depuis l'API----------//
async function getProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    return await reponse.json();
}

//---------- Affichage des projets dans une galerie modal ou accueil----------//
function afficherGallery(projects, filter = null, edit = false) {
    let destination
    if (edit === true) {
        console.log('affichage de la galerie dans la modale')
        destination = document.querySelector(".modal_gallery");
    } else {
        console.log('affichage de la galerie dans la page d\'accueil')
        destination = galleryElem
    }

    if (filter !== null && filter !== 'Tous') {
        projects = projects.filter((project) => project.category.name === filter)
    }

    destination.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const figure = document.createElement("figure");
        destination.appendChild(figure);

        const img = document.createElement("img");
        img.src = projects[i].imageUrl;
        figure.appendChild(img);
        if (edit === true) {
            //---------trash icon----------//
            const trashIcone = document.createElement("i");
            trashIcone.classList.add("fa-solid", "fa-trash-can");
            trashIcone.addEventListener('click', () => {
                deleteProject(projects[i].id).then((response) => {
                    if (response.ok) {
                        figure.remove();
                        getProjects().then((projects) => {
                            afficherGallery(projects);
                            const messageConfirmSupp = document.createElement("p");
                            messageConfirmSupp.textContent = "Projet supprimé";
                        });
                    } else {
                        console.log(response);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            });

            figure.appendChild(trashIcone);
/*             figure.appendChild(messageConfirmSupp);
 */        } else {
            const figCaption = document.createElement("figCaption");
            figCaption.textContent = projects[i].title;
            figure.appendChild(figCaption);
        }
    }
}

/*
* ------------
*    FILTRES
* ------------
 */

//----------RECUPERATION DES FILTRES CATEGORIES DANS API----------//
async function getCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    return await reponse.json();
}


//----------AFFICHER LES FILTRES/CATEGORIES DANS LE DOM--------//
function afficherCategories(categories) {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter_container');
    portfolioElem.insertBefore(filterContainer, galleryElem);


    //--------VARIABLE POUR ELEMENT BOUTON TOUS----------//
    const allElement = {
        'id': 0,
        'name': 'Tous'
    }

    // Unshift = ajouter l'élément au début du tableau/objet//
    categories.unshift(allElement)

    categories.forEach((category, key) => {
        let filter = document.createElement('button');
        filter.classList.add('button');

        if (key === 0) {
            filter.classList.add('active');
        }
        filter.innerHTML = category.name

        filter.addEventListener('click', () => {

            // Supprime la classe active de tous les boutons//
            const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.classList.remove('active');
            });

            // Ajoute la classe active au bouton actuellement cliqué//
            filter.classList.add('active');

            filterGallery(category.name);

        });
        filterContainer.appendChild(filter);
    })
}

//-------- Filrer la galerie en fonction du type cliqué 'Tous', 'OBJETS' ETC--------//
function filterGallery(filter) {
    getProjects().then((projects) => {
        afficherGallery(projects, filter);
    });
}

main();


/*-----------------------
     DELETE PROJECT
-------------------------*/
async function deleteProject(projectId) {
    return await fetch('http://localhost:5678/api/works/' + projectId, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: projectId,
        })

    });

}

/*-----------------------
     AJOUT PROJECT
-------------------------*/


function addProjectInit() {

    //--------récupération du DOM--------//
    const btnAjout1 = document.getElementById("btn--ajouterphoto1");
    const btnAjout2 = document.getElementById("btn--ajouterphoto2");
    const btnajoutInput = document.getElementById("file");
    const preview = document.getElementById("preview");
    const pAjout = document.getElementById("p-ajout");
    const titreAjout = document.getElementById("titre");
    const categorieAjout = document.getElementById("categorie");
    const btnValider = document.getElementById("btn_valider");
    const messageError2 = document.getElementById("error2");

    btnAjout2.addEventListener("click", () => {
        btnajoutInput.click();

    });

    btnAjout1.addEventListener("click", () => {
        btnajoutInput.click();
    });

    //--------BOUTON AJOUTER UNE PHOTO AVEC PREVIEW--------//
    btnajoutInput.addEventListener("change", () => {
        const reader = new FileReader();
        reader.readAsDataURL(btnajoutInput.files[0]);
        reader.onload = () => {
            preview.src = reader.result;
            pAjout.style.display = "none";
            btnAjout2.style.display = "none";
        };

    });

    //----------BOUTON VALIDER-----------//
    /*     console.log(btnValider) */
    btnValider.addEventListener("click", (e) => {
        e.preventDefault();
        messageError2.textContent = '';
        ajoutProject(categorieAjout, titreAjout, btnajoutInput).then((response) => {
            if (response.ok) {
                getProjects().then((projects) => {
                    afficherGallery(projects);
                });
                closeModal()

            }
        }).catch((error) => {
            console.log(error);
            messageError2.textContent = "Merci de renseigner tous les champs";

        });
    });
}


async function ajoutProject(categorieAjout, titreAjout, file) {
    console.log(categorieAjout.value, titreAjout.value)
    console.log(file.files[0])



    console.log(!categorieAjout.value, !titreAjout.value, file.files[0] === undefined)
    if (!categorieAjout.value || !titreAjout.value || file.files[0] === undefined) {
        console.log('erreur');


        return;
    }

    const formData = new FormData();
    formData.append('image', file.files[0]);
    formData.append('title', `${titreAjout.value}`)
    formData.append('category', parseInt(categorieAjout.value))


    return await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    });
}


