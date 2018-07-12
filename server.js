const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3001;
const productRoute = require('./src/routes/productRoute');
const orderRoute = require('./src/routes/orderRoute');

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Allow-Access-Control-Origin', '*');
    res.header('Allow-Access-Control-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, PATCH, GET');
        res.status(200).json({});
    }
    next();
});

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'home page' });
});
app.use('/products', productRoute);
app.use('/orders', orderRoute);

// Error Handeling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, 'localhost', (err) => {
    if (err) throw new Error('Something went wrong');
    console.log(`http://localhost:${port}`);
})