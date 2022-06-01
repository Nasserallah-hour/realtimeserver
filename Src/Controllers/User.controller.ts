// import express from "express";
// import UserDA from "../../DA/common-module/user.da";
// import Validations from "../../helpers//validations";
// import mailer from "../../helpers/Mailer";
// import { IUser } from "../../models/common-module/user.model";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const shortid = require('shortid');
// export default class UserController {
//   constructor(private User: UserDA) {}

//   GetUser = async (req: express.Request, res: express.Response) => {
//     try {
//       const result = await this.User.findOne({ _id: req.params.id });

//       // HTTP Response
//       res.send(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };


  
//   GetAllUsers = async (req: express.Request, res: express.Response) => {
//     try {
//       const result = await this.User.find();

//       // HTTP Response
//       res.send(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };



//   CreateUser = async (req: express.Request, res: express.Response) => {
//     const body: IUser = req.body;

//     try {
//       // Validations and password encryption
//       // Validate json
//       const isValidData = Validations.validateSignupData(body);

//       if (isValidData.error)
//         return res.send(isValidData.error.details.map((el) => el.message));

//       // Check if user is already signed up
//       const exists = await this.User.findOne({ email: body.email });
//       if (exists) return res.send("User already exists");

//       // Encrypt password here
//       const salt = await bcrypt.genSalt(12);
//       const encryptedPassword = await bcrypt.hash(body.password,salt);
//       const confirmationCode = shortid(6);
//       const dataWithEncryptedPassword: IUser = {
//         ...body,
//         password: encryptedPassword,
//         confirmationcode:confirmationCode
//       };

//       // Insertion
//       const result = await this.User.create(dataWithEncryptedPassword);

//       //Send mail with confirmation
//       mailer(body.email,"Account confirmation code","Your confirmation code is "+confirmationCode)
//       // HTTP Response
//       if(result)res.status(200).send("Account successfully created");
      
//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };



//   LoginUser = async (req: express.Request, res: express.Response) => {
//     const body: IUser = req.body;
// try{
//     // Validations and password encryption
//       // Validate json
//       const isValidData = Validations.validateSignupData(body);

//       if (isValidData.error)
//         return res.send(isValidData.error.details.map((el) => el.message));

//       // Check if user is already signed up
//       const exists = await this.User.findOne({ email: body.email });
//       if (!exists) return res.send("User doesn't exist");

//       //Check for password
//       const ValidPass = await bcrypt.compare(req.body.password,exists.password);
//       if (!ValidPass) {
//           return res.status(400).send("Password Wrong " + ValidPass);
//       }
//       //check if user account is activated
//       if(exists.activated=="false") return res.send("Account is not activated");

//       //creating the token
//       const token= jwt.sign({_id: exists._id},process.env.TOKEN_SECRET);
//       // HTTP Response
//       res.status(200).send({token});

//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };


//   ActivateUser = async (req: express.Request, res: express.Response) => {
//     const body: IUser = req.body;
// try{
  

//       // Check if user is already signed up
//       const exists = await this.User.findOne({ email: body.email });
//       if (!exists) return res.send("User doesn't exist");

//       //Check for password
//       const ValidPass = await bcrypt.compare(req.body.password,exists.password);
//       if (!ValidPass) {
//           return res.status(400).send("Password Wrong");
//       }

//       //check if user account is activated
//       if(exists.activated=="True") return res.send("Account is not already activated");

//       //Check the confirmationcode
//       if (exists.confirmationcode == body.confirmationcode) {
//         const result = await this.User.updateOne({email:body.email}, {activated:"True"});
//         return res.status(200).send("Account succssefully activated");
//       }
//       else{
//         return res.status(400).send("Please check your confirmation code");
//       }

//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };





//   UpdateUser = async (req: express.Request, res: express.Response) => {
//     const { filter, update } = req.body;

//     try {
//       // Update
//       const result = await this.User.updateOne(filter, update);

//       // HTTP Response
//       res.send(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send((err as any).toString());
//     }
//   };

//   TestUser = (req: express.Request, res: express.Response) => {
//     res.send("UserController is working...");
//   };
// }
