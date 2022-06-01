// import Joi from "joi";
// import { Role } from "../../utility/user.utilities";

// const subscriptionSchema = Joi.object({
//   socialMediaId: Joi.string().min(1).required(),
//   socialMediaToken: Joi.string().min(1).required(),
//   socialMediaSource: Joi.string().min(1).required(),
// });

// const emailRegisterSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).max(16).required(),
//   firstName: Joi.string().min(2).max(50),
//   lastName: Joi.string().min(2).max(50),
//   birthday: Joi.date(),
//   phone: Joi.string(),
//   address: Joi.string(),
//   website: Joi.string(),
//   clubRef: Joi.string(),
//   role: Joi.string().valid(...Object.values(Role)),
//   moduleRef: Joi.array(),
// });

// export function validateSubscription(data: any) {
//   return subscriptionSchema.validate(data, {
//     allowUnknown: true,
//     abortEarly: false,
//   });
// }

// export function validateSignupData(data: any) {
//   return emailRegisterSchema.validate(data, { abortEarly: false });
// }
