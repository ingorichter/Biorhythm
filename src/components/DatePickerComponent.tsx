import { DatePicker } from "antd";
import dayjs from "dayjs";
import { DateTime } from "../shared/DateTime.interface";

interface DaterPickerComponentProps {
    onBirthdayDateChanged: (value: DateTime | null, dateString: string) => void,
    onTargetDateChanged: (value: DateTime | null, dateString: string) => void
}
  
const DatePickerComponent = (props: DaterPickerComponentProps) => {
    return (
      <>
        <DatePicker placeholder="Birthdate" defaultValue={dayjs('1971-02-15', 'YYYY-MM-DD')} onChange={props.onBirthdayDateChanged}/>
        <DatePicker placeholder="Targetdate" defaultValue={dayjs()} showToday onChange={props.onTargetDateChanged}/>
      </>
    )
  }

  export default DatePickerComponent;