import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { List0Page } from './list0.page';

describe('List0Page', () => {
  let component: List0Page;
  let fixture: ComponentFixture<ListPage>;
  let listPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List0Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(List0Page);
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
