queue()
  .defer(d3.json, "data.json")
  .await(ready);

var BoxSet = function (){
  var data = [];
  var svgMain;
  var boxContainer;
  var boxes;
  var itr = 14;
  var margin = {
                "top": 25,
                "right": 20,
                "bottom": 30,
                "left": 150
              },
      minWidth = 450,
      width = 1000,
      height = 350;

  var xScalePadding = 0,
      xScaleOuterPadding = 0,
      yScalePadding = 0.3,
      yScaleOuterPadding = 0.25;

  var xScale = d3.scale.ordinal();
  var yScale = d3.scale.ordinal();
  var xAxis = d3.svg.axis();
  var yAxis = d3.svg.axis();

  var weeks = [],
      courses = [];

  var colors = ["#FFB300", "#803E75", "#FF6800",
        "#A6BDD7", "#C10020", "#CEA262",
        "#817066", "#007D34", "#F6768E",
        "#00538A", "#B32851",
        "#93AA00", "#F13A13", "#003380"
      ];

  BoxSet.setData = function (x) {
    if (!arguments.length) return data;
    data = x;
    getWeeks();
    getCourses();
    setAxisScales();
    return BoxSet;
  };

  BoxSet.colors = function (x) {
    if (!arguments.length) return colors;
    colors = x;
    return BoxSet;
  };

  BoxSet.width = function (x) {
    if (!arguments.length) return width;
    if (x < minWidth )
      width = minWidth;
    else
      width = x;
    return BoxSet;
  };

  BoxSet.height = function (x) {
    if (!arguments.length) return height;
    height = x;
    return BoxSet;
  };

  BoxSet.days = function(x) {
    if (!arguments.length) return itr;
    itr = x;
    return BoxSet;
  };

  BoxSet.xScale = function () {
    return xScale;
  };

  BoxSet.yScale = function () {
    return yScale;
  };

  BoxSet.layout = function () {
    setAxisScales();
    svgMake();
    makeBoxContainer();
    makeBoxes();
    makeInnerBoxes(itr);
  };



  function getWeeks() {
    weeks = data[0].items.map(function(d){
      return d.category;
    });
  }

  function getCourses() {
    courses = data.map(function(d){
      return d.title;
    });
  }

  function setAxisScales() {
    // Create the Scale used for X Axis
    xScale.domain(weeks)
      .rangeRoundBands([0, width], xScalePadding, xScaleOuterPadding);
      // Create the Scale used for Y Axis
    yScale.domain(courses)
      .rangeRoundBands([height, 0], yScalePadding, yScaleOuterPadding);
    // Create Axes
    xAxis.scale(xScale)
      .orient("top");
    yAxis.scale(yScale)
      .orient("left");
    return BoxSet;
  }

  function svgMake() {
    svgMain = d3.select("body").append("svg")
      .attr("class", "svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svgMain.append("g")
      .attr("class", "axis")
      .call(xAxis);
    svgMain.append("g")
      .attr("id", "yAxis")
      .attr("class", "axis")
      .call(yAxis);
  }

  function makeBoxContainer() {
    boxContainer = svgMain.selectAll(".boxContainer")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "boxContainer")
      .attr("height", yScale.rangeBand())
      .attr("width", width)
      .attr("transform", function(d, i){
        return "translate(0," + yScale(d.title) + ")";
      });
  }

  function makeBoxes() {
    boxes = boxContainer.selectAll(".box")
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
  }

  function makeInnerBoxes(itr) {
    for( var i = 1; i <= itr; ++i) {
      boxes.append('rect')
      .style("fill", function(d){
        if(d.day == i)
          return colors[(i-1)%colors.length];
        else
          return 'none';
      })
      .style("stroke", "black")
      .attr("id", i)
      .attr("height", yScale.rangeBand() / itr)
      .attr("width", xScale.rangeBand())
      .attr("transform", "translate(" + 0 + "," + i*(yScale.rangeBand() / itr) + ")");
    }
  }

  return BoxSet;
};


function ready(error, students) {
  if (error) throw error;

  var filterStudents = students.filter(function(d) {
    return d.title == 'Computer Science';
  });

  var graph = BoxSet();

  graph.setData(students)
        .layout();

}
