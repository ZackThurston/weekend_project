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
courses = getCourses();

// Create the Scale used for X Axis
var xScale = d3.scale.ordinal()
  .domain(numWeeks)
  .rangeRoundBands([0, 1000], 0.5, 0.4);

// Create the Scale used for Y Axis
var yScale = d3.scale.ordinal()
  .domain(courses)
  .rangeRoundBands([350, 0], 0.3, 0.25);

  // Create Axes
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top");
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
  .call(xAxis);
svgMain.append("g")
  .attr("id", "yAxis")
  .attr("class", "axis")
  .call(yAxis);


var boxContainer = svgMain.selectAll(".boxContainer")
  .data(students)
  .enter()
  .append("g")
  .attr("class", "boxContainer")
  .attr("height", yScale.rangeBand())
  .attr("width", 1000)
  .attr("transform", function(d, i){
    return "translate(0," + yScale(d.title) + ")";
  });

var boxes = boxContainer.selectAll(".box")
  .data(function(d){
    return d.items;
  })
  .enter()
  .append("g")
  .attr("class", "box")
  .attr("height", yScale.rangeBand())
  .attr("width", xScale.rangeBand())
  .attr("transform", function(d, i){
    return "translate(" + xScale(d.category) + ",0)";
  });

  // for( var i = 0; i < 14; ++i) {
// console.log(boxes);
    boxes.forEach(function(d, i){
      d.forEach(function(d, i){
        console.log(d);
    d3.selectAll(".box").append('rect')
    .style("fill", "purple")
    // .attr("class", "dayBox")
    .attr("height", yScale.rangeBand() / 14)
    .attr("width", xScale.rangeBand())
    .attr("transform", function(d, i){
      return "translate(" + 0+ "," + 0 + ")";
    });
  })
})






  function getWeeks() {
    return students[0].items.map(function(d){
      return d.category;
    })
  }

  function getCourses() {
    return students.map(function(d){
      return d.title;
    })
  }

}
