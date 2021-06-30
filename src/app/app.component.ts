import {Component} from '@angular/core';
import {NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "./auth.config";
import {AuthenticationService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ManagementFrontend';

  constructor(private oauthService: AuthenticationService) {

  }

  login() {
    //this.oauthService.initCodeFlow();
  }
}
