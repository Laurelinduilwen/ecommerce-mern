import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //1) validate name email and password
    if (!isLength(name, { min: 3, max: 20 })) {
      return res.status(422).send('Name must be 3-20 characters long');
    } else if (!isLength(password, { min: 8 })) {
      return res.status(422).send('Password must be at least 8  characters');
    } else if (!isEmail(email)) {
      return res.status(422).send('Email must be valid');
    }

    // 2) Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // 3) --if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    // 4) create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    /* console.log({ newUser }); */
    //5)Create a cart for new use
    await new Cart({ user: newUser._id }).save();

    // 5) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    // 6) send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up user. Please try again later');
  }
};
