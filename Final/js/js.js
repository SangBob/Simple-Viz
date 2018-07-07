//local server and file update trick
//http-server "F:\DataAnalysis\M7_DataVisualization\Project\Initial"
//http-server -c-1 -p 8081 "F:\DataAnalysis\M7_DataVisualization\Project\Initial

//main title
var Title = d3.select('#title')
	.append("h1")
	.text("Baseball players")
	.attr("align","center");

//introduction
var Header = d3.select('#introduction')
	.append("h2")
	.text("The bar chart below represents the distribution of handedness types of baseball players across the different height groups")
	.attr("align","center");

//description 
var question = d3.select('#description')
	.append("h3")
	.text("The plot below show the three different handedness groups of baseball players found in the database. The majority of players happen to be right handed.\
	Around half of the amount of right handed are actually throwing with the left hand. Very small amount of players are able to perform with both hands.\
	When the height is looked at,  it can be observed approximately even height distribution across these three type of players. The minority of players are in highest and \
	the shortest groups with the vast mayority being in the middle heigh range groups")
	.attr("align","center");

//D3.js setup
scaler = 0.55
var extra = 75,
width = 1200 * scaler,
height = 1200 * scaler;

//plot
var Mysvg1 = d3.select("#plot")
  .append("svg")
  .attr("width", width + extra)
  .attr("height", height + extra);

d3.csv("data/baseball_data_post-processed.csv", function (data) {
	
	var chart = new dimple.chart(Mysvg1, data);
	var xAxis = chart.addCategoryAxis("x", ["handedness"]); // returns (dimple.axis): The newly added axis. 
	xAxis.fontSize = "auto";
	var yAxis = chart.addMeasureAxis("y", ["counting"]);
	yAxis.fontSize = "auto";
	var Series = chart.addSeries("height_grouping", dimple.plot.bar);

	//legend
	//info --> dimple.chart.addLegend(x, y, width, height, horizontalAlign, series)
	var Mylegend = chart.addLegend(width/6, 50, width, 50, horizontalAlign ="left");
	Mylegend.fontSize = "auto";
	Mylegend.fontFamily = "serif";

	//tittle plot
	Mysvg1.append("text")
		.attr("x", chart._xPixels() + 2/3*chart._widthPixels())
		.attr("y", chart._yPixels() + 25)
		.attr("font-size", "1.5em")
		.style("text-anchor", "middle")
		.text("player handedness - across height groups")

	chart.draw();

	//interactiveplot
	//first i set up a copy of the previous plot 
	//plot copy
	var Mysvgcopy = d3.select("#plotcopy")
		.append("svg")
		.attr('id','Mysvgcopy')
		.attr("width", width + extra)
		.attr("height", height + extra);
		
	var chart = new dimple.chart(Mysvgcopy, data);
	var xAxis = chart.addCategoryAxis("x", ["handedness"]); // returns (dimple.axis): The newly added axis. 
	xAxis.fontSize = "auto";
	var yAxis = chart.addMeasureAxis("y", ["counting"]);
	yAxis.fontSize = "auto";
	var Series = chart.addSeries("height_grouping", dimple.plot.bar);

	//legend
	//info --> dimple.chart.addLegend(x, y, width, height, horizontalAlign, series)
	var Mylegend = chart.addLegend(width/6, 50, width, 50, horizontalAlign ="left");
	Mylegend.fontSize = "auto";
	Mylegend.fontFamily = "serif";

	//tittle plot
	Mysvgcopy.append("text")
		.attr("x", chart._xPixels() + 2/3*chart._widthPixels())
		.attr("y", chart._yPixels() + 25)
		.attr("font-size", "1.5em")
		.style("text-anchor", "middle")
		.text("INTERACTIVE: player handedness - across height groups ")

	chart.draw();

	//introduction2
	var Header2 = d3.select('#introduction2')
		.append("h2")
		.text("The next bar chart is interactive, the button transforms the count of baseball players into percentages")
		.attr("align","center");

	//description 2
	var question = d3.select('#description2')
		.append("h3")
		.text("This simple transformation of the y axis allows the user to view the percentages of baseball players across the height ranges \
		in a more convinient way. The visual comparison of the height ranges among each other can be done much easily now")
		.attr("align","center");

	//button
	d3.select("#btn_Transformation").on("click", function() {

		d3.selectAll("#Mysvgcopy").remove();

		var Mysvg2 = d3.select("#plotcopy")
			.append("svg")
			.attr('id','Mysvgcopy')
			.attr("width", width + extra)
			.attr("height", height + extra);

		// interactive function --> dimple.chart.addPctAxis(position, measure, categories)
		var chart = new dimple.chart(Mysvg2, data);
		var xAxis = chart.addCategoryAxis("x", ["handedness"]);
		xAxis.fontSize = "auto";
		var yAxis = chart.addPctAxis("y", ["counting"]);
		yAxis.fontSize = "auto";
		var Series = chart.addSeries("height_grouping", dimple.plot.bar);
		
		//legend
		var Mylegend = chart.addLegend(width/6, 10, width, 50, horizontalAlign ="left");
		Mylegend.fontSize = "auto";
		Mylegend.fontFamily = "serif";

		//tittle plot
		Mysvg2.append("text")
			.attr("x", chart._xPixels() + chart._widthPixels()/2)
			.attr("y", chart._yPixels() - 15)
			.attr("font-size", "1.5em")
			.style("text-anchor", "middle")
			.text("INTERACTIVE: player handedness - across height groups ")
				
		chart.draw();
		yAxis.titleShape.text("Baseball players [%]");
		

	});
});
