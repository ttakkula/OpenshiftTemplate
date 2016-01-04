var express = require('express');
var mongoose = require('mongoose');

var app = express();

//Configure mongodb
var db_name = 'template';
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

//You need to define these two variables with these
//two environment variables to get you app work in openshift
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//When this server is connected, return the index.html as response
app.get('/',function(req,res){
    
    //Now connect with configuration
    mongoose.connect(mongodb_connection_string, function(err,pass){

        if(err){
            res.send(err.message);
        }
        else{

            res.send('Your database is running in:' + mongodb_connection_string);
        }
    });
});


//Listen the given port in given ip address
app.listen(port,ip);