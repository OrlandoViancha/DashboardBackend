const express = require('express')
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const queries = require('./routes/queries');
const {connection_database} = require('./data/connection_db');
const cors = require('cors');
router.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);
app.use(cors())
app.use('/queries', queries);

app.listen(app.get('port'), () => {
 console.log(`Servidor esuchando por el puerto ${app.get('port')}`);
})
