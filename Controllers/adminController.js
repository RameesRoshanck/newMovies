const Admin=require("../Model/adminModel")
const bcrypt = require('bcrypt');


// Admin signup
const adminSignup = async (req, res) => {
    try {
      const {email, password } = req.body;
  
      if (!(email && password)) {
        return res.status(400).json({ message: "All input fields are required" });
      }
  
      let emailExist = await User.findOne({ email });
  
      if (emailExist) {
        return res.status(400).json({ message: "This email is already registered" });
      }
  
      const hash = await bcrypt.hash(password, 10);
  
      const admin = new Admin({
        email,
        password: hash,
      });
  
     const saveAdmin= await admin.save();
  
      return res.status(200).json({ message: "Successfully registered",admin:saveAdmin });
    } catch (error) {
      console.log(error, 'Signup error');
      return res.status(500).json({ message: "Internal server error" });
    }
  };


//user adminLogin
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!(email && password)) {
        return res.status(400).json({ message: "All input fields are required" });
      }
  
      let emailExist = await Admin.findOne({ email });
  
      if (emailExist) {
        let isMatch = await bcrypt.compare(password, emailExist.password);
  
        if (isMatch) {
          let admin = emailExist;

          return res.status(200).json({ message: "Successfully logged in", admin});
        } else {
          return res.status(400).json({ message: "Incorrect password" });
        }
      } else {
        return res.status(400).json({ message: "Email not found" });
      }
    } catch (error) {
      console.log("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };





module.exports={
    adminSignup,
    adminLogin
}