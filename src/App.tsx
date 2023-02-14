import React, { useState } from 'react';
import { Button, DatePicker, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Line } from '@ant-design/charts';
import 'antd/dist/reset.css';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

type DateTime = dayjs.Dayjs;

interface BiorythmData {
  key: string,
  targetDate: DateTime,
  emotional: number,
  intellectual: number,
  physical: number
}

interface TableData {
  data: BiorythmData[];
}

interface DaterPickerComponentProps {
  onBirthdayDateChanged: (value: DateTime | null, dateString: string) => void,
  onTargetDateChanged: (value: DateTime | null, dateString: string) => void
}

const columns: ColumnsType<BiorythmData> = [
  {
    title: 'Target Date',
    dataIndex: 'targetDate',
    key: 'targetDate'
  },
  {
    title: 'Physical',
    dataIndex: 'physical',
    key: 'physical'
  },
  {
    title: 'Intellectual',
    dataIndex: 'intellectual',
    key: 'intellectual'
  },
  {
    title: 'Emotional',
    dataIndex: 'emotional',
    key: 'emotional'
  }
];

const updateBiorythmData = (birthDate: DateTime, targetDate: DateTime): BiorythmData[] => {
  console.log("Recalc biorythm data");

  const daysBeforeTargetDate = 10;
  const totalDays = 30;

  let newData : BiorythmData[] = [];

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

const TableComponent = (props: TableData) => {
  return (
    <Table<BiorythmData> dataSource={props.data}>
      <Table.Column title="Target Date" dataIndex="targetDate" render={renderDate} />
      <Table.Column title="Physical" dataIndex="physical" render={(value: number) => <p>{value}</p>} />
      <Table.Column title="Emotional" dataIndex="emotional" render={(value: number) => <p>{value}</p>} />
      <Table.Column title="Intellectual" dataIndex="intellectual" render={(value: number) => <p>{value}</p>} />
  </Table>
  );
}

const DatePickerComponent = (props: DaterPickerComponentProps) => {
  return (
    <>
      <DatePicker placeholder="Birthdate" defaultValue={dayjs('1971-02-15', 'YYYY-MM-DD')} onChange={props.onBirthdayDateChanged}/>
      <DatePicker placeholder="Targetdate" defaultValue={dayjs()} showToday onChange={props.onTargetDateChanged}/>
    </>
  )
}

function round(value: number, decimals: number) {
  return Number(Math.round(Number(`${value}e${decimals}`))+'e-'+decimals);
}

const BiorythmChart = (props: TableData) => {
  let dataEmotional = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.emotional, 4),
      category: 'emotional'
    };
  });

  let dataIntellectual = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.intellectual, 4),
      category: 'intellectual'
    };
  });

  let dataPhysical = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.physical, 4),
      category: 'physical'
    };
  });

  const data = [...dataEmotional, ...dataIntellectual, ...dataPhysical];
  const config = {
    data,
    xField: 'date',
    yField: 'ability',
    seriesField: 'category',
    xAxis: {
      type: 'time'
    },
    smooth: true,
    colorField: 'ability', // or seriesField in some cases
    color: ['#FF0000', '#00FF00', '#0000FF'],
  }

  return <Line {...config} />;
}

const renderDate = (value: DateTime, record: unknown, index: number) => {
  let val = value as DateTime;

  return (<p>{val.toISOString()}</p>);
}

const App = () => {
  const [tableData, setTableData] = useState<BiorythmData[]>([]);
  const [birthDate, setBirthDate] = useState<DateTime | null>(null);
  const [targetDate, setTargetDate] = useState<DateTime | null>(null);
  
  return (
    <>
      <DatePickerComponent onBirthdayDateChanged={
        (value, dateString) => {
          setBirthDate(value);
          let newData = updateBiorythmData(birthDate ?? dayjs(), targetDate ?? dayjs());
          setTableData(newData);
        }}
          onTargetDateChanged={(value, dateString) => {
            setTargetDate(value);
            let newData = updateBiorythmData(birthDate ?? dayjs(), targetDate ?? dayjs());
            setTableData(newData);
          }}/>
      <Button type="primary" onClick={() => {
        let newData = updateBiorythmData(birthDate ?? dayjs(), targetDate ?? dayjs());
        setTableData(newData);
      }}>Calculate</Button>
      <BiorythmChart data={tableData} />
      {/* <Table.Column dataIndex="targetDate" render={renderDate} /> */}
      {/* There is no mix and match mode to render the columns. If one of them requires a special render, then all of them will need one. */}
      <TableComponent data={tableData}/>
    </>
  );
};

export default App;
