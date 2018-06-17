const Datastore = require('nedb');
const wss = require('./socket');
const db = new Datastore({ filename: './db', autoload: true });

const connectedClients = [];

function broadcast(message, ws) {
  connectedClients.forEach((client) => {
    if (client !== ws) {
      client.send(JSON.stringify(message))
    }
  });
}

wss.on('connection', (ws) => {
  connectedClients.push(ws);
  db.find({}).sort({ timestamp: 1 }).exec((err, docs) => {
    ws.send(JSON.stringify({
      type: 'history',
      messages: docs.slice(-20),
    }))
  });
  ws.on('message', (m) => {
    try {
      const message = JSON.parse(m);
      if (message && message.type) {
        switch (message.type) {
          case 'message':
            if (message.name && message.string) {
              message.timestamp = Date.now();
              db.insert(message);
              broadcast(message);
            }
          default:
            console.log('Got unknown message type:', message.type)
        }
      }
    } catch (e) {
      console.log('Ooops', e)
    }
  });

  ws.on('close', () => {
    const index = connectedClients.indexOf(ws);
    if (index > -1) {
      connectedClients.splice(index, 1);
    }
  });
});
