//returns the response data to the server
const respondJSON = (request, response, status, object, acceptedTypes) => {
    
    response.writeHead(status, { 'Content-Type': acceptedTypes[0]});

    //if we want XML back write back an XML obj, else return JSON
    if(acceptedTypes[0] === 'text/xml'){
        const responseXML = 
        `<response><message>${object.message}</message></response>`;
        response.write(responseXML);
    }
    else{
        const responseJsonObj = JSON.stringify(object);
        response.write(responseJsonObj);
    }

    response.end();
  };

  
  //function to show a success status code
  const success = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'This is a successful response',
    };


    respondJSON(request, response, 200, responseJSON, acceptedTypes);
  };
  
  //function to show a bad request without the correct parameters
  const badRequest = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    if(!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';

      //if we are missing params send a missing params status code
      return respondJSON(request, response, 400, responseJSON, acceptedTypes);
    }
  
    //if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON, acceptedTypes);
  };
  
  //function to show not found error
  const notFound = (request, response, acceptedTypes) => {
    //error message with a description and consistent error id
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    //return our json with a 404 not found error code
    respondJSON(request, response, 404, responseJSON, acceptedTypes);
  };
  

  module.exports = {
    success,
    badRequest,
    notFound,
  };