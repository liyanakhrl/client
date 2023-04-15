/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  roles = ['admin', 'mod', 'user'];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}
  onSubmit(): void {
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')!.value;
    const password = this.form.get('password')!.value;
    const role = this.form.get('role')!.value;
    const firstName = this.form.get('firstName')!.value;
    const lastName = this.form.get('lastName')!.value;

    this.authService
      .register(username, email, password, role, firstName, lastName)
      .subscribe({
        next: (data: any) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
  }

  changeRole(e: any) {
    console.log('selected role->',e.target.value);
    this.form.controls['role'].setValue(e.target.value);
  }
}
