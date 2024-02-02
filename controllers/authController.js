
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}


exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("please add a password", 403));
        }

        //check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}






// const nodemailer = require('nodemailer');

// // Configure the transporter for NodeMailer
// const transporter = nodemailer.createTransport({
//     service: 'YourEmailService', // e.g., 'gmail'
//     auth: {
//         user: 'yourEmail@example.com',
//         pass: 'yourPassword'
//     }
// });

// // Function to send the verification email
// const sendVerificationEmail = async (user) => {
//     // Assuming 'generateVerificationToken' is a method of your User model
//     const verificationToken = user.generateVerificationToken(); 

//     const mailOptions = {
//         from: 'yourEmail@example.com',
//         to: user.email,
//         subject: 'Email Verification',
//         html: `<p>Click <a href="http://yourdomain.com/verify/${verificationToken}">here</a> to verify your email</p>`
//     };

//     await transporter.sendMail(mailOptions);
// };

// exports.signup = async (req, res, next) => {
//     const { email } = req.body;
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//         return next(new ErrorResponse("E-mail already registered", 400));
//     }
//     try {
//         const user = await User.create(req.body);

//         // Send verification email
//         await sendVerificationEmail(user);

//         res.status(201).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.signin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         // Validation
//         if (!email) {
//             return next(new ErrorResponse("Please add an email", 403));
//         }
//         if (!password) {
//             return next(new ErrorResponse("Please add a password", 403));
//         }

//         // Check user email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return next(new ErrorResponse("Invalid credentials", 400));
//         }

//         // Check if email is verified
//         if (!user.isEmailVerified) {
//             return next(new ErrorResponse("Email not verified. Please check your inbox.", 401));
//         }

//         // Check password
//         const isMatched = await user.comparePassword(password);
//         if (!isMatched) {
//             return next(new ErrorResponse("Invalid credentials", 400));
//         }

//         sendTokenResponse(user, 200, res);

//     } catch (error) {
//         next(error);
//     }
// }

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true,
            role: user.role
        })
}


// log out
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}


// user profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}