var grid;
var interval;
var score = 0;

var color = {'A':d3.scaleOrdinal(d3.schemeCategory10),
			'D':function(i){return '#ffffff';}
		};

var getRowAndColumn = function(){
	var row = document.getElementsByName('row')[0];
	var column = document.getElementsByName('column')[0];
	return [row,column];
}

var getValue = function(grid, row, column){
	return grid.table[row][column];
}


var removeGridTable = function(){
	d3.selectAll('#childDiv').remove();
};

var setChildHeightAndWidth = function(parentSize, gridToDraw){
	var childHeight = parentSize[0]/gridToDraw.rows
	var childWidth = parentSize[1]/gridToDraw.columns;
	return [childHeight, childWidth];
};

var inRange = function(value){
	if(value<=500)
		return value;
	return 500;
}

var setParentWidthAndHeight = function(row, column){
	var parentHeight = inRange((50*row)+row);
	var parentWidth = inRange((50*column)+column);

	d3.select('#grid')
		.attr("width",parentWidth+'px')
		.attr("height",parentHeight+'px');

	return [parentHeight, parentWidth];
}

var makeClickableStartOrPause = function(startValue, pauseValue){
	document.getElementById('pause').disabled = pauseValue;
	document.getElementById('start').disabled = startValue;
}

//================================Draw part=====================

var drawADiv = function(divToAdd, row, column,gridToChange, size){

	var cell = getValue(gridToChange, row, column);
	divToAdd.append("div")
	.style('background-color',color[cell](row+column))
	.style('height',size[0]+'px')
	.style('width', size[1]+'px')
	.on('click',function(){
		gridToChange.reverse(row, column);
		cell = getValue(gridToChange, row, column);
		this.style['background-color'] = color[cell](row+column);
	});
};

//draw a grid

var drawGrid = function(gridToDraw, divId){
	var mainDiv = d3.select(divId);

	var parentSize = setParentWidthAndHeight(gridToDraw.rows,gridToDraw.columns);
	var childSize = setChildHeightAndWidth(parentSize,gridToDraw);

	for (var i = 0; i < gridToDraw.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('id','childDiv');
		for (var j = 0; j < gridToDraw.columns; j++) {
			drawADiv(parentDiv,i,j, gridToDraw, childSize);
		};
	};
};

//=========================Button==========================

//after click on Ok button
var createGrid = function(){
	var values = getRowAndColumn();
	var row = +values[0].value;
	var column = +values[1].value;

	removeGridTable();

	grid = new Grid(row, column);
	drawGrid(grid,'#grid');
};

var  clearPreviousGrid = function(){
	alert('your score is:'+score);
	score = 0;
	clearInterval(interval);
	makeClickableStartOrPause(false, true);
}


var next = function(){
	if(!grid.isAnyCellAlive())
		return clearPreviousGrid();
	score++;
	grid = grid.nextGeneration();
	removeGridTable();	
	drawGrid(grid,'#grid');	
}

var start = function(){
	makeClickableStartOrPause(true, false);
	interval = window.setInterval(next, 300);
}

var stop = function(){
	clearInterval(interval);
	makeClickableStartOrPause(false, true);
}

var clearGrid = function(){
	createGrid();
};

//===================Method=================
var renderPatternList = function(gridList){
	var pattern_list = document.getElementById('pattern_list');
	gridList.forEach(function(gridToDraw){
		drawGrid(gridToDraw, '#pattern_list');
	});

	return gridList;
}

//xml http request===============================

var save = function(){
	if(grid.isAnyCellAlive()){
		var name = prompt('Enter your name','');
		var pattern = {name: name, grid:grid}; 
		var http = new XMLHttpRequest();
		http.onreadystatechange = function(){
			if(this.readyState == http.DONE && this.status == 200)
				alert(this.responseText);
		}

		http.open('POST','/save',true);
		http.send(JSON.stringify(pattern));
	}
	else
		alert('There is no pattern to save');
};

var load = function(){
	var http = new XMLHttpRequest();
	http.onreadystatechange = function(){
		if(this.readyState == http.DONE && this.status == 200){

			renderPatternList(JSON.parse(this.responseText));
		}
	}

	http.open('GET','/load',true);
	http.send();
}

//Create default grid

var defaultGrid = function(){
	var values = getRowAndColumn();
	values[0].value = 5;
	values[1].value = 5;
	grid = new Grid(5,5);
	grid.setCellAsAlive(1,2);
	grid.setCellAsAlive(2,2);
	grid.setCellAsAlive(3,2);

	removeGridTable();
	setParentWidthAndHeight(5,5);
	drawGrid(grid, '#grid');
};

window.onload = defaultGrid;