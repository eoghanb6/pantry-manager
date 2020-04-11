import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPage } from './account.page';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service'
import { of } from 'rxjs';


describe('AccountPage', () => {
  let component: AccountPage;
  let fixture: ComponentFixture<AccountPage>;
  let afStoreStub: any;
  let userServiceStub: any;

  beforeEach(async(() => {
    const afStoreStub = {
      doc() {
        return {
          valueChanges() {
            return of({ingredients: ['egg', 'ham']});
          }
        };
      }
    };
    userServiceStub = {
      getUID: () => of('12345689'),
      getEmail: () => of('test1@test.com'),

    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
    { provide: AngularFirestore, useValue: afStoreStub },
    { provide: UserService, useValue: userServiceStub },
]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
