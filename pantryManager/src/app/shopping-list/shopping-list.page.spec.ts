import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore'
import { ShoppingListPage } from './shopping-list.page';
import { of } from 'rxjs';
import { UserService } from '../user.service'


describe('ShoppingListPage', () => {
  //define variables
  let component: ShoppingListPage;
  let fixture: ComponentFixture<ShoppingListPage>;
  let afStoreStub: any;
  let userServiceStub: any;

  beforeEach(async(() => {
//mock angularfirestore
     afStoreStub = {
      doc() {
        return {
          valueChanges() {
            return of({shoppingList: ['egg', 'ham']});
          }
        };
      }
    };
    //mock userservice
    userServiceStub = {
      getUID: () => of('12345689'),
    };

    TestBed.configureTestingModule({
      declarations: [ ShoppingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        //use mocked data instead of live services in provider
        { provide: AngularFirestore, useValue: afStoreStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
