var express = require("express");
var app = express();
var request = require("request");



app.set("view engine","ejs");
app.use(express.static("public"));



var parseddata = {};
var data = 0;
request("https://api.coindesk.com/v1/bpi/currentprice.json",function(error,response,body)
{
    
    if(!error && response.statusCode==200)
    { parseddata=(JSON.parse(body));
      data= (parseddata["bpi"]["USD"]["rate"]);
      console.log("first"+parseddata["bpi"]["USD"]["rate_float"]);
    
}
});




app.get("/",function(req,res)
{
  
    request("https://api.coindesk.com/v1/bpi/currentprice.json",function(error,response,body)
    {
         
                if(!error && response.statusCode==200)
                    {   parseddata=(JSON.parse(body));
                        data= (parseddata["bpi"]["USD"]["rate"]);
                        console.log("new",parseddata["bpi"]["USD"]["rate_float"]);
                        res.render("index",{data:data});
                    }
                });
 
});

//server up

app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("server is up!");
});