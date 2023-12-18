exemple
function userToken() {
    let token = localStorage.getItem(“token”);
    if (token === null) {
        console.log(“Aucun token trouvé dans le localStorage”);
    } else {
        console.log(“Token présent :“, token);
    }
}


//test 1 OC


async function getUsers() {
    const response = await fetch("http://localhost:5678/api/users/login");
    return await response.json();
}

const formEmail = document.getElementById("email");
const formPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");
const errorPassword = document.querySelector(".passforgot")


export function loginForm() {
    const loginForm = document.querySelector(".form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userEmail = formEmail.value;
        const userPassword = formPassword.value;

        {
            /*      const emailForm = 
                   email: event.target.querySelector("[name=email]").value,
                        password: event.target.querySelector("[name=password]").value,*/
        };
        //création dela charge utile au format JSON
        const chargeUtile = JSON.stringify(loginForm);
        //Appel de la fonction fetch avec toutes les informations necessaires
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        });
    });

}



///deuxiemen test from scratch


const inputs = document.querySelectorAll('input[type="text"], input[type="password"]'
);
//RECUPERATION TOKEN
function getToken() {
    const reponse = await fetch('http://localhost:5678/api/users/login');
    const tokenApi = await reponse.json();
    return tokenApi;
}


const emailChecker = (value) => {
    const emailUser = document.getElementById("email");
    const errorDisplay = document.querySelector(".password > span");

    if (!valid) {
        span.textContent = "Erreur dans l’identifiant ou le mot de passe";
    } else {
        errorDisplay.textContent = "";
        formEmail.classList.remove("#error");
    }
}
const passwordChecker = (value) => {
    const passwordUser = document.getElementById("password");
    const errorDisplay = document.getElementById("#error")

    if (value !== tokenApi) {
        errorDisplay.textContent = "Erreur dans l’identifiant ou le mot de passe";
    } else {
        errorDisplay.textContent = "";
        formEmail.classList.remove("#error");
    }

}


inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            default:
                null;
        }
    })
})



///test from Keira

//RECUPERATION DU DOM 
const formEmail = document.getElementById("email");
const formPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");
const form = document.getElementById("form");
const messageError = document.getElementById("error");

//ENVOI DES DONNEES A API 
const chargeUtile = JSON.stringify(form.value);

function postUser("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile
});




async function loginForm() {
    const users = await postUser();
    console.log(users);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPassword = password.value;
        console.log(userEmail, userPassword);
        users.forEach((user) => {
            //verifications
            if (
                user.email == userEmail &&
                user.password == userPassword &&
            ) {
                //si les conditions sont remplies, on fait :
                window.sessionStorage.loged = true;
                //redirection sur page d'accueil
                window.location.href = "../FrontEnd/JS/index.html"
            } else {
                //message d'erreur
                messageError.textContent = "Erreur dans l’identifiant ou le mot de passe";
            }
        });

    });
}
loginForm();





///envoyé a romain
//RECUPERATION DU DOM 
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");
const form = document.getElementById("form");
const messageError = document.getElementById("error");


//ENVOI DES DONNEES A API 
const data = {
    email: userEmail.value,
    password: userPassword.value
}

const chargeUtile = JSON.stringify(data);

function postUser("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
});

async function login() {
    const users = await postUser();
    form.addEventListener("submit", (e) =>
        e.preventDefault();
    users.forEach(data => {
        if{
            data.email != valid &&
                data.password != valid;
            messageError.textContent = "Erreur dans l’identifiant ou le mot de passe";
            console.log(#error)
        }else {
            //redirection sur page d'accueil
            window.location.href = "../FrontEnd/JS/index.html"
        }
    });
    )
}
login();
























///autre piste
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
    // obtenir le corps de réponse (la méthode expliquée ci-dessous)
    let json = await response.json();
} else {
    alert("HTTP-Error: " + response.status);
}

response.text() – lit la réponse et retourne sous forme de texte,



/* fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    /*     body: JSON.stringify({
            email: '',
            password: '', */
/*});*/


/* fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    /*     body: chargeUtile
/*});

const chargeUtile = JSON.stringify(login);


*/