export default function makeDeleteVideoProduct ({ deleteDataVideoProduct }) {
  return async function deleteVideoProduct (httpRequest,sendToSlack) {
    try {
      const bodyparam  = httpRequest.query
      console.log('controller',bodyparam)
      const posted = await deleteDataVideoProduct(bodyparam)
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
