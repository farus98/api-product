import mysql from 'mysql'
import makeProductDb from './product-db'
require('dotenv').config();


// console.log( process.env.DB_HOST_DEV)
console.log( process.env.ENVIRONMENT)

let host : string = ''
let user :string = ''
let password :string = ''
let database :string = ''

const environment = process.env.ENVIRONMENT
console.log(environment)

if( environment === 'production'){
  let host = process.env.DB_HOST_PROD
  console.log('TEESS',host)
  let user = process.env.DB_USER_PROD
  let password = process.env.DB_PASS_PROD
  let database = process.env.DB_DATABASE_PROD

  var mysqlConnection = mysql.createPool  ({
      connectionLimit : 10,
      host : host ,
      user : user,
      password : password,
      database : database,
      multipleStatements : true
  });
}else{
  let host = process.env.DB_HOST_DEV
  console.log('TEESS',host)
  let user = process.env.DB_USER_DEV
  let password = process.env.DB_PASS_DEV
  let database = process.env.DB_DATABASE_DEV

  var mysqlConnection = mysql.createPool  ({
      connectionLimit : 10,
      host : host ,
      user : user,
      password : password,
      database : database,
      multipleStatements : true
  });

}

// export async function makeDb(){
  mysqlConnection.getConnection((err) => {
      if (!err)
          console.log('DB koneksi sukses');
      else
          console.log('DB koneksi error : ' + JSON.stringify(err,undefined, 2));
  });
// }


const productDb = makeProductDb({mysqlConnection})

export default productDb
