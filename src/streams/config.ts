import { BehaviorSubject, distinctUntilChanged, Subject } from 'rxjs';

export const login$ = new Subject<void>();
