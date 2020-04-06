import makeStockcard from '../entity/stockcard'

export default function makeCreateStockcard ({ productDb}) {
  return async function createStockcard (body){
    console.log('usecase',body)
      try {
        const stockcard = makeStockcard(body);
        console.log('res product',stockcard);

        const result = await productDb.insertStockcard(stockcard)
        console.log('result',result)
        return result
      }

      catch (error) {
        console.log('catch')
        throw new Error(error)
      }


  }
}
