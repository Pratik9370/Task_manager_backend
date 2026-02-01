const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const user = require('../models/User')
const fetchUser = require('../middleware/fetchUser')
const task = require('../models/Task')

router.post("/signup", async (req, res) => {

    try {
        let User = await user.findOne({ email: req.body.email })
        if (User) {
            return res.status(400).json({ message: "User with this email already exist" })
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        User = await user.create({
            email: req.body.email,
            password: hash
        })

        const token = jwt.sign({ email: User.email }, 'shhhhh');
        res.cookie("auth-token", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message:'Signup successful' })

    } catch (error) {
        error => {
            console.log(error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        let User = await user.findOne({ email })

        if (!User) {
            return res.status(400).json({ message: 'Something went wrong' })
        }

        const isValid = await bcrypt.compare(password, User.password)

        if (!isValid) {
            return res.status(400).json({ message: 'Something went wrong' })
        }

        const token = jwt.sign({ email: User.email }, 'shhhhh');
        await res.cookie("auth-token", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ message: "Logged in successfully", token: token })
    } catch
    (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error })
    }
})

router.get("/getUser", fetchUser, async (req, res) => {
    try {
        const userTasks = await task.find({ user: req.user._id });
        res.status(200).json({ tasks: userTasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/logout", fetchUser, (req, res) => {
  res.clearCookie("auth-token", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ message: "Logged out" });
});



module.exports = router