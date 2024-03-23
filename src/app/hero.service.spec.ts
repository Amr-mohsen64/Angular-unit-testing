import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;
  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  });

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      // call getHero()
      heroService.getHero(4).subscribe((hero) => {
        expect(hero).toEqual({ id: 4, name: 'SuperDude', strength: 100 });
      });

      // test that the URL is correct
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });

      // verify that no extra requests were made and only one request was made
      httpTestingController.verify();
    });
  });
});
