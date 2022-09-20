import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcolisPage } from './editcolis.page';

describe('EditcolisPage', () => {
  let component: EditcolisPage;
  let fixture: ComponentFixture<EditcolisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcolisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcolisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
