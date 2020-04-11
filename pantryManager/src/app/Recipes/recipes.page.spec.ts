import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipesPage } from './recipes.page';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { SpoonacularService } from '../spoonacular.service'

describe('RecipesPage', () => {
  let component: RecipesPage;
  let fixture: ComponentFixture<RecipesPage>;
  let afStoreStub: any;
  let userServiceStub: any;
  let spoonacularServiceStub: any;
  let ingredsStub: any;
  let spy: jasmine.Spy;

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
};
spoonacularServiceStub = {
  searchRecipes: () => of({recipes: ['recipe1', 'recipe2']}),
};
    TestBed.configureTestingModule({
      declarations: [ RecipesPage ],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: AngularFirestore, useValue: afStoreStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: SpoonacularService, useValue: spoonacularServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
