var grid;
var interval;

var color = {'A':'#000000','D':'#fffff'};

var drawADiv = function(divToAdd, row, column,gridToChange){
	var cell = gridToChange.table[row][column];

	divToAdd.append("div")
	.style('background-color',color[cell])
	.attr('id', 'd'+row+''+column)
	.on('click',function(){
		var currDiv = d3.select('#d'+row+''+column);
		gridToChange.setCellAsAlive(row, column);
		currDiv.style('background-color','black');
	});
};

var removeGridTable = function(){
	d3.selectAll('#childDiv').remove();
}

var drawGrid = function(gridToDraw){
	var mainDiv = d3.select('#grid');
	removeGridTable();

	for (var i = 0; i < gridToDraw.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('id','childDiv');
		for (var j = 0; j < gridToDraw.columns; j++) {
			drawADiv(parentDiv,i,j, gridToDraw);
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
	if(grid.isAnyCellAlive()){
		grid = grid.nextGeneration();
		drawGrid(grid);	
	}
	else{
		alert('game over');
		clearInterval(interval);
		grid = '';
		removeGridTable();
	}
	
}

var start = function(){
	interval = setInterval(next, 1000);
}