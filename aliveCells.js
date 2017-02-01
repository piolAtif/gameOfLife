var isEqual = function(cell1, cell2){
	return JSON.stringify(cell1) == JSON.stringify(cell2);
}

var contains = function(list,cell){
	var cellsLength = list.filter(function(aliveCell){
		return isEqual(aliveCell, cell);
	}).length;
	return cellsLength>0;
};


var removeDuplicateCells = function(list){
	return list.filter(function(cell, index, listOf){
		return listOf.indexOf(cell) == index;
	});
};

exports.getPossibleCellsAround = function(cell){
	var rows = [-1,-1,-1,0,0,1,1,1];
	var columns = [-1,0,1,-1,1,-1,0,1];
	var list = [];

	for (var i = 0; i < rows.length; i++) {
		list.push([rows[i]+cell[0],columns[i]+cell[1]]);
	}	
	return list;
};



//================================STATE=====================================
var State = function(cells){
	this.aliveCells = cells;
}

State.prototype = {
	willBeAlive:function(cell,neighbours){
		var isAlive = contains(this.aliveCells, cell);
		return (neighbours == 3 || (neighbours == 2 && isAlive));
	},

	getAliveNeighbourCells: function(cell){
		var list = exports.getPossibleCellsAround(cell);
		return list.filter(function(listCell){
				return contains(this.aliveCells, listCell);
		},this);
	},

	getPossibleAliveCells:function(cell){
		var cells = exports.getPossibleCellsAround(cell);

		return cells.filter(function(cell,i, list){
				var neighbours = this.aliveNeighbourCells(cell, list);
				var count = neighbours.length;
				return this.willBeAlive(cell, count);
		},this);
	},

	aliveForNextGen : function(){
		return this.aliveCells.filter(function(aliveCell){
			var aliveNeighbours = this.getAliveNeighbourCells(aliveCell);
			return this.willBeAlive(aliveCell, aliveNeighbours.length);
		},this)
	},

	nextGeneration:function(){
		var newAliveCellsList = [];
		var aliveCellsFromList = this.aliveForNextGen();
		var aliveCellsAroundList = this.willBeAliveForNextGen();

		this.aliveCells = union(aliveCellsFromList, aliveCellsAroundList);
		return this.aliveCells;
	}
};

exports.State = State;