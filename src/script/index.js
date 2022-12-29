import { ApiRequest } from "./request.js";

class executeLoginPage{
    static loginPage(){

        const token = localStorage.getItem("@BlogKenzie:token");

        const emailLogin = document.getElementById("emailInput");
        const senhaLogin = document.getElementById("passwordInput");
        const botaoLogin = document.getElementById("btnLogin");

        botaoLogin.addEventListener("click", async (event)=>{
            event.preventDefault();

            const data = {
                email: emailLogin.value,
                password: senhaLogin.value
            }

            await ApiRequest.login(data)

            if(token !== null){
                window.location.assign("./src/pages/homePage.html")                
            }
            
        })

    }

    static registerUser(){
        const linkRegisterUsers = document.getElementById("handleSignup");

        linkRegisterUsers.addEventListener("click", () => {
            window.location.assign("../src/pages/cadastro.html");
        })
    }
}

executeLoginPage.loginPage();
executeLoginPage.registerUser();