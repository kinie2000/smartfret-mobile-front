import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewcmdPage } from './newcmd.page';

describe('NewcmdPage', () => {
  let component: NewcmdPage;
  let fixture: ComponentFixture<NewcmdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewcmdPage],
      imports: [IonicModule.forRoot(),BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewcmdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
