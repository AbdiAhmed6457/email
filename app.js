const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/bb5e9ac431";
  const options = {
    method: "POST",
    url: url,
    auth: {
      username: "abdi",
      password: "6c6c1cc29f41bcf53ae451fd5360bf75-us21"
    },
    headers: {
      "Content-Type": "application/json"
    },
    data: jsonData
  };

  axios(options)
    .then(function(response) {
      console.log(response.data);
      res.sendFile(__dirname + "/success.html"); // Send success response to client
    })
    .catch(function(error) {
      console.error("Error subscribing:", error);
      res.status(500).sendFile(__dirname + "/failure.html"); // Send error response to client
    });
});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("The server is listening on port 3000...");
});

//6c6c1cc29f41bcf53ae451fd5360bf75-us21
//bb5e9ac431




// const express = require("express")
// const https = require("https")
// // const request = require("request")
// const app = express();
// const bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static("public"))

// app.get("/", function(req, res){

// res.sendFile(__dirname + "/signup.html")
// })

// app.post("/", function(req, res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
// var data = {
//     members: [{
//          email_address: email,
//         status: "subscribed",
//         merge_fields: {
//             FNAME: firstName,
//             LNAME: lastName
//         }
//     }
//     ]
// }
//        const jsonData = JSON.stringify(data);
//        const url = "https://us21.api.mailchimp.com/3.0/lists/bb5e9ac431"
//        const options = {
//         method: "POST",
//         auth: "abdi:9e9dbe78dc77c3e573d3678cb05ab49e-us21"
//        }

//       const request = https.request(url, options, function(response){
//           response.on("data", function(data){
//             console.log(JSON.parse(data));
//           })
         

//        })

//         request.write(jsonData)
//           request.end()

//  })



// app.listen(3000, function(){
//     console.log("the server is listening to 3000...")
// })

// // 9e9dbe78dc77c3e573d3678cb05ab49e-us21
// // bb5e9ac431