import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';
import { JiraOAuth2Strategy } from './strategy/jira.strategy';
import { JiraOAuth2Controller } from './controllers/jira-auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleOAuth2Controller } from './controllers/google-auth.controller';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { FacebookOAuth2Controller } from './controllers/fb-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { TokenErrorFilter } from 'src/filters/token-error.filter';

@Module({
  imports: [JwtModule.register({}), PassportModule.register({})],
  controllers: [
    AuthController,
    JiraOAuth2Controller,
    GoogleOAuth2Controller,
    FacebookOAuth2Controller,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JiraOAuth2Strategy,
    GoogleStrategy,
    FacebookStrategy,

    {
      provide: APP_FILTER,
      useClass: TokenErrorFilter,
    },
  ],
})
export class AuthModule {}
