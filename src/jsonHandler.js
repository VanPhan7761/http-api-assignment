//returns the response data to the server
const respondJSON = (request, response, status, object) => {
    
    response.writeHead(status, { 'Content-Type': 'application/json' });

    response.write(JSON.stringify(object));

    response.end();
  };
  
  //function to show a success status code
  const success = (request, response) => {
    const responseJSON = {
      message: 'This is a successful response',
    };

    console.log("200 status");
    respondJSON(request, response, 200, responseJSON);
  };
  
  //function to show a bad request without the correct parameters
  const badRequest = (request, response, params) => {
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    if(!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';

      //if we are missing params send a missing params status code
      console.log("400 status");
      return respondJSON(request, response, 400, responseJSON);
    }
  
    //if the parameter is here, send json with a success status code
    console.log("200 status");
    return respondJSON(request, response, 200, responseJSON);
  };
  
  //function to show not found error
  const notFound = (request, response) => {
    //error message with a description and consistent error id
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    //return our json with a 404 not found error code
    console.log("404 status");
    respondJSON(request, response, 404, responseJSON);
  };
  

  module.exports = {
    success,
    badRequest,
    notFound,
  };