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

		// if(aliveCells==2 || aliveCells==3){
		// 	if(aliveCells == 3 && this.table[row][column] == 'D'){
		// 		newTable[row][column] ='A';
		// 	}
		// 	else
		// 		newTable[row][column] = this.table[row][column];	
		// }
	},
	
	nextGeneration:function(){
		var newTable = createTable(this.rows, this.columns);
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				var count = adjacentAliveCells(this.table, i,j).length;
				this.needToChange(i,j,count, newTable);
			}
		}
		this.table = newTable;
		return this;
	}
};

module.exports = Grid;