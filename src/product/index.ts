import bodyParser from 'body-parser';
import camelcaseKeys from 'camelcase-keys';
import multer from 'multer';
import {sendToSlack,ErrorHandler,handleError} from './helpers'
import dotenv from 'dotenv'
import cors from 'cors'
//var sqlinjection = require('sql-injection');
var helmet = require('helmet')
var moment = require("moment")
const express = require("express")

dotenv.config()

const app = express();
const makeCallback = require ('./call-back')
import {createProduct, createPhotoProduct, createStockcard, createVideoProduct, getProduct, getProductDetail, getProductByStockist, getPhotoProduct, getVideoProduct, getStockcard, getSize, getStatus, getSalesCategory,getCatalog, updateProduct, updateVideoProduct, deleteVideoProduct} from './controller'

//app.use(sqlinjection());
app.use(cors());
app.use(helmet())
app.use(bodyParser.json());

app.post('/', makeCallback(createProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/photo', makeCallback(createPhotoProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/video', makeCallback(createVideoProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/stockcard', makeCallback(createStockcard,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/detail', makeCallback(getProductDetail,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/stockist', makeCallback(getProductByStockist,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/get_photo', makeCallback(getPhotoProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/get_video', makeCallback(getVideoProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/get_stockcard', makeCallback(getStockcard,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/size', makeCallback(getSize,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/status', makeCallback(getStatus,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/sales_category', makeCallback(getSalesCategory,camelcaseKeys,sendToSlack,ErrorHandler));
app.post('/catalog', makeCallback(getSalesCategory,camelcaseKeys,sendToSlack,ErrorHandler));
app.get('/', makeCallback(getProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.put('/', makeCallback(updateProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.put('/video', makeCallback(updateVideoProduct,camelcaseKeys,sendToSlack,ErrorHandler));
app.delete('/video', makeCallback(deleteVideoProduct,camelcaseKeys,sendToSlack,ErrorHandler));

app.use((err, req, res, next) => {
    handleError(err, res);
});

const destination = 'src/product/uploads'
const filename = (req, file, cb) =>{

  const name = file.originalname.split(' ').join('-');
  const namefile = name.slice(-50,-4).replace('.','')

  const extension = file.mimetype.replace("image/",'')
  const date = moment().format('YYYY-MM-DD-h-mm-ss')

  cb(null, namefile+'-'+date+'.'+extension);
}

const myStorage = multer.diskStorage({destination, filename})

const uploader = multer({storage: myStorage}).single('userfile')

app.post('/upload_photo', (req, res) => {
  uploader(req, res, function(err) {
    if (err) {
      return res.end(`Error : ${err}`);
    }
    res.send({
      output_type : "json",
      response_code : 200,
      data: req.file.filename
    })
  });
});

export default app;
