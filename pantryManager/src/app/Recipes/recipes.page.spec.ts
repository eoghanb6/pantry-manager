import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipesPage } from './recipes.page';

describe('RecipesPage', () => {
  let component: RecipesPage;
  let fixture: ComponentFixture<IngredientsPage>;
  let listPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    list0Page = fixture.nativeElement;
    const items = list0Page.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
