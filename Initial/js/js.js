// local server and file update trick
//http-server "F:\DataAnalysis\M7_DataVisualization\Project\Initial"//http-server -c-1 -p 8081 "F:\DataAnalysis\M7_DataVisualization\Project\Initial

// main title
    var Title = d3.select('#title')
                                .append("h1")
                                .text("Baseball players")
								.attr("align","center");
// introduction
    var Header = d3.select('#introduction')
                                .append("h2")
                                .text("The bar chart below represents the distribution of handedness baseball players across the different age groups")
                                .attr("align","center");
//description 
    var question = d3.select('#description')
                                .append("h3")
                                .text("The plot below show the three different handedness groups of baseball players found in the database. The majority of players happen to be right handed.\
								Around half of the amount of right handed are actually throwing with the left hand. Very small amount of players are able to perform with both hands.\
								When the age is looked at,  it can be observed an even age distribution across these three type of players. The minority of players are in highest and \
								the shortest groups with the vast mayority being in the middle heigh range groups")
                                .attr("align","center");
       
   /*D3.js setup code*/
    scaler = 0.55
    "use strict";
    var extra = 75,
    width = 1200 * scaler,
    height = 1200 * scaler;
	
// plot
    var Mysvg1 = d3.select("#plot")
              .append("svg")
              .attr("width", width + extra)
              .attr("height", height + extra);

    d3.csv("baseball_data_post-processed.csv", function (data) {
              var chart = new dimple.chart(Mysvg1, data);
              var xAxis = chart.addCategoryAxis("x", ["handedness"]); // returns (dimple.axis): The newly added axis. 
			  xAxis.fontSize = "auto";
              var yAxis = chart.addMeasureAxis("y", ["counting"]);
			  yAxis.fontSize = "auto";
              var Series = chart.addSeries("height_grouping", dimple.plot.bar);
              // Series.addOrderRule(["(64.985, 68.75]",
								   // "(68.75, 72.5]", 
								   // "(72.5, 76.25]",
								   // "(76.25, 80.0]"]);
								   
              // legend
			  // info --> dimple.chart.addLegend(x, y, width, height, horizontalAlign, series)
			  var Mylegend = chart.addLegend(width/6, height+65, width, 50, horizontalAlign ="left");
			  Mylegend.fontSize = "auto";
			  Mylegend.fontFamily = "serif";
              
			  // tittle plot
			  Mysvg1.append("text")
                .attr("x", chart._xPixels() + 2/3*chart._widthPixels())
                .attr("y", chart._yPixels() + 25)
				.attr("font-size", "1.5em")

                .style("text-anchor", "middle")
                .text("player handedness - across age groups")

    chart.draw();
    });
