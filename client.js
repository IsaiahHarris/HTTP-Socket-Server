const net = require('net');
const port = 8080;
const client = net.createConnection(port, 'localhost', ()=>{
  process.argv.forEach((value,index)=>{
    let wantedFile = process.argv[2];
    let indexOfHTML = wantedFile.indexOf('/');
    let requestedHTML = wantedFile.substring(indexOfHTML, wantedFile.length);  
    client.write(`GET ${requestedHTML} HTTP/1.1`)
  })

})



client.on('data', (data) => {
  console.log(data.toString().trim());

})
client.on('end',()=>{
  console.log('connection ended');
})
// process.stdout.pipe(client);  

client.on('error', ()=>{
  process.exit();
})