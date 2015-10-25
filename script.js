queue()
  .defer(d3.json, "data.json")
  .await(ready);

function ready(error, students) {
  if (error) throw error;
    console.log(students);

// Dimensional variable settings
var margin = {
  "top": 25,
  "right": 20,
  "bottom": 30,
  "left": 150
};

numWeeks = getWeeks();

console.log(numWeeks);
// Create the Scale used for X Axis
var xScale = d3.scale.ordinal()
  .domain(numWeeks)
  .rangeRoundBands([0, 1000], 0.3, 0.25);

// Create the Scale used for Y Axis
var yScale = d3.scale.ordinal()
  .domain(["Computer Science", "Mathematics"])
  .rangeRoundBands([350, 0], 0.3, 0.25);

  // Create Axes
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

    // Create SVG Container for Graph
var svgMain = d3.select("body").append("svg")
  .attr("class", "svg")
  .attr("width", 1000 + margin.left + margin.right)
  .attr("height", 350 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Append X and Y axes to SVG
svgMain.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + 350 + ")")
  .call(xAxis);
svgMain.append("g")
  .attr("id", "yAxis")
  .attr("class", "axis")
  .call(yAxis);

  function getWeeks() {
    return students[0].items.map(function(d){
      return d.category;
    })
  }

}
