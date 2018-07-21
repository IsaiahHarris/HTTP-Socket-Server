const net = require('net');

const client = new net.Socket();
const port = 8080;
client.on('data', (data) => {
  console.log(data.toString().trim());
})
client.connect(port, () => {
  console.log('client connected');
})
process.stdout.pipe(client);