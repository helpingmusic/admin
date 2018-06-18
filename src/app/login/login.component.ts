import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators as val} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      email: ['', [val.required, val.email]],
      password: ['', [val.required]],
    })
  }

  ngOnInit() {
  }

  clearServerErrors() {
    if (this.loginForm.get('email').hasError('server')) {
      this.loginForm.get('email').setErrors(null);
    }
  }

  onSubmit(form: FormGroup) {

    if (form.invalid) return false;
    this.isLoading = true;

    this.authService.login(form.value)
      .first()
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        err => {
          console.error(err);
          this.isLoading = false;
          this.loginForm.get('email').setErrors({ server: err.error.message });
        },
      )

  }

}
