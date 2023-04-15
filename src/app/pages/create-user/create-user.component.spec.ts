/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService,ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    service = TestBed.inject(UserService);
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;

    component = fixture.componentInstance;
    // The component expect an input called `form`. You have to supply it in the test

    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
