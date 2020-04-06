export default function buildMakeVideoProduct(){
  return function makeVideoProduct({
    id = 0,
    productId = 0,
    name = '',
    category = '',
    thumb = '',
    ylink = '',
    yid = '',
    caption = '',
    sequence = 0,
    createdTime = Date.now(),
    updateTime = Date.now()
  } = {}) {

    if (!productId){
      throw new Error('Product Id must be exist')
    }

    if (!name){
      throw new Error('Name must be exist')
    }

    if (!category){
      throw new Error('Category must be exist')
    }

    if (!thumb){
      throw new Error('Thumb must be exist')
    }

    if (!ylink){
      throw new Error('Yid must be exist')
    }

    if (!yid){
      throw new Error('Yid must be exist')
    }

    if (!caption){
      throw new Error('Caption must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    if (!createdTime){
      throw new Error('Created Time must be exist')
    }

    if (!updateTime){
      throw new Error('Update Time must be exist')
    }

    return Object.freeze({
      getId : () => id,
      getProductId : () => productId,
      getName : () => name,
      getCategory : () => category,
      getThumb : () => thumb,
      getYid : () => yid,
      getYlink : () => ylink,
      getCaption : () => caption,
      getSequence : () => sequence
    })
  }
}
