import React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import {COLORS} from '../../../../constants/color';
import styles from './style';

class PieChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            label: '',
            values: [
              {value: 45, label: 'Hớt tóc'},
              {value: 21, label: 'Làm móng'},
              {value: 15, label: 'Làm mặt'},
              {value: 15, label: 'Gội đầu'},
            ],
            config: {
              colors: COLORS,
              valueTextSize: 20,
              valueTextColor: processColor('transparent'),
              sliceSpace: 0,
              selectionShift: 13,
              valueFormatter: '',

              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      highlights: [{x: 2}],
      description: {
        text: 'This is Pie chart description',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <PieChart
        touchEnabled={false}
        style={styles.pieChart0}
        data={this.state.data}
        legend={this.state.legend}
        extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
        entryLabelColor={processColor('transparent')}
        rotationEnabled={false}
        styledCenterText={{
          text: 'Pie center text!',
          color: processColor('pink'),
          fontFamily: 'HelveticaNeue-Medium',
          size: 20,
        }}
        holeRadius={0}
        holeColor={processColor('#f0f0f0')}
        transparentCircleRadius={0}
        transparentCircleColor={processColor('#f0f0f088')}
        maxAngle={360}
      />
    );
  }
}

export default PieChartScreen;
