export class ApiRequest{
   
    static baseUrl = "https://blog-m2.herokuapp.com/";
    static token   = localStorage.getItem("@BlogKenzie:token");
    static userId = localStorage.getItem("@BlogKenzie:User_id");
    static headers = {
        "Content-Type": "application/json",
         authorization: `Bearer ${this.token}`};
    

   
    static async login(body){
        const userLogin = await fetch(`${this.baseUrl}users/login`,{
            method:"POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res=> {
           localStorage.setItem("@BlogKenzie:token", res.token)
           localStorage.setItem("@BlogKenzie:User_id", res.userId);
    
            if(res.token == undefined){
                alert (res.message)
                localStorage.clear()
                window.location.assign("./index.html")
            }else{
                window.location.assign("./src/pages/homePage.html");
            }
        })
        .catch(err => err);

        return userLogin;
    }


    static async homePage(){

        const posts = await fetch(`${this.baseUrl}/posts?page=1`,{
            method:"GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .catch(err => err)

        return posts
    }

    static async register(body){
        const registerUsers = await fetch(`${this.baseUrl}users/register`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => { 
            if(res.message == undefined){
                window.location.assign("../../index.html")
            }else{
                alert (res.message)
                location.reload()
            }
            
            return res
        })
        .catch(err => err)

        return registerUsers;

    }

    static async createPost(content){
        const post = await fetch(`${this.baseUrl}posts`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(res => {
            window.location.reload();
        })
        .catch(err => err)
    }

    static async editPost(id,content){
        const editPost = await fetch(`${this.baseUrl}posts/${id}`,{
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(content)
        })
        .then(res=> res.json())
        .then(res => console.log(res))
        .catch(err => err)

    }

    static async seachPost(id){
        const seach = await fetch(`${this.baseUrl}posts/${id}`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => err)

        return seach;
    }

    static async deletPost(id){

        const del = await fetch(`${this.baseUrl}posts/${id}`,{
            method: "DELETE",
            headers: this.headers
        })
        .then(res => res)
        .catch(err => err)

        return del

    }

    static async user(id){

        const user = await fetch(`${this.baseUrl}users/${id}`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => err)

        return user
    }

}