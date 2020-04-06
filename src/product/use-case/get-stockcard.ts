export default function makeGetStockcard ({ productDb}) {

  return async function getStockcard (body) {

    try {
      if(body.id || body.product_name){
        console.log('usecase', body)
        const result =  await productDb.showStockcardList(body);
        console.log('res',result)
        return result;
      }else{
        console.log('usecase', body)
        const result =  await productDb.showStockcardAll(body);
        console.log('res',result)
        return result;

      }

    } catch (error) {
      throw new Error(error);
    }

  }

}
