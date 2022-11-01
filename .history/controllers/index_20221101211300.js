(function getProductByFeature() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getProductByFeature",
    method: "GET",
  });

  promise.then(function (response) {
    console.log(response.data.content);
    renderProductFeature(response.data.content);
    renderCarousel(response.data.content);
  });

  promise.catch(function (error) {
    console.log(error);
  });
})();

// (function getProductById() {
//   let promise = axios({
//     url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=1",
//     method: "GET",
//   });

//   promise.then(function (response) {
//     console.log(response.data.content);
//     renderCarousel(response.data.content);
//   });

//   promise.catch(function (error) {
//     console.log(error);
//   });
// })();

function renderCarousel(arrProduct) {
  let contentHTML = "";
  for (let [key,value] of arrProduct.entries()) {
    if (key != 0 && key < 3) {
        contentHTML += `
            <div class="carousel-item">
            <div class="row justify-content-center align-items-center">
              <div class="col-lg-8">
                <div class="header-banner">
                  <img
                    id="banner-img1"
                    src="${value.image}"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-4">
                <h3 id="banner-name1">${value.name}</h3>
                <p id="banner-description1">${value.description}</p>
                <a href="./detail.html?productid=${value.id}" class="btn-header">Buy now</a>
              </div>
            </div>
          </div>
            `;
    }
  }
  document.querySelector(".carousel-inner").innerHTML = contentHTML;
}

function renderProductFeature(arrProduct) {
  let contentHTML = "";
  for (let value of arrProduct) {
    contentHTML += `
        <div class="col-lg-4 col-md-6 col-xs-6 col-12 mt-lg-3 mt-md-3 mt-4">
        <div class="card">
          <div class="card-header">
            <img src="${value.image}"/> 
            <div class="title">
                <h5 class="name">${value.name}</h5>
                <p class="description">${value.shortDescription}</p>
            </div>
          </div>
          <div class="card-body text-center">
            <a href="./detail.html?productid=${value.id}">Buy Now</a>
            <h5>${value.price}$</h5>
          </div>
        </div>
      </div>
        `;
  }
  document.getElementById("productGrid").innerHTML = contentHTML;
}
