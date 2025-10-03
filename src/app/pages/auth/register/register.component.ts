import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/service/snackBar.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  
  constructor(
    private snackBarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    this.registerForm.markAllAsTouched();

    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.showSnackBar();
        },
        error: (err) => {
          console.error('Erro ao registrar usuário:', err);
        }
      });
    }
  }

  showSnackBar(){
    this.snackBarService.onSnackBar('Usuário registrado com sucesso!');
  }

  fieldIsInvalid(fieldName: string): boolean {
    return this.registerForm.get(fieldName)?.invalid && this.registerForm.get(fieldName)?.touched && this.registerForm.get(fieldName)?.errors?.['required'];
  }
}