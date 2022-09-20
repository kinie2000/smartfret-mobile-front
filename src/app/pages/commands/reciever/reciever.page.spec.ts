import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecieverPage } from './reciever.page';

describe('RecieverPage', () => {
  let component: RecieverPage;
  let fixture: ComponentFixture<RecieverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecieverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
