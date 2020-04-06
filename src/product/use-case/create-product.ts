import makeProduct from '../entity/product'

export default function makeCreateProduct ({ productDb}) {
  return async function createProduct (body){
    console.log('usecase',body)
      try {
        
        const product = makeProduct(body)
        console.log('res product',product);

        const result = await productDb.insertProduct(product)
        console.log('result',result)
        return result
      }

      catch (error) {
        console.log('catch')
        throw new Error(error)
      }


  }
}
