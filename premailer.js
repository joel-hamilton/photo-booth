require('dotenv').config({path: __dirname + '/.env'});
var premailer = require('premailer-api');
var fs = require('fs');
var path = require('path');

var emailTemplate = fs.readFileSync(path.resolve(process.env.PROJECT_DIR + '/email.html'), "utf8");

premailer.prepare({html: emailTemplate}, function (err, email) {
    if (err) throw err;

    fs.writeFileSync(process.env.PROJECT_DIR + "/email_inlined.json", JSON.stringify(email));
});