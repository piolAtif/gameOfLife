var adjacentAliveCells = require('./adjacentAliveCells');

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

var viceVersaOf = {'A':'D','D':'A'};

var Grid = function(rows, columns){
	this.rows = rows;
	this.columns = columns;
	this.table = createTable(this.rows, this.columns);
}

Grid.prototype = {
	setCellAsAlive:function(rowId, columnId){
		this.table[rowId][columnId] = 'A';
	},

	needToChange:function(cell, aliveAdjacents){
		if(cell == 'A')
			return (aliveAdjacents < 2 || aliveAdjacents > 3);
		return aliveAdjacents == 3;
	},

	nextStateOf:function(rowId, columnId){
		var cell = this.table[rowId][columnId];
		var count = adjacentAliveCells(this.table, rowId, columnId).length;
		if(this.needToChange(cell, count))
			return viceVersaOf[cell];
		return cell;
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

module.exports = Grid;