export default function makeCreateProduct ({ createDataProduct }) {
  return async function createProduct (httpRequest,sendToSlack) {
    try {
      const bodyparam  = httpRequest.body
      console.log('controller',bodyparam)
      const posted = await createDataProduct(bodyparam)
      console.log('post',posted);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: {
          status : true,
          response_code : 200,
          message : "OK",
          data: posted
        }
      }
    } catch (e) {

      console.log(e)
      // sendToSlack.alert({
      //  text: `:X: ${e.stack}`
      //  });

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          status : false,
          response_code : 400,
          message: e.message,
        }
      }
    }
  }
}
