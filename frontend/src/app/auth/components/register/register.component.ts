import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { AuthenticationService } from '../../service/auth.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  form!: UntypedFormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private authenticationService: AuthenticationService,
              private cd: ChangeDetectorRef,
              private userSessionService: UserSessionService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  send() {
    if (this.form.invalid) {
      return;
    }
    this.authenticationService.registerUser(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
      ).subscribe((res: any) => {
        if (res.token) {
          this.userSessionService.accessToken = res.token;
          this.userSessionService.userSession = res.user;
          this.router.navigate(['/']);
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
