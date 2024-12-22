const express = require("express");

const router = express.Router();

const {handleGetAllUsers,
       handleGetUsersById,
       handleDeleteUserById,
       handleUpdateUserById,
       handleCreateNewUser,

} = require("../controllers/user")






//Routes
//if the request coming from browser then we will send HTML DOC
router.get("/users" , async (req, res) => {
    const users =  await User.find({})
     const html = `
     <h1>THIS IS DOCUMENT OF ALL USERS</h1>
     <ul>
       ${users.map(user => `<li>${user.firstName} ${user.lastName} and the job title is: ${user.jobTitle} , Email: ${user.email}</li>`).join("")}
     </ul>
         
     `
     return res.send(html)
 })
 

 
//  router.get("/" , handleGetAllUsers)
//  router.post("/" , handleCreateNewUser)  both are in same route so we can merge the route

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

 
 router.route("/:id")
 .get(handleGetUsersById)
.put((req, res) => {
     // Edit user with id 
    return  res.json({status: 'pending'})
 })
 .delete(handleDeleteUserById)
 .patch(handleUpdateUserById)
 
 

 module.exports = router