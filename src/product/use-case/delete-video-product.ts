export default function makeDeleteVideoProduct({ productDb}) {
  return async function deleteVideoProduct (body){
    console.log('usecase',body)
      try {

        const result = await productDb.deleteVideoProduct(body)
        console.log('result',result)
        return result
      }

      catch (error) {
        console.log('catch')
        throw new Error(error)
      }


  }
}
