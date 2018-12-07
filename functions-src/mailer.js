const nodemailer = require('nodemailer');

const clientId = '474927136012-l23e8b104t09h2tgjkiene68qt41kp4h.apps.googleusercontent.com';
const refreshToken = '1/Zo5t2L8Lm_KQ01ScT1zDKx44LjQ-O5pMUfAjvM1V7ao';

exports.handler = function(event, context, callback){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'erinmtait@gmail.com',
            clientId: clientId,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: refreshToken
        }
    });

    const body = JSON.parse(event.body);
    const mailOptions = {
        to: 'erinmtait@gmail.com',
        subject: `New Website Message From ${body.name} `,
        text: `Sender Name: ${body.name}, Sender Email: ${body.email}, Sender Message: ${body.message}`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            console.log(error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            });
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(info.response)
            });
        }
    })
}

