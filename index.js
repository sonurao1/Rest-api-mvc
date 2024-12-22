
const express = require('express');
const {connectMongoDb} = require("./connections")
const userRouter = require("./routes/user")
const {logReqRes , checkingDubEmail} = require("./middlewares/index")
const app = express();
const PORT = 8000;


//connecting with mongoose
connectMongoDb("mongodb://127.0.0.1:27017/Sonu-first-app") // it returns the promise
.then(() => console.log("Connected MongoDB"))
.catch((error) => console.log("MongoDB Error: " , error))



// import  and model

//middleware - can be assume as plug-in here
app.use(express.urlencoded({extended: false}))

//custom middleware 1
app.use(logReqRes("log.txt"));

// custom middleware 2 for cheking dublicate email

app.use(checkingDubEmail());


//Routes
app.use("/api/users" , userRouter);

// app listening
app.listen(PORT , () => console.log(`Server started! at PORT: ${PORT}`))