import { Line } from '@ant-design/charts';
import { BiorythmData } from '../shared/BiorhythmData.interface';
import { TableData } from '../shared/Tabledata.interface';

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
  
  export default BiorythmChart;