export default function makeGetProductDetail ({ getDataProductDetail }) {
  return async function getProductDetail (httpRequest,sendToSlack) {
    try {
      const { source = {}, ...bodyparam } = httpRequest.body
      console.log('controller',bodyparam)

      const posted = await getDataProductDetail({...bodyparam})
      console.log('posted',posted)
      return {
        headers: {
          'Content-Type': 'application/json',
          // 'Last-Modified': new Date(posted.createdTime).toUTCString()
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
      //TODO: Error logging
      // console.log(e)
      // sendToSlack.alert({
      //   text: `:X: ${e.stack}`
      // });

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
