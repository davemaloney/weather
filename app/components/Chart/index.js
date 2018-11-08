/**
 *
 * Chart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Container } from 'reactstrap';
import SunCalc from 'suncalc';

import styles from './styles.less';

/* eslint-disable react/prefer-stateless-function */
class Chart extends React.Component {
  static propTypes = {
    timezoneOffset: PropTypes.number.isRequired,
    weather: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      city: PropTypes.shape({
        coord: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
      }),
      list: PropTypes.array,
    }),
  };

  componentDidUpdate(prevProps) {
    if (this.props.weather && this.props !== prevProps) {
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
    const height = 400 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y1 = d3.scaleLinear().range([height, 0]);

    // define the temperature line
    const temperature = d3
      .line()
      .x(i => x(i.date))
      .y(i => y(i.temp));

    // pass in and format the temperature data
    const temperatureData = [];
    this.props.data.list.forEach(forecast => {
      const i = {};
      const GMTdiff = this.props.timezoneOffset;
      const localDiff = -(new Date().getTimezoneOffset() * 60);
      const resultTime = new Date((forecast.dt + GMTdiff - localDiff) * 1000);
      i.date = resultTime;
      i.temp = forecast.main.temp;
      temperatureData.push(i);
    });

    // define the suncurve
    const suncurve = d3
      .line()
      .x(i => x(i.time))
      .y(i => y1(i.altitude));

    const startTime = this.props.data.list[0].dt;
    const endTime = this.props.data.list.slice(-1)[0].dt;
    const GMTdiff = this.props.timezoneOffset;
    const localDiff = -(new Date().getTimezoneOffset() * 60);

    const sunHeight = [];
    let i = startTime;
    while (i <= endTime) {
      const alt = SunCalc.getPosition(
        i * 1000,
        this.props.data.city.coord.lat,
        this.props.data.city.coord.lon,
      ).altitude;
      sunHeight.push({
        time: new Date(i + GMTdiff - localDiff) * 1000,
        altitude: alt,
      });
      i += 1200;
    }

    function getPercent(time) {
      const percent = `${(((time - startTime) / (endTime - startTime)) * 100)
        .toFixed(4)
        .toString()}%`;
      return percent;
    }

    const transitions = [];
    let p = startTime - 86400;
    while (p <= endTime + 86400) {
      const times = SunCalc.getTimes(
        p * 1000,
        this.props.data.city.coord.lat,
        this.props.data.city.coord.lon,
      );
      transitions.push(
        {
          type: 'nauticalDawn',
          hour: times.nauticalDawn,
          time: getPercent(
            Math.round(new Date(times.nauticalDawn).getTime() / 1000),
          ),
          stop: 'navy',
        },
        {
          type: 'goldenHourEnd',
          hour: times.goldenHourEnd,
          time: getPercent(
            Math.round(new Date(times.goldenHourEnd).getTime() / 1000),
          ),
          stop: 'skyblue',
        },
        {
          type: 'goldenHour',
          hour: times.goldenHour,
          time: getPercent(
            Math.round(new Date(times.goldenHour).getTime() / 1000),
          ),
          stop: 'skyblue',
        },
        {
          type: 'nauticalDusk',
          hour: times.nauticalDusk,
          time: getPercent(
            Math.round(new Date(times.nauticalDusk).getTime() / 1000),
          ),
          stop: 'navy',
        },
      );
      p += 86400;
    }

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

    // Create the svg:defs element and the gradient definitions.
    const svgDefs = svg.append('defs');
    const hotToCold = svgDefs
      .append('linearGradient')
      .attr('id', 'hotToCold')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    hotToCold
      .append('stop')
      .attr('class', styles.hot)
      .attr('offset', '0');
    hotToCold
      .append('stop')
      .attr('class', styles.cold)
      .attr('offset', '1');

    // Add a background to represent the sky
    const innerSVG = svg
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    innerSVG
      .append('rect')
      .attr('class', styles.daynightGradient)
      .attr('width', '100%')
      .attr('height', height);

    innerSVG
      .append('defs')
      .append('linearGradient')
      .attr('id', 'daynightGradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .selectAll('stop')
      .data(transitions)
      .enter()
      .append('stop')
      .attr('offset', d => d.time)
      .attr('stop-color', d => d.stop)
      .attr('class', d => d.hour);

    // Scale the range of the temperature data
    const lowTemp = d3.min(temperatureData, d => d.temp);
    const highTemp = d3.max(temperatureData, d => d.temp);
    const padTemp = 0.2 * (highTemp - lowTemp);
    x.domain(d3.extent(temperatureData, d => d.date));
    y.domain([lowTemp - padTemp, highTemp + padTemp]);
    y1.domain([0, Math.PI / 2]);

    // Add the temperature path.
    svg
      .append('path')
      .data([temperatureData])
      .attr('class', styles.line)
      .attr('d', temperature);

    // Add the suncurve path.
    svg
      .append('path')
      .data([sunHeight])
      .attr('class', styles.sunLine)
      .attr('d', suncurve);

    // Add a mask for the area below sunset
    svg
      .append('rect')
      .attr('class', styles.mask)
      .attr('transform', `translate(0,${height})`)
      .attr('width', width)
      .attr('height', margin.bottom);

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
