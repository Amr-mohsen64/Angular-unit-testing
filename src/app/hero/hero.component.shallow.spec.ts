import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should have the correct hero', () => {
    component.hero = { id: 1, name: 'SuperDude', strength: 3 };

    expect(component.hero.name).toBe('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    component.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges(); // triggers data binding

    const deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('SuperDude');

    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
  });

  
});
