import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm: FormGroup 
  errorMessage: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
      this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  onSubmit(){

    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.errorMessage = 'Usuário ou senha inválidos'
      });
    }
  }

  FieldIsInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName)?.invalid && this.loginForm.get(fieldName)?.touched && this.loginForm.get(fieldName)?.errors?.['required'];
  }

}
