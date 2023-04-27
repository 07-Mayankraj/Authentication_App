require('dotenv').config();
const express = require('express')
const app = express();
const { dbconnection } = require('./configs/db');
const { userRouter } = require('./routes/user.route');
const { auth } = require('./middleware/auth.middleware');
const { UserModel } = require('./models/user.model');
const port = process.env.port || 8080;



// middlewares 
app.use(express.json())
// home route 

app.get("/", (req, res) => res.send(`<button style="font-size:3rem;padding :20px 50px"> Authentication App </button>`))

// routes
app.use("/user", userRouter)

// authentication 
app.use(auth) 

// get user deails
app.patch("/updateProfile", async (req, res) => {
    let id = req.body.userId;
    let updated = req.body;
    try {
        const user = await UserModel.findOneAndUpdate(id, updated)
        res.status(200).send("user updated")
    }
    catch (error) {
   
        res.send({ err: error.message })

    }
})


app.get("/getProfile", async (req, res) => {
    let id = req.body.userId;
    console.log(id);
    try {
        const user = await UserModel.findById(id)
        console.log(user);
        let newuser = {
            _id: user._id,
            profile: user.profile,
            name: user.name,
            bio: user.bio,
            phone: user.phone,
            email: user.email,
        }

        res.status(200).send(newuser);
        res.send(newuser)
    }
    // removing password
    catch (error) {
        res.status(400).send(error.message)
    }
})


app.listen(port, () => {
    try {
        dbconnection
        console.log('server listening on port ' + port,);
    } catch (error) {
        console.log(error.message);
    }
})
