export default function buildMakePhotoProduct(){
  return function makePhotoProduct({
    productId = 0,
    imgName = '',
    createdTime = Date.now(),
    updateTime = Date.now()
  } = {}) {

    if (!productId){
      throw new Error('productId must be exist')
    }

    if (!imgName){
      throw new Error('imgName must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    return Object.freeze({
      getProductId : () => productId,
      getImgName : () => imgName
    })
  }
}
