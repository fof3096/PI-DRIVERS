const server = require("./src/server");
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
server.listen(3001, () => {
  console.log("Server listening on port 3001");
})
}).catch(error => console.error(error))
