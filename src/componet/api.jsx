

export async function api() {

                   const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
                   const data = await product.json();
                   const slicedData = data.slice(60, 72);
                   console.log(data);
              
        return slicedData  
}