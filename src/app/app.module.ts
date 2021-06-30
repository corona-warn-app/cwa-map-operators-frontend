import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UploadComponent} from './upload/upload.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {AuthenticationService} from "./auth.service";
import {SharedModule} from "./shared/shared.module";
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    OverviewComponent,
    SettingsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      FormsModule,
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                sendAccessToken: true,
                allowedUrls: ['/api']
            }
        }),
        SharedModule
    ],
  providers: [
    AuthenticationService
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private authService: AuthenticationService) {
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    this.authService.bootstrap()
      .then(() => {
        appRef.bootstrap(AppComponent);
      })
      .catch(error => {
        console.error(`[ngDoBootstrap] Problem while authService.bootstrapAuthService(): ${JSON.stringify(error)}`, error);
      });
  }
}
