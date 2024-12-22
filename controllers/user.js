
const User = require("../models/user")

async function handleGetAllUsers(req,res){

    try {
        const allDbUsers = await User.find({});
        // console.log(storedUser)
         res.json(allDbUsers)
      } catch (error) {
        console.log("Error: " , error)
      }
    
}

async function handleGetUsersById(req,res){
        const user = await User.findById(req.params.id)
        console.log(user)
        if(!user) return res.status(404).json({error: "user not found"})
        res.json(user)
}

async function handleDeleteUserById(req, res){
    try {
        const id = req.params.id; // Extract the ID from the route parameter
        console.log("ID to delete:", id);
    
        // NEWER VERSION: MongoDB-based approach
        const deletedUser = await User.findByIdAndDelete(id);
    
        if (!deletedUser) {
          return res.status(404).json({ msg: "User not found" }); // Handle user not found
        }
    
        console.log("User deleted from MongoDB:", deletedUser);
        res.json({ msg: "User deleted successfully", user: deletedUser });
    
       
      } catch (err) {
        console.error("Error during deletion:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
      }
}


async function handleUpdateUserById(req,res){
    try {
        const id = req.params.id; // Get the ID from the request parameter
        const body = req.body;    // Get the updated fields from the request body
    
        // Validate the input fields
        if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
          return res.status(400).json({ msg: "All fields are required." });
        }
    
        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
          id, // Match the user by ID
          { // Fields to update
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title,
          },
          { new: true, runValidators: true } // Options: return updated user and validate input
        );
    
        if (!updatedUser) {
          return res.status(404).json({ msg: "User not found." });
        }
    
        // Return the updated user
        res.json({ msg: "User successfully updated.", user: updatedUser });
    
      } catch (err) {
        console.error("Error in PATCH route:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
      }
}


async function handleCreateNewUser(req,res) {
    const body = req.body;
     if(!body ||
        !body.first_name ||
        !body.last_name ||
        !body.gender ||
        !body.email ||
        !body.job_title
     ){
       return res.status(400).json({msg: "All fields are req..."})
     }
 
     
     console.log(User)
    const  result = await User.create({
       firstName: body.first_name,
       lastName: body.last_name,
       email: body.email,
       gender: body.gender,
       jobTitle: body.job_title,
     })
     console.log(result)
     return res.status(201).json({msg:"sucess" , id: result._id})
}


module.exports = {
    handleGetAllUsers,
    handleGetUsersById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleCreateNewUser,
}