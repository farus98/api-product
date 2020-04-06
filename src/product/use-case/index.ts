import makeCreateProduct from './create-product'
import makeCreatePhotoProduct from './create-photo-product'
import makeCreateVideoProduct from './create-video-product'
import makeCreateStockcard from './create-stockcard'
import makeGetProduct from './get-product'
import makeGetProductDetail from './get-product-detail'
import makeGetProductByStockist from './get-product-by-stockist'
import makeGetPhotoProduct from './get-photo-product'
import makeGetVideoProduct from './get-video-product'
import makeGetStockcard from './get-stockcard'
import makeGetSalesCategory from './get-sales-category'
import makeGetSize from './get-size'
import makeGetStatus from './get-status'
import makeGetCatalog from './get-catalog'
import makeUpdateProduct from './update-product'
import makeUpdateVideoProduct from './update-video-product'
import makeDeleteVideoProduct from './delete-video-product'
import productDb from '../data-access'

const createDataProduct = makeCreateProduct ({ productDb})
const createDataPhotoProduct = makeCreatePhotoProduct ({ productDb})
const createDataVideoProduct = makeCreateVideoProduct ({ productDb})
const createDataStockcard = makeCreateStockcard ({ productDb})
const getDataProduct = makeGetProduct ({ productDb})
const getDataProductDetail = makeGetProductDetail ({ productDb})
const getDataProductByStockist = makeGetProductByStockist ({ productDb})
const getDataPhotoProduct = makeGetPhotoProduct ({ productDb})
const getDataVideoProduct = makeGetVideoProduct ({ productDb})
const getDataStockcard = makeGetStockcard ({ productDb})
const getDataSalesCategory = makeGetSalesCategory ({ productDb})
const getDataSize = makeGetSize ({ productDb})
const getDataStatus = makeGetStatus ({ productDb})
const getDataCatalog = makeGetCatalog ({ productDb})
const updateDataProduct = makeUpdateProduct ({ productDb})
const updateDataVideoProduct = makeUpdateVideoProduct ({ productDb})
const deleteDataVideoProduct = makeDeleteVideoProduct ({ productDb})

const productService = Object.freeze({
  createDataProduct,
  createDataPhotoProduct,
  createDataVideoProduct,
  createDataStockcard,
  getDataProduct,
  getDataProductDetail,
  getDataProductByStockist,
  getDataPhotoProduct,
  getDataVideoProduct,
  getDataSalesCategory,
  getDataSize,
  getDataStatus,
  getDataCatalog,
  updateDataProduct,
  updateDataVideoProduct,
  deleteDataVideoProduct
})

export default productService
export {  createDataProduct, createDataPhotoProduct,createDataVideoProduct, createDataStockcard, getDataProduct, getDataProductDetail, getDataProductByStockist, getDataPhotoProduct, getDataVideoProduct, getDataStockcard, getDataSalesCategory, getDataSize, getDataStatus, getDataCatalog, updateDataProduct, updateDataVideoProduct, deleteDataVideoProduct}
