import { HttpHeaders } from '@angular/common/http';

export const contentHeaders = new HttpHeaders();
contentHeaders.append('Authorization', '');
contentHeaders.append('Content-Type', 'application/json');