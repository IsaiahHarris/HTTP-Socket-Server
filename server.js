const sourceFiles = require('./sourcefiles');


const net = require('net');

const statusMessage = {
  good: `200 OK`,
  notFound: `404 Not Found`,
  forbidden: `403 Forbidden`,
  serverError: `500 Internal Server Error`
}

const server = net.createServer((connection) => {


  connection.setEncoding('utf8');

  connection.on('data', (data) => {
    getDaStuffs(data, connection);
  })
});

server.listen(8080, () => {
  console.log('port 8080' + '\n');
})

server.on('end', () => {
  console.log('client disconnect')
})


function getDaStuffs(data, sender) {
  let request = data.split('\r\n');
  let method = request[0].split(' ');
  let wanted = method[1];
  let versio = method[2];
  console.log(wanted);


  if (wanted === '/' || wanted === '/index.html') {
    sender.write(createHeader(sender, versio, statusMessage.good, sourceFiles.index));
  } else if (wanted === '/helium.html') {
    sender.write(createHeader(sender, versio, statusMessage.good, sourceFiles.helium));
  } else if (wanted === '/hydrogen.html') {
    sender.write(createHeader(sender, versio, statusMessage.good, sourceFiles.hydrogen));
  } else if (wanted === '/css/styles.css') {
    sender.write(createHeader(sender, versio, statusMessage.good, sourceFiles.css));
  } else {
    sender.write(createHeader(sender, versio, statusMessage.notFound, sourceFiles.fourohfour));
  }
  sender.destroy();
}


function createHeader(socket, version, status, source) {
  return `${version} ${status}
status: ${version} ${status}
server:${process.env.USER} ${process.env.TERM_PROGRAM} ${process.env.TERM_PROGRAM_VERSION}
date: ${new Date()}

${source}`

}



server.on('end', () => {
  console.log('connection ended');
});