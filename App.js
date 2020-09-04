import React from "react";
import {StyleSheet, View} from "react-native";
import HighchartsReactNative from "./Chart/ChartComponent";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        // chart: {
        //   animation: false,
        // },
        // plotOptions: {
        //   series: {
        //     animation: false,
        //     states: {
        //       hover: {
        //         lineWidthPlus: 0,
        //       },
        //     },
        //   },
        // },
        // drilldown: {
        //   animation: {
        //     duration: 0,
        //   },
        // },
        series: [
          {
            data: [1, 2, 4],
          },
        ],
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <HighchartsReactNative
          styles={styles.container}
          options={this.state.chartOptions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
  },
});
