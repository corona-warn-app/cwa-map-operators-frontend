import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasIdToken && hasAccessToken);
  }
}
