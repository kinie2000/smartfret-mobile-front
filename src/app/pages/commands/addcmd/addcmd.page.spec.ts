import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcmdPage } from './addcmd.page';

describe('AddcmdPage', () => {
  let component: AddcmdPage;
  let fixture: ComponentFixture<AddcmdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcmdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcmdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
