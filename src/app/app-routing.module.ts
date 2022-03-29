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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadComponent} from "./upload/upload.component";
import {AuthGuard} from "./auth.guard";
import {LayoutComponent} from "./shared/components/layout/layout.component";
import {OverviewComponent} from "./overview/overview.component";
import {SettingsComponent} from "./settings/settings.component";
import {EditCenterComponent} from "./edit-center/edit-center.component";

const routes: Routes = [
  {
    path: "centers",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: "overview", component: OverviewComponent},
      {path: "import", component: UploadComponent},
      {path: ":uuid", component: EditCenterComponent}
    ]
  },
  {
    path: "operator",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', component: SettingsComponent}
    ]
  },
  {
    path: "**",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', component: UploadComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
