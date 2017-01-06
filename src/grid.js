// var adjacentAliveCells = require('./adjacentAliveCells');

var createTable = function(rows, columns){
	var table = [];
	for (var i = 0; i < rows; i++) {
		table[i] = [];
		for (var j = 0; j < columns; j++) {	
			table[i][j] = 'D';	
		}
	}
	return table;
}

var Grid = function(rows, columns){
	this.rows = rows;
	this.columns = columns;
	this.table = createTable(this.rows, this.columns);
}

Grid.prototype = {
	setCellAsAlive:function(rowId, columnId){
		this.table[rowId][columnId] = 'A';
	},

	willBeAlive:function(cell, aliveAdjacents){
		return (aliveAdjacents==3 ||(aliveAdjacents==2 && cell=='A'))
	},

	nextStateOf:function(rowId, columnId){
		var cell = this.table[rowId][columnId];
		var count = adjacentAliveCells(this.table, rowId, columnId).length;
		if(this.willBeAlive(cell, count))
			return 'A';
		return 'D'
	},

	isAnyCellAlive:function(){
		var count = 0;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				if(this.table[i][j] == 'A')
					return true;
			}
		}
		return false;
	},
	
	nextGeneration:function(){
		var newTable = createTable(this.rows, this.columns);
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				newTable[i][j] = this.nextStateOf(i,j);
			}
		}
		this.table = newTable;
		return this;
	}
};

// module.exports = Grid;