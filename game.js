var grid;

var drawADiv = function(divToAdd, rangeFrom, rangeTo,gridToChange){
	
	divToAdd.append("div")
	.style("width",50+'px')
	.style("height",50+'px')
	.text(gridToChange.table[rangeFrom][rangeTo])
	.attr('id', 'd'+rangeFrom+''+rangeTo)
	.on('click',function(){
		var currDiv = d3.select('#d'+rangeFrom+''+rangeTo);
		gridToChange.setCellAsAlive(rangeFrom, rangeTo);
		currDiv.text('A');
	});
};

var drawGrid = function(gridToDraw){
	var table = gridToDraw.table;

	var mainDiv = d3.select('#grid');
	d3.selectAll('#childDiv').remove();

	for (var i = 0; i < gridToDraw.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('id','childDiv');
		for (var j = 0; j < gridToDraw.columns; j++) {
			drawADiv(parentDiv,j,i, gridToDraw);
		};
	};
}


var createGrid = function(){
	var row = document.getElementsByName('row')[0].value;
	var column = document.getElementsByName('column')[0].value;
	grid = new Grid(row, column);

	d3.select('#grid')
		.style("width",function(){return (50*column)+column})
		.style("height",function(){return(50*row)}+row);

	drawGrid(grid);

};


var next = function(){
	grid = grid.nextGeneration();
	drawGrid(grid);
}

var start = function(){
	window.setInterval(next, 1000);
}