import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fitness-Tracker-FE';
  private navbarRouteActive: string;

  constructor(private router: Router) { 
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.navbarRouteActive =  this.router.url;
          console.debug(`current route: ${this.navbarRouteActive}`);
        }
      }
    );
  }

  activeNavbarRoute(navbarRouterLinkName: string) {
    return navbarRouterLinkName == this.navbarRouteActive;
  }
}
