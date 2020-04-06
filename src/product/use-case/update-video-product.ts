export default function  makeUpdateVideoProduct ({ productDb}) {
  return async function updatevideoProduct (body) {
    try {

      if(body.id==null){
        throw new Error('You must supply an id')
      }

      console.log('usecase',body)
      const result =  productDb.updateVideoProduct(body);
      console.log('res',result)
      return result;
    }

    catch (error) {
      throw new Error(error);
    }
  }
}
