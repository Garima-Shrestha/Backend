import z from "zod";
import { UserSchema } from "../types/user.type";
import path from "path";

export const CreateUserDto = UserSchema.pick( // reuse schema
    {
        username: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
    }
).extend ( // add new attribute to schema
    {
        confirmPassword: z.string().min(6),
    }
).refine( // custom validation
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassowrd"],
    }
);

export type CreateUserDto = z.infer<typeof CreateUserDto>