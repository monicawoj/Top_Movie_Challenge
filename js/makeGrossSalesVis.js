var makeGrossSalesVis = function(data) {
    
    var value = document.getElementById('dropdown').value;
    console.log(value);

    // Common pattern for defining vis size and margins
    var margin = { top: 20, right: 50, bottom: 50, left: 70 },
        width  = window.innerWidth/1.1 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var format = d3.format(".2s");
    var currency = function(d) { return "$" + format(d); };

    // Add the visualization svg canvas to the vis-container <div>
    var canvas = d3.select("#gross_sales").append("svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define our scales

    var xScale = d3.scale.linear()
        .domain([ d3.min(data, function(d) { return d.opening_gross; }) - 1,
                  d3.max(data, function(d) { return d.opening_gross; }) + 1 ])
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([ d3.min(data, function(d) { return d.total_gross; }) - 1,
                  d3.max(data, function(d) { return d.total_gross; }) + 1 ])
        .range([height, 0]);

    // Define our axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function(d) { return "$" + format(d); })
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function(d) { return "$" + format(d); })
        .orient('left');

    // Add x-axis to the canvas
    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width) // x-offset from the xAxis, move label all the way to the right
        .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
        .style("text-anchor", "end") // right-justify text
        .text("Opening Weekend Gross Sales ($)");

    // Add y-axis to the canvas
    canvas.append("g")
        .attr("class", "y axis") // .orient('left') took care of axis positioning for us
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)") // although axis is rotated, text is not
        .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
        .style("text-anchor", "end")
        .text("Total Gross Sales ($)");

    // Add the tooltip container to the vis container
    var tooltip = d3.select("#gross_sales").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(d) {
        var html  = d.title + "<br/>" +
                    "Opening Weekend Gross Sales:" + currency(d.opening_gross) + "<br/>" +
                    "Total Gross Sales:" + currency(d.total_gross);

        tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
          .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!

    };
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

    // Add data points!
    canvas.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {
            if (d.genre.includes(value)) {return 5}
            else    { return 3 }
        ;})
      .attr("cx", function(d) { return xScale( d.opening_gross ); })     // x position
      .attr("cy", function(d) { return yScale( d.total_gross ); })  // y position
      .style("fill", function(d) {
            if (d.genre.includes(value)) {return "DodgerBlue"}
            else    { return "DarkGray" }
        ;})
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);
};
