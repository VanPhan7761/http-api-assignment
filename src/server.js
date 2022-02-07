const http = require('http');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const urlStruct = {
//     'GET': {
//       '/': htmlHandler.getIndex,
//       '/style.css': htmlHandler.getCSS,
//     },
//     'HEAD': {

//     },
//   };

const onRequest = (request, response) => {
    console.log(request.url);

    switch (request.url) {
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});