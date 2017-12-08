//setting up what will be used throughout
d3.csv("movies", function(data) {

d3.select("container").attr("height",window.innerWidth);
d3.select("container").attr("height",window.innerHeight/2);

var formatDate = d3.time.format("%m/%d/%Y");
var month = d3.time.format("%B");
var month_number = d3.time.format("%m");
var year = d3.time.format("%Y");

data = data.map(function(d) {return {
        genre:d["Genre"],
        title:d["Title"].replace(/ *\([^)]*\) */g, ""), //because I later count the title length for analysis, I needed to remove any added (non-essential) pieces in the dataset such as year (2014)
        total_gross:Number(d["Total Gross"].replace(/[^0-9\.-]+/g,"")), //this part was a little tricky, needed to change the $ amount (which was being recognized as a string) into double so as to use this for future manipulation / visualization
        count:1, //added a few columns for later visualization (length of title chart uses both of these added properties)
        title_length:d["Title"].replace(/ *\([^)]*\) */g, "").length,
        studio:d["Studio"],
        Theaters:+d['Theaters'],
        opening_gross: Number(d["Opening Gross"].replace(/[^0-9\.-]+/g,"")),
        open_date: formatDate.parse(d["Open Date"]),
        open_date_month: month(formatDate.parse(d["Open Date"])),
        open_date_month_number: month_number(formatDate.parse(d["Open Date"])),
        open_date_year: +year(formatDate.parse(d["Open Date"])),
            };
        });

var value = "Action";

//setting up data initial value for movies that contain "action" genre element
var filtered_data = data.filter(function (d) { return d.genre.includes(value); });
var title_length_data = d3.nest()
    .key(function(d) {return d.title_length; })
    .rollup(function(v) {return {
      count: v.length,
      total: d3.sum(v, function(d) {return d.total_gross; }),
      avg: d3.mean(v, function(d) {return d.total_gross; })
    }; })
    .entries(filtered_data)
    .map(function(group) {
      return {
        title_length: +group.key,
        count: group.values.count,
        total_gross: group.values.total,
        avg_gross: group.values.avg
      }
    });
var month_data = d3.nest()
    .key(function(d) {return d.open_date_month; })
    .rollup(function(v) {return {
      count: v.length,
      open_date_month_number: d3.mean(v, function(d) {return d.open_date_month_number; }),
      total: d3.sum(v, function(d) {return d.total_gross; }),
      avg: d3.mean(v, function(d) {return d.total_gross; })
    }; })
    .entries(filtered_data)
    .map(function(group) {
      return {
        open_date_month: group.key,
        open_date_month_number: group.values.open_date_month_number,
        count: group.values.count,
        total_gross: group.values.total,
        avg_gross: group.values.avg
      }
    });

    makeTitleLengthVis(title_length_data);
    makeStudioVis(filtered_data);
    makeGrossSalesVis(data);
    makeMonthReleaseVis(month_data);

   //console.log(title_length_data);

//Setting up filter based on the user input. This will filter our data appropriately once the user decides what genre of movie to focus on.
var dropdown_choice = document.getElementById('dropdown');
dropdown_choice.addEventListener("change", onDropdownChange);

function onDropdownChange(){
      var value = this.value;

//removes existing svgs so we can replace them with new data
    d3.select("#studio_scatter").selectAll("*").remove();
    d3.select("#title_length").selectAll("*").remove();
    d3.select("#gross_sales").selectAll("*").remove();
    d3.select("#month_release").selectAll("*").remove();


var filtered_data = data.filter(function (d) { return d.genre.includes(value); });
var title_length_data = d3.nest()
    .key(function(d) {return d.title_length; })
    .rollup(function(v) {return {
      count: v.length,
      total: d3.sum(v, function(d) {return d.total_gross; }),
      avg: d3.mean(v, function(d) {return d.total_gross; })
    }; })
    .entries(filtered_data)
    .map(function(group) {
      return {
        title_length: +group.key,
        count: group.values.count,
        total_gross: group.values.total,
        avg_gross: group.values.avg
      }
    });
var month_data = d3.nest()
    .key(function(d) {return d.open_date_month; })
    .rollup(function(v) {return {
      count: v.length,
      open_date_month_number: d3.mean(v, function(d) {return d.open_date_month_number; }),
      total: d3.sum(v, function(d) {return d.total_gross; }),
      avg: d3.mean(v, function(d) {return d.total_gross; })
    }; })
    .entries(filtered_data)
    .map(function(group) {
      return {
        open_date_month: group.key,
        open_date_month_number: group.values.open_date_month_number,
        count: group.values.count,
        total_gross: group.values.total,
        avg_gross: group.values.avg
      }
    });

   
  makeTitleLengthVis(title_length_data);
  makeStudioVis(filtered_data);
  makeGrossSalesVis(data);
  makeMonthReleaseVis(month_data);    
}

});
