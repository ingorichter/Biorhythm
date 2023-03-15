import { DatePicker } from "antd";
import dayjs from "dayjs";
import { DateTime } from "../shared/DateTime.interface";

interface DaterPickerComponentProps {
  birthDate: DateTime,
  targetDate: DateTime,
  onBirthdayDateChanged: (value: DateTime | null, dateString: string) => void,
  onTargetDateChanged: (value: DateTime | null, dateString: string) => void
}

const DatePickerComponent = (props: DaterPickerComponentProps) => {
  return (
    <>
      <DatePicker placeholder="Birthdate" defaultValue={props.birthDate} onChange={props.onBirthdayDateChanged} />
      <DatePicker placeholder="Targetdate" defaultValue={props.targetDate} showToday onChange={props.onTargetDateChanged} />
    </>
  )
}

export default DatePickerComponent;