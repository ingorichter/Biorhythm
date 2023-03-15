import { Line } from '@ant-design/charts';
import dayjs from 'dayjs';
import { TableData } from '../shared/Tabledata.interface';

function round(value: number, decimals: number) {
  return Number(Math.round(Number(`${value}e${decimals}`)) + 'e-' + decimals);
}

const BiorythmChart = (props: TableData) => {
  let dataEmotional = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.emotional, 3),
      category: 'emotional'
    };
  });

  let dataIntellectual = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.intellectual, 3),
      category: 'intellectual'
    };
  });

  let dataPhysical = props.data.map((value) => {
    return {
      date: value.targetDate.toString(),
      ability: round(value.physical, 3),
      category: 'physical'
    };
  });

  const data = [...dataEmotional, ...dataIntellectual, ...dataPhysical];
  const config = {
    data,
    xField: 'date',
    yField: 'ability',
    seriesField: 'category',
    // renderer: 'svg',
    xAxis: {
      // type: 'date',
      nice: true,
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)'
      },
      label: {
        // autoRotate: false,
        rotate: Math.PI / 4,
        offset: 15,
        style: {
          fill: '#000',
          fontSize: 14,
        },
        formatter: (name: any) => {
          return dayjs(name).format("MM/DD");
        },
      },
    },
    smooth: true,
    colorField: 'ability', // or seriesField in some cases
    color: ['#FF0000', '#00FF00', '#0000FF'],
    // point
    point: {
      size: 5,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: (item: any) => {
        if (item.category === 'physical') {
          return 'circle';
        } if (item.category === 'intellectual') {
          return 'triangle';
        }

        return 'diamond';
      }
    }
  };

  return <Line {...config} />;
}

export default BiorythmChart;