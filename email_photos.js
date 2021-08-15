process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
});

require('dotenv').config({path: __dirname + '/.env'});
let mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: domain});
let path = require('path');
let fs = require('fs');
let domain = 'mg.wlacamps.org';

// get email template
let emailData = fs.readFileSync(path.resolve(process.env.PROJECT_DIR + '/email_inlined.json'));
let emailTemplate = JSON.parse(emailData);

let args = process.argv.slice(2);
let email = args.pop(); // email is last arg
let photos = args; //photos are all other args

let data = {
    from: "Rockin' Christmas <no-reply@mg.wlacamps.org>",
    to: email,
    subject: 'Photos',
    text: emailTemplate.text,
    html: emailTemplate.html
};

// TODO, currently only works with single file
data.attachment = photos.map(function (photo) {
    let file = photo.replace(/:/g, '/').replace('Macintosh HD', '');
    fs.appendFileSync(path.resolve(process.env.PROJECT_DIR + '/email_inlined.json'), file + ' - ' + email + "\n");

    return new mailgun.Attachment({
        data: fs.readFileSync(file), 
        filename: 'Rockin.jpg'
    });
});

sendEmail(data);

function sendEmail(data) {
    mailgun.messages().send(data, function (error, body) {
        if (error) {
            throw error;
        }

        console.log(body.message);

        setTimeout(function () {
            process.exit(0);
        }, 3000)
    });
}