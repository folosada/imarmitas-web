import { HttpHeaders } from "@angular/common/http";

const OBSERVE = "response";
const RESPONSE_TYPE = "json";

export class MarmitaHeaders {    

    static get() {         
        const header = {
            'headers': new HttpHeaders({'Content-Type':'application/json; charset=utf-8'}),
            'observe': 'response' as 'body', 
            'responseType': 'json' as 'json'
        };
        return header;
    }

    static getAuth(authorization) {
        const header = {
            'headers': new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'Authorization': authorization}),
            'observe': 'response' as 'body', 
            'responseType': 'json' as 'json'
        }
        return header;
    }
}

