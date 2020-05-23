import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AuthService } from './Auth/auth.service';
import { MessageBannerService } from './MessageBanner/messageBannerService';
import { BannerMessage, BannerMessageType } from './MessageBanner/messageBanner.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fitness-Tracker-FE';
  private navbarRouteActive: string;

  constructor(private router: Router,
      private auth: AuthService,
      private messageBanner: MessageBannerService) { 
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

  get displayName() {
    if (this.auth.isLoggedIn()) {
      return this.auth.getUserEmail();
    } else {
      return ''
    }
  }

  logoutUser() {
    this.auth.logout();
    this.router.navigateByUrl('/auth');
    this.messageBanner.reportMessage(
      new BannerMessage('You were logged out', BannerMessageType.info))
  }
}
