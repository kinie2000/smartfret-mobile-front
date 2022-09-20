import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { NewPassPage } from "./new-pass.page";

describe("NewPassPage", () => {
  let component: NewPassPage;
  let fixture: ComponentFixture<NewPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPassPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
