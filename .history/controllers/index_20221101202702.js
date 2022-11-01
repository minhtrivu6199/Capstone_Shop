(function getProductByFeature() {
    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Product/getProductByFeature",
        method: "GET",
    });

    promise.then(function (response) {
        console.log(response.data.content);
    })
})