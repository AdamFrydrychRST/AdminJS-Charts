
import { ApiClient } from 'adminjs'
import { LineChartComponent } from './linechart.component'
import React, { useState, useEffect } from 'react'

const Dashboard: React.FC = () => {
  const [data, setData] = useState(null)
  const api = new ApiClient()

  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
      })
  }, [])
  return (
    <LineChartComponent data={data} />
  )
}

export default Dashboard
