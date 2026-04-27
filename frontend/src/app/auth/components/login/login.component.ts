import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { AuthenticationService } from '../../service/auth.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form!: UntypedFormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private userSessionService: UserSessionService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    if (this.form.invalid) {
      return;
    }
    this.authenticationService.Login(
  this.form.value.email,
  this.form.value.password,
).subscribe((res: any) => {
  if (res.token) {
    this.userSessionService.accessToken = res.token;
    this.userSessionService.userSession = res.user;
    this.router.navigate(['/']);
  } else {
    this.snackbar.open(res.message || 'Login failed.', 'OK', { duration: 4000 });
    this.cd.markForCheck();
  }
});
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
