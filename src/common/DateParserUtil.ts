import * as moment from 'moment-timezone';

export class DateParserUtil {

    static stringToDate(value):any {
        if (!value) {
            return null;
        }
        return new Date(value);
    }

}