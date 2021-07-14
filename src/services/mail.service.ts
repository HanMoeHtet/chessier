import { init, send } from 'emailjs-com';
import 'dotenv/config';

const userId = process.env.REACT_APP_MAIL_USER_ID;
const serviceId = process.env.REACT_APP_MAIL_SERVICE_ID;
const templateId = process.env.REACT_APP_MAIL_TEMPLATE_ID;

if (!userId || !serviceId || !templateId) throw Error('Invalid mail config');

init(userId);

interface MailOptions {
  from_email: string;
  from_name: string;
  message: string;
}

export const sendMail = ({ from_email, from_name, message }: MailOptions) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      const { status, text } = await send(serviceId, templateId, {
        from_email,
        from_name,
        message,
      });
      resolve();
    } catch (err) {
      console.log(err);
      reject();
    }
  });
