// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (user) {
      if (
        req.body.email == user.email &&
        req.body.password == decryptPassword
      ) {
        var token = jwt.sign(
          { success: true, email: user.email, name: user.name },
          "secretkey"
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(500).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "user not found" });
    }
  } else {
    res.status(400).json({ error: "These method is not applicable" });
  }
};

export default connectDb(handler);
