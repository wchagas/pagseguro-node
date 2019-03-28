const express = require('express')
const pagseguro = require('../../src')
const config = require('../config')
const bodyParser = require('body-parser')


/**
 * initialize express
 */
const app = express();



/**
 * Middleware
 */
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'authorization, Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
	next();
});



/**
 * Connect pagseguro
 */
const client = pagseguro.connect(config)



/**
 * Hello
 */
app.get('/', function (req, res) {
    res.status(200).json({
        'app': 'Pagseguro Nodejs Example',
        'version': '1.0.0'
    })
})



/**
 * Session
 */
app.post('/session', function (req, res) {
    client.session.get()
        .then(data => res.status(data.statusCode).json(data))
        .catch(e => res.status(e.statusCode).json(e))
})



/**
 * Direct Payment
 */
app.post('/directPayment', function (req, res) {

    let method = null

    switch(req.body.method) {

        case 'CREDIT_CARD':
            method = client.transaction.creditCard
        break;

        case 'BOLETO':
            method = client.transaction.boleto
        break;

        case 'ONLINE_DEBIT':
            method = client.transaction.onlineDebit
        break;
    }

    if (!method) {
        return res
            .status(422)
            .json({
                status: 'error',
                message: 'método de pagamento não informado!'
            })
    }

    method(req.body)
        .then(data => res.status(data.statusCode).json(data))
        .catch(e => res.status(e.statusCode).json(e))
})



/**
 * Listen
 */
app.listen(3333, function () {
      console.log('Example app listening on port 3333!');
})
