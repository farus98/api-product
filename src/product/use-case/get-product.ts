export default function makeGetProduct ({ productDb}) {

  return async function getProduct (body) {

    try {
          // let id = body.id;
          // let name = body.name;
          // let status = body.status;
          // let size = body.size;
          // let sales = body.salesCategory;
          // let validation:any = ''
          //
          // if(id){
          //   validation = /^[0-9]+$/;
          //
          //   if(!id.match(validation)){
          //     throw new Error("hayo mau ngapain")
          //   }else{
          //     console.log('usecase', body)
          //
          //     const result =  await productDb.showProductById(body);
          //     console.log('res',result)
          //
          //     return result;
          //   }
          // }
          //
          // if(name){
          //   let namevalidation = name.toLowerCase();
          //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
          //
          //   validation = namevalidation.search(validate);
          //
          //   if(validation != -1){
          //     throw new Error("hayo mau ngapain")
          //   }
          // }
          //
          // if(status){
          //   let namevalidation = status.toLowerCase();
          //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
          //
          //   validation = namevalidation.search(validate);
          //
          //   if(validation != -1){
          //     throw new Error("hayo mau ngapain")
          //   }
          // }
          //
          // if(size){
          //   let namevalidation = size.toLowerCase();
          //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
          //
          //   validation = namevalidation.search(validate);
          //
          //   if(validation != -1){
          //     throw new Error("hayo mau ngapain")
          //   }
          // }
          //
          // if(sales){
          //   let namevalidation = sales.toLowerCase();
          //   let validate = /^[select,drop,alter,delete,create,merge,insert,\',\' or,\^',\*,\;]+$/;
          //
          //   validation = namevalidation.search(validate);
          //   console.log('as',validation);
          //
          //   if(validation != -1){
          //     throw new Error("hayo mau ngapain")
          //   }
          // }

      console.log('usecase', body)

      if(body.page < 1){
            throw new Error("page not less then one")
      }

      const result =  await productDb.showProduct(body);
      console.log('res',result)

      return result;

    } catch (error) {
      throw new Error(error);
    }

  }
}
