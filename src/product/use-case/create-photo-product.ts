import makePhotoProduct from '../entity/photo-product'

export default function makeCreatePhotoProduct ({ productDb}) {
  return async function createPhotoProduct (body){
    console.log('usecase',body)
      try {

        const photoProduct = makePhotoProduct(body)
        console.log('res product',photoProduct);

        const result = await productDb.insertPhotoProduct(photoProduct)
        console.log('result',result)
        return result
      }

      catch (error) {
        console.log('catch')
        throw new Error(error)
      }


  }
}
