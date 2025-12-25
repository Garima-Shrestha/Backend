import { CreateUserDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";


let userRepository = new UserRepository;

export class UserService {
    async registerUser(data: CreateUserDto) {
        // Business logic, check duplicate username/email, hash
        const checkEmail = await userRepository.getUserByEmail(data.email);
        if(checkEmail){
            throw new HttpError(409, "Email already in use");
        }
        const checkUsername = await userRepository.getUserByUsername(data.username);

        if (checkUsername){
            throw new HttpError(403,"Username already in use");
        }

        // hash/encrypt password, to not store plain text password - security risk
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 - complexity
        data.password = hashedPassword; // update the password with hashed one
        const newUser = await userRepository.createUser(data);

        return newUser;
    }
}

