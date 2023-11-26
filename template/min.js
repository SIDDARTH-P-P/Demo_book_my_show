function register(){
    location.href = `http://localhost:3000/addmovie.html`
}

function login(){
    location.href = `http://localhost:3000/register_login.html`
}

function logout(){
   let out =  confirm("are you sure do you want to logout !");
   if(out){
    localStorage.removeItem('token')
    alert("Successfully logout...")
    location.href = `http://localhost:3000`
   }
}


function print(){
    fetch(`http://localhost:3000/api`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("cart").innerHTML = null;
        data.map((item)=>{
            let cart = `
            <div class="col-lg-3 pt-5">
            <a href="http://localhost:3000/details.html?${item._id}">
            <div class="card" style="width: 18rem;">
                <img src="http://localhost:3000/get_file/${item.images[0].filename}" class="card-img-top img" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.category}</p>
                </div>
              </div>
              </a>
        </div>
            `
            document.getElementById("cart").innerHTML += cart
        })
    })

    let token = localStorage.getItem("token");
    fetch(`http://localhost:3000/auth`,{
        method:"get",
        headers:{authorization:`Bearer ${token}`}
    })
    .then(res =>{
        if(res.status == 200){
          return  document.getElementById("nav_button").innerHTML = ` <button class="btn btn-warning me-5" onclick="register()">Add Movie</button>  <button onclick="logout()" class="btn btn-danger me-5">Logout</button>`
        }
        res.json()
        alert("Unauthorized access plese try to login")
    })

}
print();