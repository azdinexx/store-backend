const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const {
    email,
    pwd,
    roles,
    fullName,
    PhoneNumber,
    BillingAddress,
    ShippingAddress,
  } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });

  // check for duplicate usernames in the db
  const duplicates = await User.findOne({ email: email }).exec();
  if (duplicates) return res.sendStatus(409); //Conflict

  const newuser = new User();
  if (req.body?.email) newuser.email = req.body.email;
  if (req.body?.roles) newuser.roles = req.body.roles;
  if (req.body?.fullName) newuser.fullName = req.body.fullName;
  if (req.body?.PhoneNumber) newuser.PhoneNumber = req.body.PhoneNumber;
  if (req.body?.BillingAddress)
    newuser.BillingAddress = req.body.BillingAddress;
  if (req.body?.ShippingAddress)
    newuser.ShippingAddress = req.body.ShippingAddress;

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    newuser.email = email;
    newuser.pwd = hashedPwd;
    const result = await newuser.save();

    console.log(result);

    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
