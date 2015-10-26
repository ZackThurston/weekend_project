queue()
  .defer(d3.json, "data.json")
  .await(ready);

function ready(error, students) {
  if (error) throw error;
    console.log(students);

// Dimensional variable settings
}

var BoxSet = function (){
  var data = [];
  var margin = {
    "top": 25,
    "right": 20,
    "bottom": 30,
    "left": 150
  };
  var xScaleInnerPadding = 0,
      xScaleOuterPadding = 0,
      yScaleInnerPadding = 0.3,
      yScaleOuterPadding = 0.25;

  var xScale = d3.scale.ordinal();
  var yScale = d3.scale.ordinal();
  var xAxis = d3.svg.axis();
  var yAxis = d3.svg.axis();




function setAxisScales() {
  // Create the Scale used for X Axis
  xScale.domain(numWeeks)
    .rangeRoundBands([0, 1000], xScaleInnerPadding, xScaleOuterPadding);
    // Create the Scale used for Y Axis
  yScale.domain(courses)
    .rangeRoundBands([350, 0], 0.3, 0.25);
  // Create Axes
  xAxis.scale(xScale)
    .orient("top");
  yAxis.scale(yScale)
    .orient("left");
  }

var colors = ["#FFB300", "#803E75", "#FF6800",
      "#A6BDD7", "#C10020", "#CEA262",
      "#817066", "#007D34", "#F6768E",
      "#00538A", "#B32851",
      "#93AA00", "#F13A13", "#003380"
    ];


numWeeks = getWeeks();
courses = getCourses();





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
//boxes.forEach(function(d){
    for( var i = 1; i <= 14; ++i) {
      boxes.append('rect')
      .style("fill", function(d){
        if(d.day == i)
          return colors[i-1];
        else
          return 'none';
      })
      .style("stroke", "black")
      .attr("id", i)
      .attr("height", yScale.rangeBand() / 14)
      .attr("width", xScale.rangeBand())
      .attr("transform", "translate(" + 0 + "," + i*(yScale.rangeBand() / 14) + ")");
    }
  //});






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
