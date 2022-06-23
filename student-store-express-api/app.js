var express = require('express');
const morgan = require("morgan");
const cors = require("cors")
const storeRouter = require("./routes/store"); 
const {NotFoundError} = require("./utils/errors");


//const { NotFoundError } = require('./utils/errors');


var app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use("/store", storeRouter);
//app.use("/gift-exchange", giftRouter);
//app.use("/quiz", quizRouter);
app.get('/', function (request, response) {
    response.status(200).json({ping: "pong"});
})

app.use((req, res, next) => {
    return next(new NotFoundError())
  })
  
  /* Generic error handler - anything that is unhandled will be handled here */
  app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })
  
//app.use(function(req, res, next) {return next(new NotFoundError())});
/*app.use(function(error, req, res, next) {
    let status = error.status ? error.status : 500;
    let message = error.message ? error.message : "Something went wrong in the application";
    return res.status(status).json({error: {status: status, message: message}});
});*/




module.exports = app;
