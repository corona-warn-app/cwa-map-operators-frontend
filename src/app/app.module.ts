/*
 *
 *  Corona-Warn-App / cwa-map-operators-frontend
 *
 * (C) 2020, T-Systems International GmbH
 *
 * Deutsche Telekom AG and all other contributors /
 * copyright owners license this file to you under the Apache
 * License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UploadComponent} from './upload/upload.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import {AuthenticationService} from "./auth.service";
import {SharedModule} from "./shared/shared.module";
import {OverviewComponent} from './overview/overview.component';
import {SettingsComponent} from './settings/settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditCenterComponent} from './edit-center/edit-center.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    OverviewComponent,
    SettingsComponent,
    EditCenterComponent
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
    ReactiveFormsModule,
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
