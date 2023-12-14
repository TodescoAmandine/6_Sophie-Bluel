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



