import { TableData } from "../shared/Tabledata.interface";
import { BiorythmData } from "../shared/BiorhythmData.interface";
import { DateTime } from "../shared/DateTime.interface";

// import { ColumnsType } from 'antd/es/table';
import Table from "antd/es/table";

// const columns: ColumnsType<BiorythmData> = [
//     {
//         title: 'Target Date',
//         dataIndex: 'targetDate',
//         key: 'targetDate'
//     },
//     {
//         title: 'Physical',
//         dataIndex: 'physical',
//         key: 'physical'
//     },
//     {
//         title: 'Intellectual',
//         dataIndex: 'intellectual',
//         key: 'intellectual'
//     },
//     {
//         title: 'Emotional',
//         dataIndex: 'emotional',
//         key: 'emotional'
//     }
// ];

const renderDate = (value: DateTime, record: unknown, index: number) => {
    let val = value as DateTime;

    return (<p>{val.toISOString()}</p>);
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

export default TableComponent;  