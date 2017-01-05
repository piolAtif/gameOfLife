var viceVersa = {'D':'A','A':'D'};

var drawADiv = function(divToAdd, rangeFrom, rangeTo){
	divToAdd.append("div")
	.style("width",50+'px')
	.style("height",50+'px')
	.text("D")
	.attr('id', 'd'+rangeFrom+''+rangeTo)
	.on('click',function(){
		var currDiv = d3.select('#d'+rangeFrom+''+rangeTo);
		var content = viceVersa[currDiv.text()];
		currDiv.text(content);
	});
}


var createGrid = function(){
	var row = document.getElementsByName('row')[0].value;
	var column = document.getElementsByName('column')[0].value;
	var grid = new Grid(row, column);

	var mainDiv = d3.select('#grid')
		.style("width",function(){return (50*column)+column})
		.style("height",function(){return(50*row)}+row);

	for (var i = 0; i < grid.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('id','childDiv');
		for (var j = 0; j < grid.columns; j++) {
			drawADiv(parentDiv,j,i);
		}
	}
}