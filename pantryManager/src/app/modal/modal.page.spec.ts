import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NavParams, ModalController } from '@ionic/angular';
import { ModalPage } from './modal.page';
import {BehaviorSubject, Observable} from 'rxjs';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user.service'


describe('ModalPage', () => {
  //define variables
  let component: ModalPage;
  let fixture: ComponentFixture<ModalPage>;
  let modalControllerStub: any;
  let navParamsStub: any;
  let afStoreStub: any;
  let userServiceStub: any;


  beforeEach(async(() => {
    //mock modal controller
    modalControllerStub = {
    };
    // nav params are into modal page, mock them here
    navParamsStub = {
        get: () => of({recipeInfo: ['url', 'units']}),
    };
    //mock angular firestore
    const afStoreStub = {
      doc() {
        return {
          valueChanges() {
            return of({ingredients: ['egg', 'ham']});
          }
        };
      }
    };
    //mock user service
    userServiceStub = {
      getUID: () => of('12345689'),
    };

    TestBed.configureTestingModule({
      declarations: [ ModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [
        //use mocks instead of live services
        { provide: ModalController, useValue: modalControllerStub },
        { provide: NavParams, useValue: navParamsStub },
        { provide: AngularFirestore, useValue: afStoreStub },
        { provide: UserService, useValue: userServiceStub },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
