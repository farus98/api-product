import makeVideoProduct from '../entity/video-product'

export default function makeCreateVideoProduct ({ productDb}) {
  return async function createVideoProduct (body){
    console.log('usecase',body)
      try {
        const videoProduct = makeVideoProduct(body);
        console.log('res product',videoProduct);

        const result = await productDb.insertVideoProduct(videoProduct)
        console.log('result',result)
        return result
      }

      catch (error) {
        console.log('catch')
        throw new Error(error)
      }


  }
}
