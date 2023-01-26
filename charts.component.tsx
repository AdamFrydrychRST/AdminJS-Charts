import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import styled from 'styled-components';
import { Box } from '@adminjs/design-system'


export default class BarChartComponent extends React.Component {
  state = {
    movies: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/admin/api/resources/movies/actions/list?direction=desc&sortBy=year&perPage=500`).then((res) => {
      const movies = res.data.records;
      this.setState({ movies });
    });
  }

  generateChart() {
    const years = Array.from(new Set(this.state.movies.map((movie) => movie.params.year))); // Set leaves only unique values, but we need an Array
    const data = years.map(year => { // for every year that we've got
      const scoreArr = this.state.movies.filter(filterItem => filterItem.params.year === year) // find movies from a certain year
                                        .map(mapItem => mapItem.params.people_score) // create an array of all the scores from that year
      return (
      { name: year,
        score: scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length // create average valuefrom the score array
      } )
  })
    
    const Card = styled(Box)`
      display: ${({ flex }): string => (flex ? 'flex' : 'block')};
      color: ${({ theme }): string => theme.colors.grey100};
      text-decoration: none;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid ${({ theme }): string => theme.colors.primary100};
        box-shadow: ${({ theme }): string => theme.shadows.cardHover};
      }
    `
  
    Card.defaultProps = {
      variant: 'white',
      boxShadow: 'card',
    }

    const width = 500
    
    return (
      <Box width={width*1.2} p="lg">
        <Card>
          <LineChart
            width={width}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </Card>
      </Box>
    )
  }

  render() {
    return (
      <>
      {this.generateChart()}
      </>
    )
  }

}