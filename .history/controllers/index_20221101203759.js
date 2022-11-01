(function getProductByFeature() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getProductByFeature",
    method: "GET",
  });

  promise.then(function (response) {
    console.log(response.data.content);
  });

  promise.catch(function (error) {
    console.log(error);
  });
})();

function renderProductFeature(arrProduct) {
  let contentHTML = "";
  for (let value of arrProduct) {
    contentHTML += `
        <div class="col-lg-4 col-md-6 col-xs-6 col-12">
        <div class="card">
          <div class="card-header">
            <img src="${value.image}"/> alt="" />
            <div class="title">
                <h5 class="name">${value.name}</h5>
                <p class="description">cacac</p>
            </div>
          </div>
          <div class="card-body text-center">
            <button>Buy Now</button>
            <h5>${value.price}$</h5>
          </div>
        </div>
      </div>
        `;
  }
}
