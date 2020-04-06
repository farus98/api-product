export default function makeGetCatalog ({ productDb}) {

  return async function getCatalog (body) {

    try {

        console.log('usecase', body)
        const result =  await productDb.showCatalog(body);
        console.log('res',result)
        return result;

    } catch (error) {
      throw new Error(error);
    }

  }

}
