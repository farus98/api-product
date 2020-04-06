export default function buildMakeProduct(){
  return function makeProduct({
    productId = 0,
    name = '',
    salesCategory = '',
    qty = 10,
    size = '',
    weight = 100,
    memberPrice = 0,
    consumerPrice = 0,
    uses = '',
    howToUse = '',
    description = '',
    crossProductId = 0,
    status = '',
    rating = 0,
    sequence = 0,
    commisionRef = 0,
    photos = '',
    createdTime = Date.now(),
    updateTime = Date.now()
  } = {}) {

    if (!name){
      throw new Error('productName must be exist')
    }

    if (!size){
      throw new Error('Size must be exist')
    }

    if (!weight){
      throw new Error('Weight must be exist')
    }

    if (!memberPrice){
      throw new Error('Member Price must be exist')
    }

    if (memberPrice < 10000){
      throw new Error('Member Price must be longer then 10000')
    }

    if (consumerPrice < 10000){
      throw new Error('Consumer Price must be longer then 10000')
    }

    if (!consumerPrice){
      throw new Error(' must be exist')
    }

    if (!uses){
      throw new Error('Uses must be exist')
    }

    if (!howToUse){
      throw new Error('How To Use must be exist')
    }

    if (!description){
      throw new Error('Description must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    return Object.freeze({
      getProductId : () => productId,
      getProductName : () => name,
      getSalesCategory : () => salesCategory,
      getQty : () => qty,
      getSize : () => size,
      getWeight : () => weight,
      getMemberPrice : () => memberPrice,
      getConsumerPrice : () => consumerPrice,
      getUses : () => uses,
      getHowToUse : () => howToUse,
      getDescription : () => description,
      getCrossProductId : () => crossProductId,
      getStatus : () => status,
      getRating : () => rating,
      getSequence : () => sequence,
      getCommisionRef : () => commisionRef,
      getPhotos : () => photos
    })
  }
}
