const fs = require('fs');
const User = require("../models/user")

function logReqRes(filename){
    return (req,res,next) => {
         fs.appendFile(
            filename,
            `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
            (err,data) => {
                next();
            }
         )
    }
}

function checkingDubEmail() {
    return (req, res, next) => {
        console.log("This is middleware 2");
        
        if (req.method === "POST") {
          // Check if email is already registered in the database
          User.find()
            .then((users) => {
              const userExists = users.some(user => user.email === req.body.email);
              if (userExists) {
                // If email is found, send response and stop further execution
                return res.json({ msg: "This email id is already registered" });
              }
              // If email is not found, continue to the next middleware
              next();
            })
            .catch((err) => {
              console.log("Error in middleware:", err);
              res.status(500).json({ msg: "Internal Server Error" });
            });
        } else {
          // If it's not a POST request, proceed with the next middleware
          next();
        }
      }
}

module.exports = {
    logReqRes,
    checkingDubEmail
}