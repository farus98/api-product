export default function buildMakeStockcard(){
  return function makeStockcard({
    id = 0,
    productId = 0,
    stockistId = 0,
    description  = '',
    qty = 0,
    actionById = 0,
    type = '',
    createdTime = Date.now(),
    updateTime = Date.now()
  } = {}) {

    if (!id){
      throw new Error('Id must be exist')
    }

    if (!productId){
      throw new Error('Product Id must be exist')
    }

    if (!stockistId){
      throw new Error('Stockist Id must be exist')
    }

    if (!description){
      throw new Error('Description must be exist')
    }

    if (!qty){
      throw new Error('Qty must be exist')
    }

    if (!actionById){
      throw new Error('Action By Id must be exist')
    }

    if (!type){
      throw new Error('Type must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    return Object.freeze({
      getId : () => id,
      getStockistId : () => stockistId,
      getProductId : () => productId,
      getQty : () => qty,
      getDescription : () => description,
      getType : () => type
    })
  }
}
