import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore'
import { IngredientsPage } from './ingredients.page';
import { of } from 'rxjs';
import { UserService } from '../user.service'


describe('IngredientsPage', () => {
  //define variables
  let component: IngredientsPage;
  let fixture: ComponentFixture<IngredientsPage>;
  let afStoreStub: any;
  let userServiceStub: any;

  beforeEach(async(() => {
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
      declarations: [ IngredientsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: AngularFirestore, useValue: afStoreStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
