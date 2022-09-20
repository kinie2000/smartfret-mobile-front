import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilsPage } from './profils.page';

describe('ProfilsPage', () => {
  let component: ProfilsPage;
  let fixture: ComponentFixture<ProfilsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
