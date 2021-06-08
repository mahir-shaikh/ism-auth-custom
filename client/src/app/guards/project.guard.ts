import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../services/project.service';
 
@Injectable()
export class ProjectGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private projectService: ProjectService
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.projectService.getActiveProjectId) {
            // project id present so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/user-dashboard']);
        return false;
    }
}