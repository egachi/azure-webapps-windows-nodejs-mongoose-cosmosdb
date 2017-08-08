var express = require('express')
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    config = require('./config'),
    app = express();

    mongoose.Promise = global.Promise;

    //If you use mongoose < 4.11.0 --Start
    //mongoose.connect(config.client.cosmosdb.uri);
    //If you use mongoose < 4.11.0 --End

    //If you use mongoose >= 4.11.0 --Start
    mongoose.connect(config.client.cosmosdb.uri, {useMongoClient: true}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log('Connected to the database successfuly.');
      }
    });
    //If you use mongoose >= 4.11.0 --End

    mongoose.connection.on('connected', function () {
      console.log('Connected: MongoDB was connected at: ' + moment().format());
    });
    mongoose.connection.on('error',function (err) {
      console.log('Error: MongoDb connection error: ' + err + " at: " +  moment().format());
    });
    mongoose.connection.on('disconnected', function () {
      console.log('Disconnected: MongoDb was disconnected at: ' +  moment().format());
    });
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Disconnected: MongoDB was disconnected through app termination at: ' + moment().format());
        process.exit(0);
      });
    });

    //NodeJS process
    app.listen(config.port, function(){
        console.log('Connected: Listening on: ' + config.port );
    });

    //Middleware
    app.use(bodyParser.json());

    //Use routes
    require('./routes/')(app);
