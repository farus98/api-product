var moment = require("moment")
export default function makeProductDb({mysqlConnection}) {
  return Object.freeze({
    showProduct,
    showProductById,
    showProductByStockist,
    showProductByStockistId,
    showPhotoProductAll,
    showPhotoProductDetail,
    showStockcardAll,
    showStockcardList,
    showVideoProductAll,
    showVideoProductById,
    showSize,
    showStatus,
    showSalesCategory,
    showCatalog,
    insertProduct,
    insertPhotoProduct,
    insertVideoProduct,
    insertStockcard,
    updateProduct,
    updateVideoProduct,
    deleteVideoProduct
  })

  async function insertProduct(product){
      return new Promise(function(resolve, reject) {
        console.log('befor insert',product);

        var postProduct = {
            product_name: product.getProductName(),
            sales_category: product.getSalesCategory(),
            size: product.getSize(),
            weight: product.getWeight(),
            member_price: product.getMemberPrice(),
            consumer_price: product.getConsumerPrice(),
            uses: product.getUses(),
            how_to_use: product.getHowToUse(),
            description: product.getDescription(),
            cross_product_id: product.getCrossProductId(),
            rating: product.getRating(),
            sequence: product.getSequence(),
            commission_ref: product.getCommisionRef(),
            status:product.getStatus()
        };

        mysqlConnection.getConnection(function (error, conn){

          if(error){
            reject(new Error(error))
          }

           conn.query("INSERT INTO products SET ?", postProduct ,(err, rows, fields)=>{
              if(err){
                reject(new Error(err))
              }
              console.log("product id :", rows.insertId );

              var postQty = {
                  product_id: rows.insertId,
                  stockist_id: 1,
                  qty: 10
              }

              conn.query("INSERT INTO stock_qty SET ?", postQty,(err, rows, fields)=>{
                   if(err){
                     reject(new Error(err))
                   }
              })

              let dataPhotos = product.getPhotos()
              let as = product.getPhotos()
              let ass = as.length
              console.log('asu', as[1]);

              for (let index = 0; index < dataPhotos.length; index++) {
                var photo = dataPhotos

                var postPhoto = {
                    product_id: rows.insertId,
                    img_name: photo
                }

                conn.query("INSERT INTO product_photo SET ?", postPhoto ,(err, rows, fields)=>{
                     if(err){
                       reject(new Error(err))
                     }

                     let products:any = postProduct
                         products.stock = postQty
                         products.photos = postPhoto
                         console.log('pro',products);

                     resolve(products)

                })
              }

              conn.release()

            })
          })
      })
    }

    async function insertPhotoProduct(photoProduct){
        return new Promise(function(resolve, reject) {

          var post = {
              product_id: photoProduct.getProductId(),
              img_name: photoProduct.getImgName()
          };
          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

             conn.query("INSERT INTO product_photo SET ?", post ,(err, rows, fields)=>{
              if(err){
                reject(new Error(err))

              }else{
                resolve(post)
              }

              conn.release()
            })
          })
        })
      }

    async function insertVideoProduct(videoProduct){
        return new Promise(function(resolve, reject) {

          var post = {
              product_id: videoProduct.getProductId(),
              name: videoProduct.getName(),
              category: videoProduct.getCategory(),
              thumb: videoProduct.getThumb(),
              ylink: videoProduct.getYlink(),
              yid: videoProduct.getYid(),
              caption: videoProduct.getCaption(),
              sequence: videoProduct.getSequence()
          };

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

             conn.query("INSERT INTO product_videos SET ?", post,(err, rows, fields)=>{
              if(err){
                reject(new Error(err))

              }else{
                resolve(post)
              }

              conn.release()
            })
          })
        })
    }

    async function insertStockcard(stockcard){
        return new Promise(function(resolve, reject) {

          var stockcard = {
              type: stockcard.getType(),
              product_id: stockcard.getProductId(),
              stockist_id: stockcard.getStockistId(),
              description: stockcard.getDescription(),
              qty: stockcard.getQty(),
              action_by_id: stockcard.getActionById()
          };

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

             conn.query("INSERT INTO stock_card SET ?", stockcard,(err, rows, fields)=>{
              if(err){
                reject(new Error(err))
              }

              // let id = rows.insertId
              //
              // let stock = {
              //   type: stockcard.getType(),
              //   product_id: stockcard.getProductId(),
              //   stockist_id: stockcard.getStockistId()
              // }
              //
              // if(id){
              //   if(stockcard.getType()=='in'){
              //     conn.query("increase_stock SET ?", stock,(err, rows, fields)=>{
              //      if(err){
              //        reject(new Error(err))
              //      }
              //    })
              //   }else{
              //     conn.query("increase_stock INTO stock_card SET ?", stockcard,(err, rows, fields)=>{
              //      if(err){
              //        reject(new Error(err))
              //      }
              //    })
              //   }
              // }

              else{
                resolve(stockcard)
              }

              conn.release()
            })
          })
        })
    }

    async function showProductById(query){
            return new Promise(function(resolve, reject) {

              mysqlConnection.getConnection(function (error, conn){
                if(error){
                  reject(new Error(error))
                }

              let sql1 ="SELECT * FROM products WHERE product_id = ?";
              conn.query(sql1, query.id, (err, result, fields)=>{
                if(err){
                  reject(new Error(err))
                }

                let sql2 ="SELECT * FROM product_photo WHERE product_id = ?";
                conn.query(sql2, query.id, (err, result2, fields)=>{
                  if(err){
                    reject(new Error(err))
                  }

                  let sql3 ="SELECT * FROM stock_qty sq JOIN stockist st ON st.id = sq.stockist_id WHERE sq.product_id = ?";
                  conn.query(sql3, query.id, (err, result3, fields)=>{
                    if(err){
                      reject(new Error(err))
                    }

                  let product:any = result[0]
                  product.photos = result2
                  product.stock = result3

                  resolve(product)
                  conn.release()

                  })
                })
                })
              })
            })
        }

    async function showProduct(query){
      return new Promise(function(resolve, reject) {

            mysqlConnection.getConnection(function (error, conn){
              if(error){
                reject(new Error(error))
              }

              let where:any = " WHERE 1"

              if(query.name){
                where += ' and products.product_name LIKE '+ conn.escape("%"+query.name+"%");
              }
              if(query.status){
                where +=' and p.status = ' + conn.escape(query.status);
              }
              if(query.size){
                where +=' and p.size = '+ conn.escape(query.size);
              }
              if(query.salesCategory){
                where +=' and p.sales_category = '+ conn.escape(query.salesCategory);
              }
              console.log('where',where)

              let limit:any = ''
              let pagination:any = ''
              let offset:any = ''

              if(query.limit){
                limit += parseInt(query.limit);
              }else{
                limit += 100
              }

              if(query.page){
                offset += parseInt(query.page);
                let page = offset - 1;
                pagination += page*limit;
              }else{
                offset += 1;
                let page = offset - 1;
                pagination += page*limit;
              }

              console.log('limit = ', limit);
              console.log('page = ', pagination);

              let groupBy = "GROUP BY products.product_id";
              let orderBy = "ORDER BY products.product_id ASC";

              let sql = `SELECT products.product_id, products.product_name, products.sales_category, stock_qty.qty AS quantity,
                    products.size, products.weight, products.member_price, products.consumer_price, products.uses,
                    products.how_to_use, products.size, products.description, products.cross_product_id, products.status,
                    products.rating, products.sequence, products.commission_ref, products.created_time, product_photo.img_name, product_videos.thumb,
                    product_videos.ylink, product_videos.yid FROM products LEFT JOIN stock_qty USING (product_id) LEFT JOIN
                    product_photo USING(product_id) LEFT JOIN product_videos USING(product_id) ${where} ${groupBy} ${orderBy}
                    LIMIT ${limit} OFFSET ${pagination}`;

              conn.query(sql, (err, result, fields)=>{

                let crt = moment(result.created_time).format('YYYY-MM-DD-h:mm:ss');
                let createTime = crt;

                let upt = moment(result.updated_time).format('YYYY-MM-DD-h:mm:ss');
                let updateTime = upt;

                let res = result;
                var count = res.length;

                res.created_time = createTime;
                res.updated_time = updateTime;
                // console.log(res);

                if(err){
                  reject(new Error(err))
                }else if(!result){
                  reject(new Error('no data'))
                }else{
                  resolve({res, count})
                }

                conn.release()

                })
              })
      })
    }

    async function showProductByStockistId(body){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            let sql =`SELECT sq.*,p.product_name, p.member_price, p.consumer_price From stock_qty sq
                    JOIN products p USING(product_id) WHERE sq.stockist_id = ?`

            conn.query(sql, body.id,(err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                resolve(result)
              }

              conn.release()

            })
          })
        })
    }

    async function showProductByStockist(query){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            let where:any = 'WHERE stock_qty.stockist_id = '+ conn.escape(query.id);

            if(query.name){
              where += ' and p.product_name LIKE '+ conn.escape("%"+query.name+"%");
            }
            if(query.status){
              where +=' and p.status = ' + conn.escape(query.status);
            }
            if(query.size){
              where +=' and p.size = '+ conn.escape(query.size);
            }
            if(query.salesCategory){
              where +=' and p.sales_category = '+ conn.escape(query.salesCategory);
            }
            console.log('where',where)

            let limit:any = ''
            let pagination:any = ''
            let offset:any = ''

            if(query.limit){
              limit += parseInt(query.limit);
            }else{
              limit += 100;
            }

            if(query.page){
              offset += parseInt(query.page);
              let page = offset - 1;
              pagination += page*limit;
            }else{
              offset += 1;
              let page = offset - 1;
              pagination += page*limit;
            }

            console.log('limit = ', limit);
            console.log('page = ', pagination);

            let sql = `SELECT stock_qty.*, p.product_name, p.member_price, p.consumer_price, p.sales_category,
                      p.size, p.status, p.created_time, p.updated_time  From stock_qty JOIN products p USING(product_id) ${where}
                      LIMIT ${limit} OFFSET ${pagination} `

            conn.query(sql, (err, result, fields)=>{
              // let createTime = Date(result.created_time).toDateString();
              //
              // let updateTime = moment(result.updated_time).format('YYYY-MM-DD-h:mm:ss');

              if(err){
                reject(new Error(err))
                console.log('error', err);

              }else if(!result){
                reject(new Error('no data'))
              }else{

                // for (let index = 0; index < result.length; index++) {
                //   let res = result[index];
                //   res.created_time = createTime;
                //   res.updated_time = updateTime;
                //   //resolve(res)
                // }
                resolve(result)
              }

              conn.release()

            })
          })
      })
    }


    async function showPhotoProductAll(){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            conn.query("SELECT * FROM product_photo ORDER BY id ASC",(err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                resolve(result)
              }

              conn.release()

            })
          })
        })
    }

    async function showPhotoProductDetail(query){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("SELECT * FROM product_photo where id = ?",query.id,(err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function showVideoProductAll(){
        return new Promise(function(resolve, reject) {
          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("SELECT * from product_videos ORDER BY id ASC",(err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function showVideoProductById(query){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("SELECT * from product_videos WHERE ?", query, (err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function showStockcardAll(){
        return new Promise(function(resolve, reject) {
          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("SELECT * from stock_card ORDER BY id ASC", (err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function showStockcardList(query){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("SELECT * from stock_card WHERE ?", query, (err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function showCatalog(){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            conn.query("SELECT * FROM catalog order by id ASC",(err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                resolve(result)
              }

              conn.release()

            })
          })
        })
    }

    async function showSize(){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            conn.query("SHOW COLUMNS FROM products WHERE Field = 'size'", (err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                var res = result[0].Type;
                var matches = String(res).match(/^enum\(\'(.*)\'\)$/);
                var enums = matches![1].split("','");
                resolve(enums)
              }
              conn.release()

            })
          })
        })
    }

    async function showStatus(){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            conn.query("SHOW COLUMNS FROM products WHERE Field = 'status'", (err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                var res = result[0].Type;
                var matches = String(res).match(/^enum\(\'(.*)\'\)$/);
                var enums = matches![1].split("','");
                resolve(enums)
              }
              conn.release()

            })
          })
        })
    }

    async function showSalesCategory(){
      return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){

            if(error){
              reject(new Error(error))
            }

            conn.query("SHOW COLUMNS FROM products WHERE Field = 'sales_category'", (err, result, fields)=>{

              if(err){
                reject(new Error(err))
              }else if(!result){
                reject(new Error('no data'))
              }else{
                var res = result[0].Type;
                var matches = String(res).match(/^enum\(\'(.*)\'\)$/);
                var enums = matches![1].split("','");
                resolve(enums)
              }
              conn.release()

            })
          })
        })
    }

    async function updateProduct(body){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          let updateProduct = {
            product_name: body.name,
            size: body.size,
            weight: body.weight,
            member_price: body.memberPrice,
            consumer_price: body.consumerPrice,
            uses: body.uses,
            how_to_use: body.howToUse,
            description: body.description,
            status: body.status,
            commission_ref: body.commissionRef
          }
          let sql = `UPDATE products SET ? WHERE product_id = ?`;

          let paramsProduct = [updateProduct, body.id]
          conn.query(sql, paramsProduct, (err, result, fields)=>{
            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }

          let photo = body.photos

          for (let index = 0; index < photo.length; index++) {

            let updatePhoto = {
              img_name : photo
            }

            let id = body.id

            let sql = `UPDATE product_photo SET img_name = ${updatePhoto} WHERE product_id = ${updatePhoto}`

            conn.query(sql, (err, result2, fields)=>{
               if(err){
                 reject(new Error(err))
               }else if(!result){
                 reject(new Error('no data'))
               }

               let product:any = updateProduct
                   product.photos = updatePhoto

               resolve(product)
             })
          }

            conn.release()
        })
       })

     })
    }

    async function updateVideoProduct(body){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          let sql = "UPDATE product_videos SET name =?, thumb=?, ylink=?, yid=?, caption=? WHERE id = ?";

          conn.query(sql, [body.name, body.thumb, body.ylink, body.yid, body.caption, body.id], (err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }

    async function deleteVideoProduct(body){
        return new Promise(function(resolve, reject) {

          mysqlConnection.getConnection(function (error, conn){
            if(error){
              reject(new Error(error))
            }

          conn.query("DELETE FROM product_videos WHERE product_id = ?", body.productId, (err, result, fields)=>{

            if(err){
              reject(new Error(err))
            }else if(!result){
              reject(new Error('no data'))
            }else{
              resolve(result)
            }

            conn.release()

            })
          })
        })
    }
}
