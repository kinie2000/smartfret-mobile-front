import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidationCodePage } from './validation-code.page';

describe('ValidationCodePage', () => {
  let component: ValidationCodePage;
  let fixture: ComponentFixture<ValidationCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
