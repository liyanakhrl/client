/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  constructor(private fb: FormBuilder, private userService: UserService) {}
  createUserForm = this.fb.group({
    username: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    role: new FormControl([Validators.required])
  });

  pendingResponse = false;
  showMessage = false;
  message = '';
  roles = ['admin', 'mod', 'user'];

  createUser() {
    const body = {
      username: this.createUserForm.controls['username'].value,
      email: this.createUserForm.controls['email'].value,
      password: 123456,
      role: [this.createUserForm.controls['role'].value],
      firstName: this.createUserForm.controls['firstName'].value,
      lastName: this.createUserForm.controls['lastName'].value
    };
    this.userService.createUser(body).subscribe({
      next: (data) => {
        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Succesfully added';
        this.createUserForm.reset();
      },
      error: (err) => {
        console.log(err);

        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Something Happened';
      }
    });
  }
  changeRole(e: any) {
    this.createUserForm.controls['role'].setValue(e.target.value);
  }
}
