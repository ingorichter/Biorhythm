import { DateTime } from "./DateTime.interface";
import { BiorythmData } from "./BiorhythmData.interface";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const updateBiorythmData = (birthDate: DateTime, targetDate: DateTime, daysBeforeTargetDate: number = 10, totalDays: number = 30): BiorythmData[] => {
    let newData: BiorythmData[] = [];

    let xDaysBeforeTargetDate = targetDate.subtract(daysBeforeTargetDate, 'days');

    for (var day = 0; day < totalDays; day++) {
        let daysBetweenDates = dayjs.duration(xDaysBeforeTargetDate.diff(birthDate));
        // console.log(`There are ${daysBetweenDates.asDays()} between ${birthDate.toString()} and ${xDaysBeforeTargetDate.toString()}`);

        // const daysBetweenBirthdayAndTargetDate = Math.floor(daysBetweenDates.asDays());
        const daysBetweenBirthdayAndTargetDate = daysBetweenDates.asDays();

        newData.push({
            key: "" + day,
            targetDate: xDaysBeforeTargetDate,
            physical: Math.sin(2 * Math.PI * daysBetweenBirthdayAndTargetDate / 23),
            emotional: Math.sin(2 * Math.PI * daysBetweenBirthdayAndTargetDate / 28),
            intellectual: Math.sin(2 * Math.PI * daysBetweenBirthdayAndTargetDate / 33)
        })

        xDaysBeforeTargetDate = xDaysBeforeTargetDate.add(1, 'days');
    }

    return newData;
}

export default updateBiorythmData;