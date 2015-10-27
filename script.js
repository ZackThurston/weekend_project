queue()
  .defer(d3.json, "data.json")
  .await(ready);


function ready(error, students) {
  if (error) throw error;

  var filterStudents = students.filter(function(d) {
    return d.title == 'Computer Science';
  });

  var graph = BoxSet()
        //.rowGap(0)
        .rowGap(0.1)
        //.columnGap(0.5)
        .setData(students)
        //.setData(filterStudents)
        .layout();

  var another = BoxSet()
              .rowGap(0.1)
              .height(200)
              .setData(students)
              .layout();

}
