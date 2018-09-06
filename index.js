const http = require('http');
const uuid = require('uuid/v4')();
const uaParser = require('ua-parser-js');

const version = '1.0';
const versionColours = {
  '1.0': 'lightgreen',
  '1.1': 'pink',
  '1.2': 'lightblue',
  '1.3': 'yellow',
  '1.4': 'mediumpurple'
};

const visitHistory = [];

const makeResponse = request => {
  if(request.url === '/'){
    const uaObj = new uaParser().setUA(request.headers['user-agent']).getResult();
    const time = (new Date()).toLocaleString();
    const address = request.connection.remoteAddress;
    const userAgent = `${uaObj.browser.name}: ${uaObj.os.name}`;
    const visit = { time, address, userAgent };
    console.info(visit);
    visitHistory.push(visit);
  }
  const visitHistoryTable = visitHistory
    .map((visit, i) => `${i+1}. ${visit.time} | ${visit.address} | (${visit.userAgent})`)
    .join('<br />')

  return `
  <html>
    <head><title>K8s Pod Demo</title></head>
    <body style="background-color: ${versionColours[version]};">
      <p>Version:<br />${version}</p>
      <p>UUID:<br />${uuid}</p>
      <p>Visits:<br />${visitHistoryTable}</p>
    </body>
  </html>
  `;
}

const server = http
  .createServer((request, response) => {
    response.writeHead(200, {'Content-type':'text/html'});
    response.end(makeResponse(request))
  })
  .listen(4000, () => console.log('listening'))
