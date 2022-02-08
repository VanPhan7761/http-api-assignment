const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');

const jsonHandler = require('./jsonHandler.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    notFound: jsonHandler.notFound,
};

//handles the http request from our server
const onRequest = (request, response) => {

    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);

    //runs request based off the url struct
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params);
    } else {
        urlStruct.notFound(request, response, params);
    }
};

//starts the server and then logs when our server is listening for request
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});