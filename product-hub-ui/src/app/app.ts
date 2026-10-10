import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('product-hub-ui');
  authService = inject(Auth)
  router = inject(Router)

  a : number =10;

  constructor(){
  console.log("Number : ",this.a);
  }

  logout(): void {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: error => {
      console.error('Logout failed', error);
    }
  });
}
}
