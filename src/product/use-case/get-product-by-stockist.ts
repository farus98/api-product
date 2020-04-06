export default function makeGetProductByStockist ({ productDb}) {

  return async function getProductByStockist (body) {
    console.log('usecase', body)

    try {

        // let id = body.id;
        // let name = body.name;
        // let status = body.status;
        // let size = body.size;
        // let sales = body.salesCategory;
        // let validation:any = ''
        //
        // if(id){
        //   let validate = /^[0-9]+$/;
        //   validation = id.search(validate);
        //
        //   if(validation == -1){
        //     throw new Error("hayo mau ngapain")
        //   }
        //
        // }
        //
        // if(name){
        //   let namevalidation = name.toLowerCase();
        //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
        //
        //   validation = namevalidation.search(validate);
        //
        //   if(validation == 0){
        //     throw new Error("hayo mau ngapain")
        //   }
        //
        // }
        //
        // if(status){
        //   let namevalidation = status.toLowerCase();
        //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
        //
        //   validation = namevalidation.search(validate);
        //
        //   if(validation == 0){
        //     throw new Error("hayo mau ngapain")
        //   }
        //
        // }
        //
        // if(size){
        //   let namevalidation = size.toLowerCase();
        //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
        //
        //   validation = namevalidation.search(validate);
        //
        //   if(validation == 0){
        //     throw new Error("hayo mau ngapain")
        //   }
        //
        // }
        //
        // if(sales){
        //   let namevalidation = sales.toLowerCase();
        //   // let validates = /^[reguler,starterkit,diffuser,package,carrier-oil,thankyou-page]+$/;
        //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
        //   validation = namevalidation.search(validate);
        //   console.log('as',validation);
        //
        //   if(validation == 0){
        //     throw new Error("hayo mau ngapain")
        //     console.log(Error);
        //
        //   }
        // }

        const result =  await productDb.showProductByStockist(body);
        console.log('res',result)

        return result;

    }

    catch (error) {
      throw new Error(error);
    }

  }

}
