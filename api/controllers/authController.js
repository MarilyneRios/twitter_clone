import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    //1 validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    //2 vérif si user existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    //3 vérif si user existe
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    //Longueur du password min 10 caractères
    if (password.length < 10) {
      return res
        .status(400)
        .json({ error: "Password must be at least 10 characters long" });
    }

    //crypter le password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // création du user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    // enregistrer un nouvel utilisateur dans votre base de données 
    if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
	res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signin = async (req, res, next) => {
  res.json({
    data: "the signin endpoint",
  });
};

export const signout = (req, res) => {
  res.json({
    data: "the signout endpoint",
  });
};
