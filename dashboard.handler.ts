import { Filter } from 'adminjs'

export const dashboardHandler = async (request, response, context) => {
  // finding resource called movies
  const resource = context._admin.findResource('movies')
  // creating new filter, so that we can see only movies released in 2020
  const filter = new Filter({}, resource)
  // finding all records that match provided filter
  const resourceData = await resource.find(filter, { sort: { sortBy: 'year', direction: 'desc' } }, context)
  const data = resourceData.map((item) => item.toJSON(context.currentAdmin))
  console.log(data)
  const years = Array.from(new Set(data?.map((item) => item.params.year))) // Set leaves only unique values, but we need an Array
  const chartdata = years.map(year => { // for every year that we've got
    const scoreArr = data?.filter(filterItem => filterItem.params.year === year) // find movies from a certain year
                          .map(mapItem => mapItem.params.score) // create an array of all the scores from that year
    return (
      {
        name: year,
        score: scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length // create average valuefrom the score array
      })
  })
  return chartdata
}
