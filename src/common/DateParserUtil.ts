import * as moment from 'moment-timezone';

export class DateParserUtil {

    static stringToDate(value):any {
        if (value == null) {
            return null;
        }
        return new Date(value);
    }

}