import dayjs from "dayjs";
import updateBiorythmData from "../BiorhythmCalculator";

it("emotional, intellectual and physical should be all 0 if birthdate and targetdate are equal", () => {
    const date = dayjs("2023-03-01");
    let data = updateBiorythmData(date, date);
    
    expect(data.length).toEqual(30);
    const sameDate = data.find(item => item.key === '10');
    expect(sameDate).not.toBeNull();
    expect(sameDate?.emotional).toEqual(0);
    expect(sameDate?.physical).toEqual(0);
    expect(sameDate?.intellectual).toEqual(0);
});
