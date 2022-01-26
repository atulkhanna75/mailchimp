const express = require("express");
const https= require("https");
const bodyParser=require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
  });


app.post ("/", function(req,res){
  const firstName=req.body.firstName;
  const lastName=req.body.lasttName;
  const email = req.body.email;
  console.log(email);
  const data={
        members:[
          {
            email_address: email,
            status: "subscribed",
            merge_fields:{
              FNAME:firstName,
              LNAME:lastName,
                  }
          }
        ]
  }
  const jsonData=JSON.stringify(data);

  const url="https://us20.api.mailchimp.com/3.0/lists/4bcf3cbb34";
  const options={
    method: "POST",
    auth: "Atul:959c92d4c2ffebfb64e99f091c889aa4-us20",
  }

  const request=https.request(url, options, function(response){
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });


app.post("/failure", function(req,res){
  res.redirect("/");
});
request.write(jsonData);
request.end();

  https.get(url, function(response){
    if(response.statusCode===200) {
      res.sendFile(__dirname+"/Success.html");
    }
    Else(res.sendFile(__dirname+"Failure.html"))
      });

});

app.listen(process.env.PORT ||3000, function(){
  console.log("server at port 3000");
});
