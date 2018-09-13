import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class AppService {
    private publishSubscribeSubject: Subject<any> = new Subject();
    private emitter: Observable<any>;

    constructor() {
        this.emitter = this.publishSubscribeSubject.asObservable();
    }

    publish(channel: string, data: any): void {
        this.publishSubscribeSubject.next({
            channel: channel,
            data: data
        });
    }

    subscribe(channel: string, handler: ((value: any) => void)): Subscription {
        return this.emitter
            .pipe(
                filter(emission => emission.channel === channel),
                map(emission => emission.data)
            )
            .subscribe(handler);
    }
}
