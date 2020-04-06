export default function makeGetSize ({ productDb}) {

  return async function getSize (body) {

    try {

        console.log('usecase', body)
        const result =  await productDb.showSize(body);
        console.log('res',result)
        return result;

    } catch (error) {
      throw new Error(error);
    }

  }

}
