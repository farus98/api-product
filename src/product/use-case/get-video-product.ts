export default function makeGetVideoProduct ({ productDb}) {

  return async function getVideoProduct (body) {

    try {
      if(!body.id && !body.product_id && !body.thumb){
        console.log('usecase', body)
        const result =  await productDb.showVideoProductAll(body);
        console.log('res',result)
        return result;
      }else{
        console.log('usecase', body)
        const result =  await productDb.showVideoProductByQuery(body);
        console.log('res',result)
        return result;

      }

    } catch (error) {
      throw new Error(error);
    }

  }

}
