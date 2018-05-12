import { HttpHeaders } from "@angular/common/http";

export class MarmitaHeaders {
    static get() {                
        const header = {
            headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
        };
        return header;
    }

    static getAuth(authorization) {
        const header = {
            headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Authorization: ': authorization})
        }
        return header;
    }
}

