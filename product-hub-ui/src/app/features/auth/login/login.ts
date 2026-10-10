import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../../../core/services/auth';
import { LoginRequest } from '../../../core/models/login-request';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(Auth);
  private router = inject(Router);
  errormessage = signal('');
  isLoading = signal(false);

  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  login(): void {

    this.errormessage.set('')
    this.isLoading.set(true)
    this.auth.login(this.loginData)
    .pipe(finalize (() => this.isLoading.set(false))).subscribe({

      next: () => {
        this.router.navigate(['/products']);
      },

      error: error => {
        this.errormessage.set(
         error.status === 401 ?
          'Invalid username or password.' :
           'Unable to login. Please try again.');
        console.error('Login failed', error);
      }

    });

  }
}