import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TabsService {
    private presentSource = new Subject < string > ();
    constructor() {}
    present$ = this.presentSource.asObservable();

    // Service message commands
    present(condition) {
        this.presentSource.next(condition);
    }


}