import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadComponent} from "./upload/upload.component";
import {AuthGuard} from "./auth.guard";
import {LayoutComponent} from "./shared/components/layout/layout.component";
import {OverviewComponent} from "./overview/overview.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: "overview",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', component: OverviewComponent}
    ]
  },
  {
    path: "import",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {path: '', component: UploadComponent}
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
