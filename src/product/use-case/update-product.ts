export default function  makeUpdateProduct ({ productDb}) {
  return async function updateProduct (body) {
    try {
      if(body.id==null){
        throw new Error('You must supply an product_id')
      }

      if(body.memberPrice < 10000){
        throw new Error('Member Price must be longer then 10000')
      }

      if(body.consumerPrice < 10000){
        throw new Error('Consumer Price must be longer then 10000')
      }

      console.log('usecase',body)
      const result =  productDb.updateProduct(body);
      console.log('res',result)
      return result;
    }

    catch (error) {
      throw new Error(error);
    }
  }
}
