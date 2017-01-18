const PATTERN_HEIGHT = 200;
const PATTERN_WIDTH = 200;

var grid;
var interval;
var score = 0;
var initialGrid;

var getRowAndColumn = function(){
	var row = document.getElementsByName('row')[0];
	var column = document.getElementsByName('column')[0];
	return [row,column];
}

var removeGridTable = function(){
	d3.selectAll('.childDiv').remove();
};

var setChildHeightAndWidth = function(parentSize, gridToDraw){
	var childHeight = parentSize[0]/gridToDraw.rows;
	var childWidth = parentSize[1]/gridToDraw.columns;
	return [childHeight, childWidth];
};

var inRange = function(value){
	return value<500?value:500;
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

var color = {'true':function(){return '#000000'},
	'false':function(){return '#ffffff'}};

var colorOf = function(row, column, list){
	var cell = [row, column];
	return color[contains(list, cell)](row+column);
}

var drawADiv = function(divToAdd, row, column,gridToChange, size){
	var cell = [row, column];
	divToAdd.append("div")
	.style('height',size[0]+'px')
	.style('width', size[1]+'px')
	.style('background-color',colorOf(row, column, gridToChange.aliveCellList))
	.on('click',function(){
		gridToChange.reverse(row, column);
		this.style['background-color'] = colorOf(row, column, gridToChange.aliveCellList);
	});
};

// //draw a grid

var drawGrid = function(gridToDraw){
	var mainDiv = d3.select('#grid');

	removeGridTable();

	var parentSize = setParentWidthAndHeight(gridToDraw.rows,gridToDraw.columns);
	var childSize = setChildHeightAndWidth(parentSize,gridToDraw);

	for (var i = 0; i < gridToDraw.rows; i++) {
		var parentDiv = mainDiv.append('div').attr('class','childDiv');
		for (var j = 0; j < gridToDraw.columns; j++) {
			drawADiv(parentDiv,i,j, gridToDraw, childSize);
		};
	};
};

//================================Draw pattern list===========================

var maxAndMinOf = function(list, index){
	return {
		min:Math.min.apply(Infinity,list.map(function(cell){
			return cell[index]
		})),
		max:Math.max.apply(-Infinity,list.map(function(cell){
			return cell[index]
		}))
	};
}

var drawPattern = function(divToAdd, row,column){
	divToAdd.append('div')
		.style('height','20px')
		.style('width','20px')
 		.style('background-color',colorOf(row,column,this));
}

var getRowAndColumnRange = function(list){
	var row = maxAndMinOf(list, 0);
	var column = maxAndMinOf(list, 1);
	return [row, column];
}

var getRange = function(list){
	var range = getRowAndColumnRange(list);
	return [(range[0].max-range[0].min)+1, (range[1].max-range[1].min)+1];
}

var newSizeOfGrid = function(rangeToCheck, rangeOfList){
	var range = getRowAndColumnRange([rangeToCheck, rangeOfList]);
	return [range[0].max, range[1].max];	

}

var createNewGrid = function(gridToChange, table){
		var tableRange = getRange(table);
		var gridRange = [gridToChange['rows'], gridToChange['columns']];

		var range = newSizeOfGrid(gridRange, tableRange);
		gridToChange.rows = range[0];
		gridToChange.columns = range[1];
		gridToChange.aliveCellList = table;
		return gridToChange;
};

var drawPatternGrid = function(gridTable, parentId){
	var mainDiv = d3.select(parentId).append('div').attr('class','patterns')
		.on('click',function(){
			var gridToDraw = createNewGrid(grid, gridTable);
			drawGrid(gridToDraw);
		});

 	var row = maxAndMinOf(gridTable, 0);
 	var column = maxAndMinOf(gridTable, 1);

 	for (var i = row.min; i <= row.max; i++) {
		var parentDiv = mainDiv.append('div').attr('class','pattern_child_div');
 		for (var j = column.min; j <= column.max; j++) {
 			drawPattern.call(gridTable,parentDiv, i,j);		
 		}
 	}
};


var renderPatternList = function(gridList){
	var patterns = d3.select('.pattern_list');
	d3.selectAll('.pattern').remove();
	var counter = 0;
	for(gridName in gridList){
		var pattern_id = 'pattern_'+counter;
		patterns.append('fieldset').attr('id',pattern_id)
		.attr('class','pattern')
		.html('<legend>'+gridName+'</legend>');
		drawPatternGrid(gridList[gridName], '#'+pattern_id);
		counter++;
	}
}

// //=========================Button==========================

//after click on Ok button
var createGrid = function(){
	var values = getRowAndColumn();
	var row = +values[0].value;
	var column = +values[1].value;

	grid = new Grid(row, column);
	initialGrid = null;
	drawGrid(grid);
};

var clearPreviousGrid = function(){
	alert('your score is:'+score);
	score = 0;
	clearInterval(interval);
	makeClickableStartOrPause(false, true);
}


var next = function(){
	if(!(grid.aliveCellList.length>0))
		return clearPreviousGrid();
	score++;
	grid = grid.nextGeneration();
	drawGrid(grid);	
}

var start = function(){
	if(!initialGrid)
		initialGrid = JSON.parse(JSON.stringify(grid));
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

// //xml http request===============================
var transportToZero = function(list){
	var minR = maxAndMinOf(list, 0).min;
	var minC = maxAndMinOf(list, 1).min;
	return list.map(function(cell){
		cell[0] = cell[0]-minR;
		cell[1] = cell[1]-minC;
		return cell;
	})
}

var save = function(){
	if(initialGrid){
		var name = prompt('Enter your name','');
		var cells = transportToZero(initialGrid.aliveCellList);
		var pattern = {name: name, aliveCells:cells}; 
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
	var http =new XMLHttpRequest();
	http.onreadystatechange = function(){
		if(this.readyState == http.DONE && this.status == 200)
			renderPatternList(JSON.parse(this.responseText));
	}

	http.open('GET','/load',true);
	http.send();
}


// //Create default grid

var defaultGrid = function(){
	var values = getRowAndColumn();
	values[0].value = 5;
	values[1].value = 5;
	grid = new Grid(5,5);
	grid.setCellAsAlive(1,2);
	grid.setCellAsAlive(2,2);
	grid.setCellAsAlive(3,2);

	initialGrid = JSON.parse(JSON.stringify(grid));
	drawGrid(grid);
};

window.onload = defaultGrid;