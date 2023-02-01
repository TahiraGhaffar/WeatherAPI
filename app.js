const express = require("express");//install  externally express 
const https = require("https"); //import https module from NODE(not installes externally. it's built-in in NODE)
const bodyParser = require("body-parser");//install externally using nmp i body-parser

const app = express();

app.use(bodyParser.urlencoded({extended:true})); //bodyparser parses the content from HTML file to the SERVER

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    // console.log(req.body.cityName);
const query= req.body.cityName; //gets cityName from html file entered by USER as INPUT
const apiKey= "f156a1643f516e6a437ff7e6cbd815d1";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+ apiKey; //request appended in url
// inside 'query' req.body.cityName

https.get(url, function(response) {
console.log(response.statusCode);

response.on("data", function(data){ //response.on("data") means that to give response ON RECEIVING DATA from HTML FIlE
const WeatherData= JSON.parse(data); //to parse datab into JSON FORMAT, otherwise showing data in HEX FORMAT

const temp = WeatherData.main.temp;
const weatherdesc = WeatherData.weather[0].description;
const icon = WeatherData.weather[0].icon;
const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";

res.write("<p>The current weather is "+ weatherdesc+ "</p>"); //write() used to show response on WEBPAGE b/c can't have
// more than 1 "send()" inside 1 "response.on() method"
res.write("<h1>Current Temperature is "+ temp+ "degrees Celsius</h1>");
res.write("<img src=" +imageURL+ ">");
res.send();

});
});
});

app.listen(5001, function(){
    console.log("Server is running on port 5001");
});