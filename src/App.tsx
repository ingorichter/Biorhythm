import React, { useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css';

import dayjs from 'dayjs';

import { DateTime } from './shared/DateTime.interface';
import { BiorythmData } from './shared/BiorhythmData.interface';

import BiorythmChart from './components/BiorythmChart';
import TableComponent from './components/TableComponent';
import DatePicker from './components/DatePickerComponent';

import updateBiorythmData from './shared/BiorhythmCalculator';

const App = () => {
  const [tableData, setTableData] = useState<BiorythmData[]>([]);
  const [birthDate, setBirthDate] = useState<DateTime | null>(null);
  const [targetDate, setTargetDate] = useState<DateTime | null>(null);
  
  return (
    <>
      <DatePicker onBirthdayDateChanged={
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
