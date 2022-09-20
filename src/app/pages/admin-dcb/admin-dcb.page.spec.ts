import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDCBPage } from './admin-dcb.page';

describe('AdminDCBPage', () => {
  let component: AdminDCBPage;
  let fixture: ComponentFixture<AdminDCBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDCBPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDCBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
