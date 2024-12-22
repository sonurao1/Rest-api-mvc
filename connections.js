const mongoose = require("mongoose")

//connecting with mongoose db

async function connectMongoDb(url){
  return  mongoose.connect(url) // it returns the promise
      

}

module.exports = {
    connectMongoDb,
}