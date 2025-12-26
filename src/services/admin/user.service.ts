import { UserRepository } from "../../repositories/user.repository";
import bcryptjs from 'bcryptjs';
import { HttpError } from "../../errors/http-error";
import { CreateUserDto } from "../../dtos/user.dto";

let userRepository = new UserRepository();
export class AdminUserService {
    async createUser(data: CreateUserDto){
        // same as register user
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
    async getUserById(id: string) {
        const user = await userRepository.getUserById(id);
        if(!user) throw new HttpError(404, "User not found");
        return user;
    }
    async getAllUser(){
        const user = await userRepository.getAllUsers();
        // transform/map data if needed
        return user;
    }
    // Continue all
    async updateOneUser(id: string, data: any) {
        // Task requirement: check if user exists first
        const user = await userRepository.getUserById(id);
        if (!user) throw new HttpError(404, "User not found");

        // If updating password, hash it
        if (data.password) {
            const salt = await bcryptjs.genSalt(10);
            data.password = await bcryptjs.hash(data.password, salt);
        }

        const updatedUser = await userRepository.updateOneUser(id, data);
        return updatedUser;
    }

    // 5. Delete User (with existence check)
    async deleteOneUser(id: string) {
        // Task requirement: check if user exists first
        const user = await userRepository.getUserById(id);
        if (!user) throw new HttpError(404, "User not found");

        const deleted = await userRepository.deleteOneUser(id);
        return deleted;
    }

}
