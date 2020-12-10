import React from 'react';
import {processColor, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

class LineChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        dataSets: [
          {
            config: {
              // mode: 'CUBIC_BEZIER',
              // drawValues: false,
              lineWidth: 3,
              drawCircles: true,
              circleColor: processColor('red'),
              drawCircleHole: false,
              circleRadius: 5,
              color: processColor('blue'), // egdge
              drawFilled: true,
            },
            label: '',

            values: [
              {x: 4, y: 135},
              {x: 5, y: 0.88},
              {x: 6, y: 0.77},
              {x: 7, y: 105},
            ],
          },
        ],
      },

      marker: {
        enabled: true,
        digits: 1,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 0,
        position: 'BOTTOM',
      },
    };
  }

  render() {
    return (
      <LineChart
        touchEnabled={false}
        style={styles.chart}
        data={{
          dataSets: [
            {
              config: {
                mode: 'LINEAR',
                // drawValues: false,
                lineWidth: 3,
                drawCircles: true,
                circleColor: processColor('red'),
                drawCircleHole: false,
                circleRadius: 5,
                color: processColor('blue'), // egdge
                drawFilled: true,
              },
              label: '',

              values: [
                {x: 4, y: 135},
                {x: 5, y: 0.88},
                {x: 6, y: 0.77},
                {x: 7, y: 105},
              ],
            },
          ],
        }}
        legend={{enabled: false}}
        marker={this.state.marker}
        xAxis={this.state.xAxis}
        yAxis={{
          left: {
            axisMinimum: 0,
            // drawGridLines: false,
            // textColor: processColor('gray'),
            // drawAxisLine: false,
          },
          right: {
            // enabled: false,
            // position: 'OUTSIDE_CHART',
            // maxWidth: 50,
            // minWidth: 20,
          },
        }}
        borderColor={processColor('#000')}
        borderWidth={1}
        drawBorders={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  chart: {height: 500},
});

export default LineChartScreen;
