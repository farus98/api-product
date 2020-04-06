export default function makeGetStatus ({ productDb}) {

  return async function getStatus (body) {

    try {

        console.log('usecase', body)
        const result =  await productDb.showStatus(body);
        console.log('res',result)
        return result;

    } catch (error) {
      throw new Error(error);
    }

  }

}
