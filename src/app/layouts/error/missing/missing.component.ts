import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.scss'],
})
export class MissingComponent implements OnInit {
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    window.location.href = '/';

    // this.authSvc.isAuthenticatedObservable.subscribe((auth) => {
    //   if (auth) {
    //   } else {
    //     window.location.href = 'auth/login';
    //   }
    // });
  }
}
