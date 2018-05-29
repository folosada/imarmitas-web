import * as moment from 'moment';

export class DateParserUtil {

    static stringToDateTime(value):any {
        if (value == null) {
            return null;
        }

        return moment(value, "dd-MM-YYYY hh:mm");
    }

    static stringToDate(value):any {
        if (value == null) {
            return null;
        }

        return moment(value, "dd-MM-YYYY");
    }

}