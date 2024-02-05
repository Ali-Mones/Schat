import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.http.get<boolean>('http://localhost:5252/api/Authentication', { withCredentials: true })
      .pipe(map((authenticated) => authenticated ? true : this.router.createUrlTree(['/login'])));
  }
}
