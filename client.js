const net = require('net');
const port = 8080;
const host = '0.0.0.0';
const client = net.createConnection(port, 'localhost', ()=>{

  if (!process.argv[2]) {
    process.stdout.write(`try ending in /helium or just /`);
    process.exit();
  }


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
 

client.on('error', ()=>{
  process.exit();
})