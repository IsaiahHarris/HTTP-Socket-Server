const sourceFiles = require('./sourcefiles');


const net = require('net');

const server = net.createServer((connection)=>{

  connection.setEncoding('utf8');

  connection.on('data', (data)=>{
    getDaStuffs(data);
  })
});

server.listen(8080, ()=>{
  console.log('port 8080'+ '\n');
})

function getDaStuffs (data){
  let request = data.split('\r\n');
  let method = request[0].split(' ');
  console.log(method);
  if(method[1] === '/' || method[1] === '/index.html'){
    console.log(sourceFiles.index);
  }else if(method[1] === '/helium'){
    console.log(sourceFiles.helium);
  }
}


