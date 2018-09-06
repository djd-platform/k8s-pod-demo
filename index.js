const http = require('http');
const uuid = require('uuid/v4')();
const version = 'version 1';

const html = `
<html>
  <body style="background-color: #faa;">
    <p>Version: ${version}</p>
    <p>UUID: ${uuid}</p>
  </body>
</html>
`
const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-type':'text/html'});
  response.write(html);
  response.end();
});

server.listen(4000, () => console.log('listening'))
