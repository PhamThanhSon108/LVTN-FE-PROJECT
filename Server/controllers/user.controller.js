import User from '../models/user.model.js';
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

const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
    });

    if (user) {
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
    }
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
const userController = { login, register, getProfile, updateProfile, getUsersByAdmin };
export default userController;
