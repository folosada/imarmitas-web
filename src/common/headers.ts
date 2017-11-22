import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Authorization', '');
contentHeaders.append('Content-Type', 'application/json');