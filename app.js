var express = require('express');
var app = express();
const api_helper= require('./api_helper');
var bodyParser = require('body-parser');


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.json());       app.use(express.urlencoded());
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Node server is running.. on port 3000');
});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/assets',express.static('assets'));
app.get('/', function(req,res){
    res.sendFile('./views/index.html',{root:__dirname});
});


//get request to display hello world
app.get('/hello', function(req,res){
    res.sendFile('./views/helloworld.html',{root:__dirname});
});



//Post request that takes input from the form and calculates the distance between the two cities.
app.post('/calculate',function(req,res){
    
    var city1= req.body.city1name;
    var city1_arr=city1.split(',');
    var city1_mod = city1_arr[0].concat(',',city1_arr[1]);
    var city2=  req.body.city2name;
    var city2_arr=city2.split(',');
    var city2_mod = city2_arr[0].concat(',',city2_arr[1]);
    console.log(city1_mod);

    var url= 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+city1_mod+'&destinations='+city2_mod+'&key=AIzaSyD3gAqDtq_BvjBLq7mIOx7LV90cy2b5mcQ';
    api_helper.make_API_call(url)
    .then(response=>{
        var distance=response.rows[0].elements[0].distance.text
        var result="The distance between the origin: "+city1_mod+" and the destination: "+city2_mod+"is "+distance;
        res.send(result);
    })
    .catch(error => {
        res.send(error)
    })




})