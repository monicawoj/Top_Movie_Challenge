var makeStudioVis = function(data) {
    // Common pattern for defining vis size and margins

    var margin = { top: 20, right: 80, bottom: 60, left: 80 },
        width  = window.innerWidth/1.1 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var format = d3.format(".2s");
    var currency = function(d) { return "$" + format(d); };

    // Add the visualization svg canvas to the vis-container <div>
    var canvas = d3.select("#studio_scatter").append("svg")
        .attr("display","block")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define our scales
    var colorScale = d3.scale.category20();

    var xScale = d3.scale.ordinal()
        .domain(["","A24","BG","BV",'Focus','Fox','FoxS','Free',"IFC","LG/S",'LGF',"ORF","Par.","RAtt.","Rela.","SGem","Sony","STX","TriS","Uni.","W/Dim.","WB","WB (NL)","Wein."])
        .rangePoints([0,width]);

    var yScale = d3.scale.linear()
        .domain([ d3.min(data, function(d) { return d.total_gross; }) - 1,
                  d3.max(data, function(d) { return d.total_gross; }) + 1 ])
        .range([height, 0]); // flip order because y-axis origin is upper LEFT

    // Define our axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
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
        .attr("x", width/2) // x-offset from the xAxis, move label all the way to the right
        .attr("y", 40)    // y-offset from the xAxis, moves text UPWARD!
        .style("text-anchor", "center") // right-justify text
        .text("Studio")
        .style("font-weight","bold");

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
    // it's invisible and its position/contents are defined during mouseover
    var tooltip = d3.select("#studio_scatter").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(d) {
        var color = colorScale(d.studio);
        var html  = d.title + "<br/>" +
                    "<span style='color:" + color + ";'>" + d.studio + "</span><br/>" +
                    "<b>" + currency(d.total_gross) + "</b>";

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
      .attr("r", 5.5) // radius size, could map to another data dimension
      .attr("cx", function(d) { return xScale( d.studio ); })     // x position
      .attr("cy", function(d) { return yScale( d.total_gross ); })  // y position
      .style("fill", function(d) { return colorScale(d.studio); })
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);
};