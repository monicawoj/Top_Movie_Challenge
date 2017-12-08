var makeTitleLengthVis = function(title_length_data) {


var margin = {top: 40, right: 20, bottom: 50, left: 40},
    width = window.innerWidth/1.1 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  //  .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Title Length:</strong> <span style='color:lightgreen'>" + d.title_length + "</span></br><stong># Top 100 Movies:</strong> <span style='color:lightgreen'>" + d.count + "</span";
  })

var svg = d3.select("#title_length").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

  x.domain([0, d3.max(title_length_data, function(d) {return d.title_length; })]);
  y.domain([0, d3.max(title_length_data, function(d) { return d.count; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("y", 26)
      .attr("x", width/2)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Movie Title Length (Characters)")
      .style("font-weight","bold");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count of Top 100 Movies (2014-2016)");

  svg.selectAll(".bar")
      .data(title_length_data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.title_length); })
      .attr("width", (width/d3.max(title_length_data, function(d) {return d.title_length; }))-1)
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    };