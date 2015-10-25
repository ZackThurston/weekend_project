queue()
  .defer(d3.json, "data.json")
  .await(ready);

function ready(error, students) {
  if (error) throw error;
    console.log(students);
}

// // Create the Scale used for X Axis
// var xScale = d3.scale.linear()
//   .domain([0, 8])
//   .rangeRoundBands([0, width], innerPadding, outerPadding);
//
// // Create the Scale used for Y Axis
// var yScale = d3.scale.ordinal()
//   .domain((Computer Science, Mathematics))
//   .range([height, 0]);
