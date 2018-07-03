var data = {};
data.results = [];

var start = {
  username: "hi",
  text: "sup", 
  objectId: 1, 
  roomname: "lobby"
};

data.results.push(start);

var objID = 2;
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  
  var statusCode = 200;
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';
  // console.log(request.url)
  // console.log(request);
  // response.writeHead(statusCode, headers);
  // if (!request.url.includes('/classes/messages') || request.url !== '/') {
  //   statusCode = 404;
  //   response.writeHead(404);
  //   response.end();
  // }
  if (request.url === '/classes/messages') {
    if (request.method === 'GET' || request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(data)); 
    } else if (request.method === 'POST') {
      // statusCode = 201;
      request.on('data', (message) => {
        response.writeHead(201, headers);
        var parsed = JSON.parse(message);
        parsed.objectId = objID; 
        objID ++;
        data.results.push(parsed);
      }).on('end', () => {
        response.end(JSON.stringify(data)); 
      });
    } 
  } else {
    response.writeHead(404, headers);
    response.end();
  }
  request.on('error', () => {
    response.writeHead(404, headers);
    response.end();
  });
};

exports.requestHandler = requestHandler;




