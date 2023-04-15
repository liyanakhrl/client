/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  content?: string;
  userList: any;
  mode!: string;
  selectedUserId!: any;
  selectedUserRole!: any;
  pendingResponse = false;
  showMessage = false;
  message = '';
  profileForm = this.fb.group({
    username: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    role: new FormControl([Validators.required])
  });
  // profileForm = new FormGroup({
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   role: new FormControl([Validators.required], ),
  // });
  roles: any = [
    {
      id: 3,
      name: 'ROLE_ADMIN'
    },
    {
      id: 2,
      name: 'ROLE_MODERATOR'
    },
    {
      id: 1,
      name: 'ROLE_USER'
    }
  ];
  otherRole!: any;
  roleNames: any = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'mod'
    },
    {
      id: 3,
      name: 'user'
    }
  ];

  constructor(
    public storageService: StorageService,
    private userService: UserService,
    public fb: FormBuilder,
    private router: Router, private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      }
    });
    this.getUserList();
  }

  action(mode: string, user: any) {
    this.message = '';
    this.showMessage = false;
    this.mode = mode;
    const firstName = this.userList.filter((i: any) => i.id === user.id)[0]
      .firstName;
    const lastName = this.userList.filter((i: any) => i.id === user.id)[0].lastName;
    this.profileForm.controls['username'].setValue(user.username);
    this.profileForm.controls['email'].setValue(user.email);
    this.profileForm.controls['firstName'].setValue(firstName);
    this.profileForm.controls['lastName'].setValue(lastName);
    this.selectedUserId = this.userList.filter((i: any) => i.id === user.id)[0].id;
    const userRoleInfo = this.userList.filter((i: any) => i.id === user.id)[0]
      .roles[0];
    this.selectedUserRole = this.roleNames.filter(
      (i: any) => i.id === userRoleInfo.id
    )[0];
    this.profileForm.controls['role'].setValue(this.selectedUserRole.name);
    this.otherRole = this.roleNames.filter((i: any) => i.id !== userRoleInfo.id);
    this.goToSection();
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (data) => {
        this.userList = data;
      },
      error: (err) => {
        console.log(err);
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      }
    });
  }
  deleteUser() {
    this.userService.deleteUser(this.selectedUserId).subscribe({
      next: (data) => {
        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Succesfully deleted';
        console.log('sucess delete');
        this.getUserList();
      },
      error: (err) => {
        console.log(err);

        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Something Happened';
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      }
    });
  }
  updateUser() {
    const body = {
      username: this.profileForm.controls['username'].value,
      email: this.profileForm.controls['email'].value,
      role: [this.profileForm.controls['role'].value],
      firstName: this.profileForm.controls['firstName'].value,
      lastName: this.profileForm.controls['lastName'].value
    };

    console.log('body->,', body);
    console.log('body->,', this.profileForm.controls['role']);

    console.log('selectedUserId->,', this.selectedUserId);
    this.userService.updateUser(this.selectedUserId, body).subscribe({
      next: (data) => {
        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Succesfully update';
        this.profileForm.reset();
        this.getUserList();
      },
      error: (err) => {
        console.log(err);

        this.pendingResponse = false;
        this.showMessage = true;
        this.message = 'Something Happened';
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = 'Error with status: ' + err.status;
        }
      }
    });
  }

  changeRole(e: any) {
    // console.log("role->",e.target.value);
    this.profileForm.controls['role'].setValue(e.target.value);
  }

  goToSection() {
    const element = this.elementRef.nativeElement.querySelector('#detail-section');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //this.router.navigate(['/']);
  }
}
