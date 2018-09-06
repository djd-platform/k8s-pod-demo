const http = require('http');
const uuid = require('uuid/v4')();
const uaParser = require('ua-parser-js');
const version = 'version 1';

const visitHistory = [];

const html = visitHistory => {
  const visitHistoryTable = visitHistory.map(({time, address, userAgent}) => `<br />${time}: ${address} (${userAgent})`).join('')

  return `
  <html>
    <head>
      <title>K8s Pod Demo</title>
    </head>
    <body style="background-color: #faa;">
      <p>Version: ${version}</p>
      <p>UUID: ${uuid}</p>
      <p>Visits: ${visitHistoryTable}</p>
    </body>
  </html>
  `;
}

const server = http.createServer((request, response) => {
  if(request.url === '/'){
    const { browser, os } = new uaParser().setUA(request.headers['user-agent']).getResult();
    const visit = {
      time: (new Date()).toLocaleString(),
      address: request.connection.remoteAddress,
      userAgent: `${browser.name} | ${os.name}`
    }
    console.log(visit)
    visitHistory.push(visit);
  }
  response.writeHead(200, {'Content-type':'text/html'});
  response.end(html(visitHistory));
});

server.listen(4000, () => console.log('listening'))
