import {Injectable} from '@angular/core';

import {Subject} from 'rxjs/Subject';

@Injectable()
export class EventAnnounceService {

  private eventAnnouncedSource = new Subject<any>();
  private eventConfirmedSource = new Subject<any>();

  eventAnnounced$ = this.eventAnnouncedSource.asObservable();
  eventConfirmed$ = this.eventConfirmedSource.asObservable();

  announceEvent(param?: any) {
    this.eventAnnouncedSource.next(param);
  }

  confirmEvent(param?: any) {
    this.eventConfirmedSource.next(param);
  }

}
