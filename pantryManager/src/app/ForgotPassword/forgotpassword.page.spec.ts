import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth'
import {BehaviorSubject, Observable} from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service'


import { ForgotPasswordPage } from './forgotpassword.page';

const AngularFireMocks = {
    auth: of({ uid: 'ABC123' })
};

const UserServiceMocks = {
    setUser: of({ uid: 'ABC123' })
};

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage ],
      imports: [
RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
          providers:  [
    { provide: AngularFireAuth, useValue: AngularFireMocks },
    { provide: UserService, useValue: UserServiceMocks }
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
