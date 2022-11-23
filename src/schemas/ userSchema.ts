import joi from "joi";
import { CreateUser } from "../utils/createData.js";

const signUpSchema = joi.object<CreateUser>({
  username: joi.string().min(3).required(),
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required(),
});

const signInSchema = joi.object<CreateUser>({
  username: joi.string().required(),
  password: joi.string().required(),
});

export { signInSchema, signUpSchema };
