var product;
(async function getProductDetail() {
    //Lấy tham số từ url
    var urlParams = new URLSearchParams(window.location.search);
    var productid = urlParams.get("productid");
    try {
        //gọi api
        var res = await axios({
            url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productid}`,
            method: "GET",
        });
        product = res.data.content;
        renderProductDetail(product);
    } catch (err) {
        console.log(err);
    }
    //V8 engine (biên dịch js)
})();

function renderProductDetail(product) {
    document.title = product.name;
    document.querySelector('#product_detail_image').src = product.image;
    document.querySelector('#product_detail_name').innerHTML = product.name;
    document.querySelector('#product_detail_description').innerHTML = product.description;
    document.querySelector('#product_detail_price').innerHTML = product.price + '$';
    renderProductSize(product);
    document.querySelector('#product_detail_quantity').data = 1
    document.querySelector('#product_detail_quantity').maxQuantity = product.quantity;
    renderAllProductSameCategory(product.categories);
}
function renderAllProductSameCategory(productCategories) {
    var categories = [];
    for (var i = 0; i < productCategories.length; i++) {
        categories.push(productCategories[i].category);
    }
    var content = ''; var count = 1;
    (async function getProductDetail() {
        try {
            //gọi api
            var res = await axios({
                url: `https://shop.cyberlearn.vn/api/Product`,
                method: "GET",
            });
            var productList = res.data.content;
            for (var i = 0; i < productList.length; i++) {
                var check = false;
                try {
                    //gọi api
                    var res = await axios({
                        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productList[i].id}`,
                        method: "GET",
                    });
                    var sProduct = res.data.content;
                    if(sProduct.id!=product.id){
                    for (var t = 0; t < categories.length; t++) {
                        for (var z = 0; z < sProduct.categories.length; z++) {
                            if (categories[t] === sProduct.categories[z].category) {
                                check = true;
                                break;
                            }
                        }
                        if (check) break;
                    }
                    if (check) {
                        content += `
                    <div class="col-lg-4 col-md-6 col-sm-12 mt-5">
                        <div id="product_relate_container">
                        <div class="text-center"> 
                        <img
                            id="product_relate_image"
                            src="${productList[i].image}"
                            alt="..."
                            style="width:100%"
                            height="300"
                          /> </div>
                          <div class="px-3 infomrtion-product">
                            <h3 id="product_relate_name">${productList[i].name}</h3>
                            <p id="product_relate_shortDescription">${productList[i].shortDescription}</p>
                          </div>
                          <div class="btn_relate d-flex">
                          <a class="w-50" id="buynow" href="./detail.html?productid=${productList[i].id}">Buy now</a>
                            <button class="w-50 text-center" id="product_relate_price">
                            ${productList[i].price}$
                            </button>
                          </div>
                        </div>
                      </div>
            `;
                        if (count == 6) { break; } else { ++count; }
                    }}
                } catch (err) {
                    console.log(err);
                }
            }
            document.querySelector('#product_relate_list').innerHTML = content;
        } catch (err) {
            console.log(err);
        }
    })();
}


function renderProductSize(product) {
    var contentProductDetailSize = '';
    for (var i = 0; i < product.size.length; i++) {
        contentProductDetailSize += `
        <button id="product_size_${product.size[i]}" class="mt-1" onclick="pickSize(${product.size[i]})">${product.size[i]}</button>
        `;
    }
    document.querySelector('#product_detail_size').innerHTML = contentProductDetailSize;
}

function increase_quantity() {
    var quantity = document.querySelector('#product_detail_quantity').data;
    var maxQuantity = document.querySelector('#product_detail_quantity').maxQuantity;
    if (quantity < maxQuantity) {
        quantity++;
        document.querySelector('#product_detail_quantity').data = quantity;
        document.querySelector('#product_detail_quantity').innerHTML = quantity;
    }
}
function decrease_quantity() {
    var quantity = document.querySelector('#product_detail_quantity').data;
    if (quantity > 1) {
        quantity--;
        document.querySelector('#product_detail_quantity').data = quantity;
        document.querySelector('#product_detail_quantity').innerHTML = quantity;
    }
}

function pickSize(size) {
    renderProductSize(product);
    document.querySelector('#product_size_' + size).style.color = 'white';
    document.querySelector('#product_size_' + size).style.background = '#1ED90E';
}