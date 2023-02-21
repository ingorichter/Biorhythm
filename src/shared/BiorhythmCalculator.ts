import { DateTime } from "./DateTime.interface";
import { BiorythmData } from "./BiorhythmData.interface";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const updateBiorythmData = (birthDate: DateTime, targetDate: DateTime): BiorythmData[] => {
    console.log("Recalc biorythm data");

    const daysBeforeTargetDate = 10;
    const totalDays = 30;

    let newData: BiorythmData[] = [];

    let xDaysBeforeTargetDate = targetDate.subtract(daysBeforeTargetDate, 'days');

    for (var day = 0; day < totalDays; day++) {
        xDaysBeforeTargetDate = xDaysBeforeTargetDate.add(1, 'days');
        let daysBetweenDates = dayjs.duration(xDaysBeforeTargetDate.diff(birthDate));
        console.log(`There are ${daysBetweenDates.asDays()} between ${birthDate.toString()} and ${xDaysBeforeTargetDate.toString()}`);

        newData.push({
            key: "" + day,
            targetDate: xDaysBeforeTargetDate,
            physical: Math.sin(Math.PI * 2 * daysBetweenDates.asDays() / 23),
            emotional: Math.sin(Math.PI * 2 * daysBetweenDates.asDays() / 28),
            intellectual: Math.sin(Math.PI * 2 * daysBetweenDates.asDays() / 33)
        })
    }

    return newData;
}

export default updateBiorythmData;