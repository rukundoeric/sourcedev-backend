/* eslint-disable linebreak-style */
import contactUsNotification from '../template/contactusNotification';
import contactUsResponce from '../template/contactusResponce';

export default (...args) => {
  switch (args[0]) {
    case 'contactusNotification': {
      return {
        mail: { email: args[1] },
        html: contactUsNotification(args[2]),
        subject: 'MESSAGE',
      };
    }
    case 'contactUsResponce': {
      return {
        mail: { email: args[1] },
        html: contactUsResponce(args[2]),
        subject: 'Welcome to SourceDev',
      };
    }
    default:
      return false;
  }
};
