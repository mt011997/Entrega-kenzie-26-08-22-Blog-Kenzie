import {
    ApiRequest
} from "./request.js"

const ul = document.querySelector(".posts")


class HomePage {

    static async renderPost() {

        let api = await ApiRequest.homePage()
        ul.innerHTML = ""
        api.data.forEach(elem => {

            const tagLi = document.createElement("li")
            const tagDivPostImagem = this.createTagDiv()
            const tagImgAvatar = this.createImgAvatar(elem.user.avatarUrl)
            const tagDivPostTexto = this.createTagDiv()
            const tagUserH2 = this.createTextH2(elem.user.username)
            const tagPostagemP = this.createPostagem(elem.content)
            const tagDivPostRodape = this.createTagDiv()
            const tagSpanData = this.createSpanData(elem.createdAt)
            const tagDivRodapeImg = this.createTagDiv()
            const tagImgRodapeEdit = document.createElement("img")
            const tagImgRodapeTrash = document.createElement("img")

            tagImgRodapeEdit.src = "/src/img/lapis.png"
            tagImgRodapeEdit.alt = "Imagem para editar"
            tagImgRodapeEdit.id = elem.id
            tagImgRodapeTrash.src = "/src/img/lixeira.png"
            tagImgRodapeTrash.alt = "Imagem para apagar"
            tagImgRodapeTrash.id = elem.id


            tagDivPostImagem.classList.add("posts__imagem")
            tagDivPostTexto.classList.add("posts__texto")
            tagDivPostRodape.classList.add("posts__rodape")
            tagDivRodapeImg.classList.add("rodape__imagens")
            tagImgRodapeEdit.classList.add("icon")
            tagImgRodapeTrash.classList.add("icon2")

            ul.append(tagLi)
            tagLi.append(tagDivPostImagem, tagDivPostTexto, tagDivPostRodape)
            tagDivPostImagem.append(tagImgAvatar)
            tagDivPostTexto.append(tagUserH2, tagPostagemP)
            tagDivPostRodape.append(tagSpanData, tagDivRodapeImg)

            tagDivRodapeImg.append(tagImgRodapeEdit, tagImgRodapeTrash)

        });

    }

    static createTagDiv() {

        const div = document.createElement("div")
        return div
    }

    static createImgAvatar(link) {

        const img = document.createElement("img")
        img.src = link
        img.alt = "Imagem de perfil do usuário"
        img.classList.add("avatar")

        return img
    }

    static createTextH2(username) {

        const h2 = document.createElement("h2")
        h2.innerText = username

        return h2
    }

    static createPostagem(content) {

        const p = document.createElement("p")
        p.innerText = content

        return p
    }

    static createSpanData(data) {

        const span = document.createElement("span")
        span.innerText = data

        return span
    }

    static logout() {

        const btnLogout = document.querySelector(".logout")
        btnLogout.addEventListener("click", () => {

            localStorage.clear()
            window.location.assign('../../../index.html')

        })

    }

    static async creatNewPost() {
        const textArea = document.getElementById("msg");
        const postar = document.querySelector(".postar");


        postar.addEventListener("click", (event) => {
            event.preventDefault();
            ul.innerHTML = ""

            const content = {
                content: `${textArea.value}`
            }

            ApiRequest.createPost(content);

            textArea.value = '';
            this.renderPost()
            this.editYourPosts()

        })
    }


    static async editYourPosts() {

        await HomePage.renderPost();
        await HomePage.creatNewPost();

        const editButton = document.querySelectorAll(".posts li .icon");
        const sectionModalEdit = document.querySelector(".modal__Edit");
        const textArea = document.getElementById("msgEdit");

        editButton.forEach((botao) => {
            botao.addEventListener("click", async () => {

                if (botao.alt == "Imagem para editar") {
                    sectionModalEdit.classList.toggle("hidden");

                    const post = await ApiRequest.seachPost(botao.id);

                    textArea.value = post.content;


                    const modalEdit = document.querySelector(".modal__Edit");
                    const enviarButton = document.querySelector(".btnEnviar");
                    enviarButton.addEventListener("click", () => {

                        const content = {
                            content: `${textArea.value}`
                        }
                        console.log(content)

                        ApiRequest.editPost(botao.id, content);

                    })
                }
            })
        })
    }

    static async buttonDelete() {

        await HomePage.renderPost()
        await HomePage.editYourPosts()

        const btntrash = document.querySelectorAll(".icon2")
        const sectionModalDelete = document.querySelector(".modal__delete")

        btntrash.forEach((botao) => {
            botao.addEventListener("click", async (event) => {

                if (botao.alt == "Imagem para apagar") {

                    sectionModalDelete.classList.toggle("hidden")

                    const id = botao.id
                    const btnDeletar = document.querySelector(".modal__button__delete")

                    btnDeletar.addEventListener("click", async (event) => {

                        await ApiRequest.deletPost(id)
                        await this.renderPost()
                        sectionModalDelete.classList.toggle("hidden")
                    })
                }
            })
        })
    }

    static async renderUsuario() {

        let id = localStorage.getItem("@BlogKenzie:User_id")
        let api = await ApiRequest.user(id)

        const div = document.querySelector(".dataUser")
        const img = document.createElement("img")
        const h1 = document.createElement("h2")

        img.src = api.avatarUrl
        img.alt = "Avatar Usuário"
        h1.innerText = api.username

        div.append(img, h1)


    }

}

HomePage.renderPost()
HomePage.logout()
HomePage.creatNewPost();
HomePage.editYourPosts();
HomePage.buttonDelete()
HomePage.renderUsuario()