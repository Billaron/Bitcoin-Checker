var express = require("express");
var app = express();
var request = require("request");
var mongoose = require("mongoose");




app.set("view engine","ejs");
app.use(express.static("public"));


var oldataSchema = new mongoose.Schema({
    
    date: String,
    price: Number
});


var parseddata = {};
var data = 0;
var oldata=[] ;
request("https://api.coindesk.com/v1/bpi/currentprice.json",function(error,response,body)
{
    
    if(!error && response.statusCode==200)
    { parseddata=(JSON.parse(body));
      data= (parseddata["bpi"]["USD"]["rate"]);
      console.log("first"+parseddata["bpi"]["USD"]["rate_float"]);
    
}
});
request("https://api.coindesk.com/v1/bpi/historical/close.json",function(error,response,body)
{
    
    if(!error && response.statusCode==200)
    {parseddata=(JSON.parse(body));
     oldata = (parseddata["bpi"]);
     console.log("yestfirst"+oldata);
     console.log(JSON.stringify(oldata));
     console.log(oldata);
    
}
});



app.get("/",function(req,res)
{
  
    request("https://api.coindesk.com/v1/bpi/currentprice.json",function(error,response,body)
    {
          request("https://api.coindesk.com/v1/bpi/historical/close.json",function(error,response,body)
                {
                    
                    if(!error && response.statusCode==200)
                    { parseddata=(JSON.parse(body));
                      oldata= (parseddata["bpi"]);
                      console.log("yesterday"+parseddata["bpi"]);
                    
                      }
                });
                if(!error && response.statusCode==200)
                    {   parseddata=(JSON.parse(body));
                        data= (parseddata["bpi"]["USD"]["rate"]);
                        console.log("new",parseddata["bpi"]["USD"]["rate_float"]);
                        res.render("index",{data:data,oldata:oldata});
                    }
                });
 
});

//server up

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server is up!");
});