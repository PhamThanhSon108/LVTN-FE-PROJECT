import dotenv from 'dotenv';
import schedule, { scheduleJob } from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model.js';
import { sendMail } from '../utils/nodemailler.js';

dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt,
            address: user.address,
            city: user.city,
            country: user.country,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
};

const register = async (req, res, next) => {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const emailVerificationToken = uuidv4();
    const user = await User.create({
        name,
        email,
        phone,
        password,
        emailVerificationToken,
    });
    const url = `http://localhost:${process.env.PORT}/api/user/auth/verify-email/?token=${emailVerificationToken}`;
    const html = `<a href="${url}" target="_blank"><b>Click đi đừng ngại</b></a>`;
    //start cron-job
    let scheduledJob = schedule.scheduleJob(`*/${process.env.EMAIL_VERIFY_EXPIED_TIME_IN_MINUTE} * * * *`, async () => {
        console.log('Job run');
        const foundUser = await User.findOneAndDelete({ _id: user._id, isVerified: false });
        console.log(foundUser);
        scheduledJob.cancel();
    });
    //set up message options
    const messageOptions = {
        recipient: user.email,
        subject: 'Verify Email',
        html: html,
    };
    //send verify email
    try {
        await sendMail(messageOptions);
        res.status(200);
        res.json('Sending mail successfully');
    } catch (error) {
        next(error);
    }
    /* if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            address: user.address,
            city: user.city,
            country: user.country,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    } */
};

const verifyEmail = async (req, res) => {
    const emailVerificationToken = req.query.token;
    const user = await User.findOne({ emailVerificationToken: emailVerificationToken });
    if (!user) {
        res.status(400);
        throw new Error('Email verification token is not valid');
    }
    const verifiedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { emailVerificationToken: null, isVerified: true },
    );
    if (!verifiedUser) {
        res.status(500);
        throw new Error('Failed to validate email verification token');
    }
    res.status(200);
    res.json('Your email has been verified');
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            address: user.address,
            city: user.city,
            country: user.country,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.city = req.body.city || user.city;
        user.country = req.body.country || user.country;

        if (req.body.password) {
            if (await user.matchPassword(req.body.oldPassword)) {
                user.password = req.body.password;
            } else {
                res.status(404);
                throw new Error('Old Password is not correct!');
            }
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            token: generateToken(updatedUser._id),
            address: user.address,
            city: user.city,
            country: user.country,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const getUsersByAdmin = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};
const userController = { login, register, getProfile, updateProfile, getUsersByAdmin, verifyEmail };
export default userController;
