import { MessageService } from './message.service';
import { TestBed } from '@angular/core/testing';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new MessageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
