//RECUPERATION DU DOM
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");
const form = document.getElementById("form");
const messageError = document.getElementById("error");

//ENVOI DES DONNEES A API

async function postUser(user) {
    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
    }).then((res) => res.json())
};
//RECUPERATION DU TOKEN


function login() {
    checkIfUserIsLog()
    form.addEventListener("submit", (e) => {
        messageError.textContent = '';
        e.preventDefault();
        const data = {
            email: userEmail.value,
            password: userPassword.value
        }

        if (data.email !== '' && data.password !== '') {
            const chargeUtile = JSON.stringify(data);
            postUser(chargeUtile).then((response) => {
                if (response.token) {
                    const valeurUserToken = JSON.stringify(response)
                    window.localStorage.setItem("userToken", valeurUserToken)
                    location.href = "index.html"
                } else {
                    messageError.textContent = "Utilisateur inconnu";
                }
            })
        } else if (data.email === '' && data.password !== '') {
            messageError.textContent = "Merci de renseigner un email";
        } else if (data.email !== '' && data.password === '') {
            messageError.textContent = "Merci de renseigner un mot de pase";
        } else {
            messageError.textContent = "Données invalides";
        }
    })
}

function checkIfUserIsLog() {
    if (window.localStorage.getItem('userToken') !== null) {
        window.localStorage.removeItem('userToken');
        messageError.textContent = 'Vous avez été déconnecté';
    }
}
login();