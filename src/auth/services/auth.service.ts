import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "src/users/services/users.service";
import { User } from "src/users/entities/user.entity";
import { PayloadToken } from "../models/token.model";

@Injectable()
export class AuthService {      
   constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null; 
        }

        if (user && user.password) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const { password, ...rta } = user;
                return rta;
            }
        }
        return null;
    }

    generateJwt(user: User) {
        const payload: PayloadToken = {role: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload), // firma el token
            user,
        };
    }
}