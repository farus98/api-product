import slack from './slack';
import {ErrorHandler,handleError} from './error';

const sendToSlack = slack;

const helperServices = Object.freeze({
    sendToSlack,
    ErrorHandler,handleError
})

export default helperServices;
export {sendToSlack,ErrorHandler,handleError}
