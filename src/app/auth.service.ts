import {Injectable} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs/operators';
import {authCodeFlowConfig} from "./auth.config";
import {environment} from "../environments/environment";

@Injectable()
export class AuthenticationService {

  constructor(private readonly oauthService: OAuthService) {

  }

  async bootstrap() {
    authCodeFlowConfig.issuer = environment.settings.authentication.issuer;
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(localStorage);
    const result = await this.oauthService.loadDiscoveryDocument();
    const logged = await this.oauthService.tryLogin();

    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initCodeFlow();
    }
  }

  logout() {
    this.oauthService.logOut();
  }
}
