/**
 *
 * Chart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Container } from 'reactstrap';

import styles from './styles.less';

/* eslint-disable react/prefer-stateless-function */
class Chart extends React.Component {
  static propTypes = {
    timezoneOffset: PropTypes.number.isRequired,
    weather: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      city: PropTypes.object,
      list: PropTypes.array,
    }),
  };

  componentDidUpdate() {
    if (this.props.weather) {
      this.drawChart();
    }
  }

  drawChart() {
    // modifying example from https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915
    // clear out the space
    d3.select('#chart svg').remove();

    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 100, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // define the line
    const valueline = d3
      .line()
      .x(i => x(i.date))
      .y(i => y(i.temp));

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // pass in and format the data
    const data = [];
    this.props.data.list.forEach(forecast => {
      const i = {};
      const GMTdiff = this.props.timezoneOffset;
      const localDiff = -(new Date().getTimezoneOffset() * 60);
      const resultTime = new Date((forecast.dt + GMTdiff - localDiff) * 1000);
      i.date = resultTime;
      i.temp = forecast.main.temp;
      data.push(i);
    });

    // Scale the range of the data
    const lowTemp = d3.min(data, d => d.temp);
    const highTemp = d3.max(data, d => d.temp);
    const padTemp = 0.2 * (highTemp - lowTemp);
    x.domain(d3.extent(data, d => d.date));
    y.domain([lowTemp - padTemp, highTemp + padTemp]);

    // Add the valueline path.
    svg
      .append('path')
      .data([data])
      .attr('class', styles.line)
      .attr('d', valueline);

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat(d3.timeFormat('%a %H %p'))
          .ticks(40),
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));
  }

  render() {
    return (
      <Container>
        <div className={styles.chart} id="chart" />
      </Container>
    );
  }
}

export default Chart;
