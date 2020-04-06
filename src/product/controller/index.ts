import {
  createDataProduct,
  createDataPhotoProduct,
  createDataVideoProduct,
  createDataStockcard,
  getDataProduct,
  getDataProductDetail,
  getDataProductByStockist,
  getDataPhotoProduct,
  getDataStockcard,
  getDataVideoProduct,
  getDataSalesCategory,
  getDataSize,
  getDataStatus,
  getDataCatalog,
  updateDataProduct,
  updateDataVideoProduct,
  deleteDataVideoProduct
} from '../use-case'

import makeCreateProduct from './create-product'
import makeCreatePhotoProduct from './create-photo-product'
import makeCreateStockcard from './create-stockcard'
import makeCreateVideoProduct from './create-video-product'
import makeGetProduct from './get-product'
import makeGetProductDetail from './get-product-detail'
import makeGetProductByStockist from './get-product-by-stockist'
import makeGetPhotoProduct from './get-photo-product'
import makeGetStockcard from './get-stockcard'
import makeGetVideoProduct from './get-video-product'
import makeGetSalesCategory from './get-sales-category'
import makeGetSize from './get-size'
import makeGetStatus from './get-status'
import makeGetCatalog from './get-catalog'
import makeUpdateProduct from './update-product'
import makeUpdateVideoProduct from './update-video-product'
import makeDeleteVideoProduct from './delete-video-product'

const createProduct = makeCreateProduct({createDataProduct})
const createPhotoProduct = makeCreatePhotoProduct({createDataPhotoProduct})
const createVideoProduct = makeCreateVideoProduct({createDataVideoProduct})
const createStockcard = makeCreateStockcard({createDataStockcard})
const getProduct = makeGetProduct({getDataProduct})
const getProductDetail = makeGetProductDetail({getDataProductDetail})
const getProductByStockist = makeGetProductByStockist({getDataProductByStockist})
const getPhotoProduct = makeGetPhotoProduct({getDataPhotoProduct})
const getStockcard = makeGetStockcard({getDataStockcard})
const getVideoProduct = makeGetVideoProduct({getDataVideoProduct})
const getSalesCategory = makeGetSalesCategory({getDataSalesCategory})
const getSize = makeGetSize({getDataSize})
const getStatus = makeGetStatus({getDataStatus})
const getCatalog = makeGetCatalog({getDataCatalog})
const updateProduct = makeUpdateProduct ({updateDataProduct})
const updateVideoProduct = makeUpdateVideoProduct ({updateDataVideoProduct})
const deleteVideoProduct = makeDeleteVideoProduct({deleteDataVideoProduct})

const productController =  Object.freeze({
  createProduct,
  createPhotoProduct,
  createVideoProduct,
  createStockcard,
  getProduct,
  getProductDetail,
  getProductByStockist,
  getPhotoProduct,
  getStockcard,
  getVideoProduct,
  getSalesCategory,
  getSize,
  getStatus,
  getCatalog,
  updateProduct,
  updateVideoProduct,
  deleteVideoProduct
})

export default  productController
export { createProduct, createPhotoProduct, createStockcard, createVideoProduct, getProduct, getProductDetail, getProductByStockist, getPhotoProduct, getVideoProduct, getStockcard, getSalesCategory, getSize, getStatus, getCatalog, updateProduct, updateVideoProduct, deleteVideoProduct}
