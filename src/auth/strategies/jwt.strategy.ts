import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model'; 


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(config.KEY) private configService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwt.secret,
        });
    }

    validate(payload: PayloadToken) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}