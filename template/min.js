
function logout(){
   let out =  confirm("are you sure do you want to logout !");
   if(out){
    localStorage.removeItem('token')
    alert("Successfully logout...")
    location.href = `http://localhost:3000`
   }
}


let movies;
function print(){
    fetch(`http://localhost:3000/api`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("cart").innerHTML = null;
        movies = data;
        data.map((item)=>{
            let category = item.category.split(",").join("/");
            let cart = `
            <div class="col-lg-3 pt-5">
            <a href="http://localhost:3000/details.html?${item._id}">
            <div class="card rounded-3" style="width: 18rem;">
                <img src="http://localhost:3000/get_file/${item.images[0].filename}" class="card-img-top img" alt="...">
                <h5 class=" rounded-top bi bi-star-fill text-danger ps-4 p  crd"> <span class="text-light ps-1">${item.rating}</span> <span class="text-light ps-3">${item.vote} Votes</span> </h5>
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${category}</p>
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
          return  document.getElementById("nav_button").innerHTML = `<a href="http://localhost:3000/addmovie.html"><button class="btn btn-warning me-5">Add Movie</button></a>  <button onclick="logout()" class="btn btn-danger me-5">Logout</button>`
        }
        res.json()
        alert("Unauthorized access plese try to login")
    })
}

function search(){
   let value = document.getElementById("search").value
   let filter_datalist = movies.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
   let list = document.querySelector("#list");
   list.innerHTML = "";
   filter_datalist.forEach(item => {
    let option = `<option value="${item.name}">${item.name}</option>`;
    list.innerHTML += option;
   })
   console.log(filter_datalist);
}

function search_item(){
    let value = document.getElementById("search").value
   let  datas = movies.filter((item)=>item.name == value);
    console.log(datas);
    if(datas.length == 0){
        return alert("Movie not Found !...");
    }
    datas.map((item)=>{
        console.log(item._id);
        location.href = `http://localhost:3000/details.html?${item._id}`
    })
}

print();