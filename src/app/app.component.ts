import { Component, NgZone } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService],
})
export class AppComponent {
  title = 'Monedero Moderno';
  constructor(
    private primengConfig: PrimeNGConfig,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  initializeApp() {
    CapacitorApp.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split('.app').pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
      });
    });

    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }
}
