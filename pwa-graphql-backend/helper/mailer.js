import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

const transporter = nodemailer.createTransport({
    host: 'viralsangani1922@gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'viralsangani1922@gmail.com',
        pass: 'xfkrwblubenrbkjg',
    },
});

export const sendEmail = async (mailObj) => {
    try {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailObj, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    } catch (error) {
        console.log(error, 'email not sent');
        return null;
    }
};
