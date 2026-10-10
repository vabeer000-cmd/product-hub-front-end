import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { RegisterRequest } from '../../../core/models/register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-owner-register',
  imports: [FormsModule],
  templateUrl: './product-owner-register.html',
  styleUrl: './product-owner-register.css',
})
export class ProductOwnerRegister {
  private auth = inject(Auth);
   private router = inject(Router);
  registerData: RegisterRequest = {
    username : '',
    password : ''
  }

  register(): void {
    this.auth.productOwnerRegister(this.registerData).subscribe({
      next: () =>{
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log("Product owner registration failed ",error);
      }
        

      
    })
  }


}
