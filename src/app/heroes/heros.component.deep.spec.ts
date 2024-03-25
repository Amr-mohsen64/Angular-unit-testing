import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroComponent } from '../hero/hero.component';
import {
  Directive,
  HostListener,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

// in deep tests we test the relation between the component (heros) and its child components(hero)
describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonder', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    //call the delete method directly by triggering the click event
    // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {
    //   stopPropagation: () => {},
    // });

    // or raise the delete event
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // or raise the delete event from a child component
    heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));

    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement; // get the input element
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0]; // get the add button

    inputElement.value = name;
    addButton.triggerEventHandler('click', null); // trigger the click event

    fixture.detectChanges(); // update the view

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement
      .textContent;
    expect(heroText).toContain('Ice');
  });

  it('should have the correct route for the first hero', () => {
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  });
});
