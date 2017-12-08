var makeMonthReleaseVis = function(data) {

var width = window.innerWidth/1.1,
    height = 500,
    barHeight = height / 2 - 40 ;

var formatNumber = d3.format("s");

var color = d3.scale.ordinal()
    .domain(["December","January","February","March","April","May","June","July","August","September","October","November"])
    .range(["#99ccff","#0073e6","#003366","#004d00","#00e600","#b3ffb3","#f2ccff","#c61aff","#600080","#99003d","#ff1a75","#ff99c2"]);

var svg = d3.select('#month_release').append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  data.sort(function (a,b) {return d3.ascending(a.open_date_month_number, b.open_date_month_number);});

  var max = d3.max(data, function(d) { return d.count; });
  var extent = d3.extent(data, function(d) { return d.count; });
  var barScale = d3.scale.linear()
      .domain([0,max])
      .range([0, barHeight]);

  var keys = data.map(function(d,i) { return d.open_date_month; });
  var numBars = keys.length;

  var x = d3.scale.linear()
      .domain(extent)
      .range([0, -barHeight]);

  var xAxis = d3.svg.axis()
      .scale(x).orient("left")
      .ticks(5)
      .tickFormat(formatNumber);
      
  var circles = svg.selectAll("circle")
          .data(x.ticks(10))
        .enter().append("circle")
          .attr("r", function(d) {return barScale(d);})
          .style("fill", "none")
          .style("stroke", "black")
          .style("stroke-dasharray", "2,2")
          .style("stroke-width",".5px");

  var arc = d3.svg.arc()
      .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
      .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
      .innerRadius(0);
  
  var segments = svg.selectAll("path")
          .data(data)
        .enter().append("path")
          .each(function(d) { d.outerRadius = 0; })
          .style("fill", function (d) { return color(d.open_date_month); })
          .attr("d", arc);

          console.log(data);

  segments.transition().ease("elastic").duration(1000).delay(function(d,i) {return (25-i)*20;})
          .attrTween("d", function(d,index) {
            var i = d3.interpolate(d.outerRadius, barScale(+d.count));
            return function(t) { d.outerRadius = i(t); return arc(d,index); };
          });

  svg.append("circle")
      .attr("r", barHeight)
      .classed("outer", true)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width","1.5px");

  var lines = svg.selectAll("line")
      .data(keys)
    .enter().append("line")
      .attr("y2", -barHeight - 20)
      .style("stroke", "black")
      .style("stroke-width",".5px")
      .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

  // Labels
  var labelRadius = barHeight * 1.025;

      var labels = svg.selectAll("foo")
        .data(data)
        .enter()
        .append("g")
        .classed("labels", true);

      labels.append("def")
        .append("path")
        .attr("id", (d, i) => "label-path" + i)
        .attr("d", d => "m0 " + -(barScale(max) + 10) + " a" + (barScale(max) + 10) + " " + (barScale(max) + 10) + " 0 1,1 -0.01 0");

      labels.append("text")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("fill", function(d, i) {return "#3e3e3e";})
        .append("textPath")
        .attr("xlink:href", (d, i) => "#label-path" + i)
        .attr("startOffset", function(d, i) {
          return i * 100 / numBars + 50 / numBars + '%';
        })
        .text(function(d) {
          console.log(d);
          return d.open_date_month.toUpperCase();
        });

};