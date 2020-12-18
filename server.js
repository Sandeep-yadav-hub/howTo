
// import app from app.js 
const app = require('./expressapp')

//  Set Port
const port = process.env.PORT ;
app.listen(port, () => console.log('server is running on port : http://localhost:' + port))


