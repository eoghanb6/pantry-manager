import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth'
import {BehaviorSubject, Observable} from 'rxjs';
import { of } from 'rxjs';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
//mock angular fire auth
const AngularFireMocks = {
    auth: of({ uid: 'ABC123' })
};
//mock angularfirestore
const AngularFireStoreMocks = {
    doc: of({ uid: 'ABC123' })
};
//mock user service
const UserServiceMocks = {
    setUser: of({ uid: 'ABC123' })
};

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
RouterTestingModule],
      declarations: [ RegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        //use mocks instead of live services
    { provide: AngularFireAuth, useValue: AngularFireMocks },
    { provide: AngularFirestore, useValue: AngularFireStoreMocks },
    { provide: UserService, useValue: UserServiceMocks }
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
