import React, { useState } from 'react';
import { Button, Layout, Space } from 'antd';

import dayjs from 'dayjs';

import { DateTime } from './shared/DateTime.interface';
import { BiorythmData } from './shared/BiorhythmData.interface';

import BiorythmChart from './components/BiorythmChart';
import TableComponent from './components/TableComponent';
import DatePickerComponent from './components/DatePickerComponent';
import InfoBlock from './components/InfoBlock';
import updateBiorythmData from './shared/BiorhythmCalculator';

const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 140,
  paddingInline: 30,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 220,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
  height: '40px',
  width: '100%',
  margin: 'auto'
};

const LayoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex'
};

const App = () => {
  const [tableData, setTableData] = useState<BiorythmData[]>([]);
  const [birthDate, setBirthDate] = useState<DateTime>(dayjs());
  const [targetDate, setTargetDate] = useState<DateTime>(dayjs());

  return (
    // <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={LayoutStyle}>
        <Header style={headerStyle}>
          <InfoBlock />
        </Header>
        <Content style={contentStyle}>
          <DatePickerComponent birthDate={birthDate} targetDate={targetDate} onBirthdayDateChanged={
            (value, dateString) => {
              setBirthDate(value || dayjs());
            }}
            onTargetDateChanged={(value, dateString) => {
              setTargetDate(value || dayjs());
            }} />
          <Button type="primary" disabled={birthDate == null || targetDate == null} onClick={() => {
            let newData = updateBiorythmData(birthDate, targetDate);
            setTableData(newData);
          }}>Calculate</Button>

          <BiorythmChart data={tableData} />
        </Content>
        {/* <Table.Column dataIndex="targetDate" render={renderDate} /> */}
        {/* There is no mix and match mode to render the columns. If one of them requires a special render, then all of them will need one. */}
        {/* <TableComponent data={tableData} /> */}
        <Footer style={footerStyle}>
          Made with ❤️, by Ingo Richter using React and Ant Design.
        </Footer>
      </Layout>
    // </Space>
  );
};

export default App;
