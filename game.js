var grid;
var interval;

var color = {'A':'#000000','D':'#fffff'};

var getRowAndColumn = function(){
	var row = document.getElementsByName('row')[0];
	var column = document.getElementsByName('column')[0];
	return [row,column];
}

var drawADiv = function(divToAdd, row, column,gridToChange){
	var cell = gridToChange.table[row][column];

	divToAdd.append("div")
	.style('background-color',color[cell])
	.attr('id', 'd'+row+''+column)
	.on('click',function(){
		var currDiv = d3.select('#d'+row+''+column);

		gridToChange.reverse(row, column);
		cell = gridToChange.table[row][column];
		currDiv.style('background-color',color[cell]);
	});
};

var removeGridTable = function(){
	d3.selectAll('#childDiv').remove();
}

var removeGridAndValue = function(){
	removeGridTable();	
	var values = getRowAndColumn();

	values.forEach(function(element){
		element.value = '';
	});
};

var drawGrid = function(gridToDraw){
	var mainDiv = d3.select('#grid');
	removeGridTable();

	for (var i = 0; i < gridToDraw.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('id','childDiv');
		for (var j = 0; j < gridToDraw.columns; j++) {
			drawADiv(parentDiv,i,j, gridToDraw);
		};
	};
};

var setWidthAndHeight = function(row, column){
	d3.select('#grid')
		.style("width",function(){return (50*column)+column})
		.style("height",function(){return(50*row)}+row);
}

//after click on Ok button
var createGrid = function(){
	var values = getRowAndColumn();
	var row = values[0].value;
	var column = values[1].value;

	grid = new Grid(row, column);
	setWidthAndHeight(row,column);
	drawGrid(grid);
};

var  clearPreviousGrid = function(){
	alert('game over');
	clearInterval(interval);
	removeGridAndValue();
	grid = '';
	return grid;
}


var next = function(){
	if(!grid.isAnyCellAlive())
		return clearPreviousGrid();
	grid = grid.nextGeneration();
	drawGrid(grid);	
}

var start = function(){
	document.getElementById('start').disabled = true;
	document.getElementById('pause').disabled = false;
	interval = window.setInterval(next, 300);
}

var stop = function(){
	clearInterval(interval);
	document.getElementById('pause').disabled = true;
	document.getElementById('start').disabled = false;

}