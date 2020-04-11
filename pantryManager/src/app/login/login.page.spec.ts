import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import {BehaviorSubject, Observable} from 'rxjs';
import { of } from 'rxjs';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let afAuthStub: any;
  let userServiceStub: any;

  beforeEach(async(() => {
    afAuthStub = {
      getUID: () => of('12345689'),
    };
    userServiceStub = {
      getUID: () => of('12345689'),
    };

    TestBed.configureTestingModule({
      imports: [
RouterTestingModule],
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
    { provide: AngularFireAuth, useValue: afAuthStub },
    { provide: UserService, useValue: userServiceStub },
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
