//Requiring dependencies
const path = require("path");
const express = require('express');
const app = express();
var axios = require("axios").default;
var main_server="http://192.168.194.172:4000"






const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const morgan = require('morgan');
const authJwt = require('../helper/jwt');
const errorHandler = require('../helper/error-handler');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');


// app.use('/sellers', createProxyMiddleware({ target: 'http://192.168.40.172:5500/sellerindex.html', changeOrigin: true }));


app.use(cors());

app.use(bodyParser.json());

app.use(morgan('tiny'));
// app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


// app.use(cors());
// app.options('*', cors()) 
// app.use(cors({origin:true}));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})










// Requiring the config
const config = require("./config");
const port = config.port;
// Priting the config for debugging
console.log(config);

// Checking if METERED_DOMAIN is specified, otherwise throwing an error.
if (!config.METERED_DOMAIN) {
    throw new Error("Please specify the METERED_DOMAIN.\nAdd as an environment variable or in the .env file or directly specify in the src/config.js\nIf you are unsure where to get METERED_DOMAIN please read the Getting Started Guide here: https://docs.metered.ca/docs/getting-started");
}

// Check if METERED_SECRET_KEY is specified, otherwise throwing an error.
if (!config.METERED_SECRET_KEY) {
    throw new Error("Please specify the METERED_SECRET_KEY.\nAdd as an environment variable or in the .env file or directly specify in the src/config.js\nIf you are unsure where to get METERED_SECRET_KEY please read the Getting Started Guide here: https://docs.metered.ca/docs/getting-started");
}

// Serving static files in the public folder
app.use("/", express.static(path.join(__dirname, '/public')))

app.get("/validate-meeting", function (req, res) {
    /**
     * Using the Metered Get Room API to check if the 
     * Specified Meeting ID is valid.
     * https://docs.metered.ca/reference/get-room
     */
    var options = {
        method: 'GET',
        url: "https://" + config.METERED_DOMAIN + '/api/v1/room/' + req.query.meetingId,
        params: {
            secretKey: config.METERED_SECRET_KEY
        },
        headers: {
            Accept: 'application/json'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.send({
            success: true
        })
    }).catch(function (error) {
        console.error(error);
        res.send({
            success: false
        })
    });
});

app.post("/create-meeting-room", function(req, res) {
    /**
     * Using the Metered Create Room API to create a new
     * Meeting Room.
     * https://docs.metered.ca/reference/create-room
     */
    var options = {
        method: 'POST',
        url: "https://" + config.METERED_DOMAIN + '/api/v1/room/',
        params: {
            secretKey: config.METERED_SECRET_KEY
        },
        headers: {
            Accept: 'application/json'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.send({
            success: true,
            ...response.data
        })
    }).catch(function (error) {
        console.error(error);
        res.send({
            success: false
        })
    });
});

app.get("/metered-domain", function(req, res) {
    res.send({
        domain: config.METERED_DOMAIN
    });
});




mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'
})
    .then(() => {
        console.log(`Connection successful,${port}`);
    })
    .catch((err) => {
        console.log("MongoDB error", err);
    });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});