import { ApiRequest } from "./request.js";

class Cadastro{

    static createUser(){
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const foto = document.getElementById("foto");
        const password = document.getElementById("password");
        const botaoCadastrar = document.getElementById("btnSignup");

        botaoCadastrar.addEventListener("click", async (event) => {
            event.preventDefault();

            const data = {
                username: name.value,
                email: email.value,
                avatarUrl: foto.value,
                password: password.value
            }

            console.log(data);
          await ApiRequest.register(data) 
        })

    }


}


Cadastro.createUser();