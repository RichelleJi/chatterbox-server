var data = {};
data.results = [];

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = function(request, response) {

  
  var statusCode = 200;
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = '`application/json`';


  response.writeHead(statusCode, headers);

  request.on('error', (err) => {
    statusCode = 404;
  });
  // console.log(request);
  if (request.url === '/classes/messages' && request.method === 'GET') {
    response.end(JSON.stringify(data)); 
  }
  if (request.url === '/classes/messages' && request.method === 'POST') {
    statusCode = 201;
    request.on('data', (message) => {
      data.results.push(JSON.parse(message));
    });
    response.end(JSON.stringify(data)); 
  }

  // response.end(JSON.stringify(data));
};




