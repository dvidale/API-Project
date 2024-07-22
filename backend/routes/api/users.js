const express = require('express')
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('First Name is required.'),
  check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Last Name is required.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
    check('email')
    .custom( email =>{
      return User.findOne({
        where:{
          email
        }
      }).then(()=> {return Promise.reject('Email must be unique.')})
    } ),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username must be 4 characters or more.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('username')
    .custom( username =>{
      return User.findOne({
        where:{
          username
        }
      }).then(()=> {return Promise.reject('Username must be unique.')})
    } ),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post( '/', validateSignup, async (req, res) => {

      const { firstName, lastName, email, username, password } = req.body;

//DONE: write error logic and responses for duplicate email and duplicate username to match README

//check if email already exists in the database

const emailCheck = await User.findOne({
  where:{
    email
  }
})

if(emailCheck){
  res.status(500)
  return res.json({
    "message": "User already exists",
    "errors": {
      "email": "User with that email already exists."
    }
  })
}

//check is username already exists in the database

const usernameCheck = await User.findOne({
  where:{
    username
  }
})

if(usernameCheck){
  res.status(500)
  return res.json({
    "message": "User already exists",
    "errors": {
      "username": "Username must be unique."
    }
  })
}


      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create(
        { 
          firstName,
          lastName,
          email, 
          username, 
          hashedPassword 
        });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
     await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );




module.exports = router;