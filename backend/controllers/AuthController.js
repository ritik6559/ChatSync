import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
}

export const signUp = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send("Email and password are required");
        }

        const user = await User.create({email, password})

        res.cookie("jwt", createToken(email, user._id), {
            maxAge: maxAge,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });

        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });
    } catch(error){
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const login = async(req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send("Email and password are required");
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send("User does not exist");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).send("Invalid Credentials");
        }

        res.cookie("jwt", createToken(email, user._id), {
            maxAge: maxAge,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        });
    } catch(error){
        return res.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (req, res, next) => {
    try{
        const userId = req.userId;
        const user = await User.findById( userId );
        if(!user){
            return res.status(404).send("User not found");
        }

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        });
    } catch(error){
        return res.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (req, res, next) => {}