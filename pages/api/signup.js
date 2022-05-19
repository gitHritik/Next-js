// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let u = await User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString(),
    });
    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "These method is not applicable" });
  }
};

export default connectDb(handler);
