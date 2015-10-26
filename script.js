queue()
  .defer(d3.json, "data.json")
  .await(ready);


function ready(error, students) {
  if (error) throw error;

  var filterStudents = students.filter(function(d) {
    return d.title == 'Computer Science';
  });

  var graph = BoxSet()
        .setData(students)
        .layout();

}
