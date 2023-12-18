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

async function postUser() {
    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
    }).then((res) => res.json())
};
//RECUPERATION DU TOKEN


const userToken = {
    user: `${userId}`,
    token: `${token}`
}

function login() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (data.email !== '' && data.password !== '') {
            postUser.then((data) => {
                if (response.ok) {
                    const responseData = await response.json();
                    token = responseData.token;
                }
                // TODO 

                /*                 const valeurUserToken = JSON.stringify(userToken)
                                window.localStorage.setItem("userToken", valeurUserToken)
                
                                console.log(token); */
            })
        } else {
            messageError.textContent = "Erreur dans l'identifiant ou le mot de passe";
        }
    })
}
login();