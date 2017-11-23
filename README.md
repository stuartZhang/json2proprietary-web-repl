# json2proprietary-web-repl
Wrap the [json2proprietary](https://github.com/stuartZhang/json2proprietary.git) core as a Web Server

# Details
Use the Express Application Generator to initialize the skeleton of the web-site codes.
```
npm install express-generator -g
express -v hbs -c sass --git --force
npm install
SET DEBUG=json2proprietary-web-repl:* & npm start
```
Open the web browser and access http://localhost:3000/

restart the server on file changes
```
npm install --save-dev nodemon
```