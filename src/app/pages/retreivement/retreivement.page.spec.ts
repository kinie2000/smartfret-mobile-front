import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetreivementPage } from './retreivement.page';

describe('RetreivementPage', () => {
  let component: RetreivementPage;
  let fixture: ComponentFixture<RetreivementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetreivementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetreivementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
