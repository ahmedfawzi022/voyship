import React, { PureComponent } from 'react';
import C3Chart from 'react-c3js';


export default class PieToShow extends PureComponent {
  
  render() {
    const {type} = this.props;
    const size = {
        width: 218,
        height:218
    };
    const dataOne = {
      columns: [
        ['data1', 30],
        ['data2', 40],
        ['data3', 90],
      ],
      colors: {
        data1: '#ff000',
        data2: '#7EA5DD',
        data3: '#457FCF',
      },
      type,
    };

    const dataTwo = {
      label:{show:false},
      columns: [
        ['data1', 30],
        ['data2', 40],
      ],
      colors: {
        data1: '#8ECF4D',
        data2: '#5DBA00',
      },
      type,
    }
    
    return (
      <C3Chart data={type === 'pie' ? dataOne : dataTwo} size={size}/>
    );
  }
}
