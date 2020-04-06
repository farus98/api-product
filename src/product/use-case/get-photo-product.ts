export default function makeGetPhotoProduct ({ productDb}) {

  return async function getPhotoProduct (body) {

    try {
      if(!body.product_id){
        console.log('usecase', body)
        const result =  await productDb.showPhotoProductAll(body);
        console.log('res',result)
        return result;
      }else{
        console.log('usecase', body)
        const result =  await productDb.showPhotoProductById(body);
        console.log('res',result)
        return result;

    }

    } catch (error) {
      throw new Error(error);
    }

  }

}
