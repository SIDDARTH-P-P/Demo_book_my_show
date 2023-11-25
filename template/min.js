function register(){
    location.href = `http://localhost:3000/register.html`
}

function login(){
    location.href = `http://localhost:3000/register_login.html`
}

function print(){
    fetch(`http://localhost:3000/api`)
    .then(res => res.json())
    .then(data => {
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
}
print();