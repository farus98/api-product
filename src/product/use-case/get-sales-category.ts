export default function makeGetSalesCategory ({ productDb}) {

  return async function getSalesCategory (body) {

    try {
              
        console.log('usecase', body)
        const result =  await productDb.showSalesCategory(body);
        console.log('res',result)
        return result;

    } catch (error) {
      throw new Error(error);
    }

  }

}
