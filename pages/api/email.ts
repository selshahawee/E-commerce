import { NextApiRequest, NextApiResponse } from "next";

export{}
const apiKey = '13b0a340a7d366d6c0472fd2673004f5-5e7fba0f-39476433';
const domain = 'api';

const mailgun = require('mailgun-js')({ domain, apiKey });

mailgun.
  messages().
  send({
    from: `test@${domain}`,
      to: 'selshahawee@gmail.com',
      subject: 'Hello from Mailgun',
      text: 'This is a test'
  }).
  then((res: any) => console.log(res)).
  catch((err: any) => console.error(err));