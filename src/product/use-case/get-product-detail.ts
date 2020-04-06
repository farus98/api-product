export default function makeGetProductDetail ({ productDb}) {

  return async function getProductDetail (body) {

    try {
    
        console.log('usecas', body)

        const result =  await productDb.showProductById(body);
        console.log('res',result)

        return result;

    } catch (error) {
      throw new Error(error);
    }

  }

}
