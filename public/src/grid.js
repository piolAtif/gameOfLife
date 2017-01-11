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

	reverse:function(rowId,columnId){
		var cell = this.table[rowId][columnId];
		this.table[rowId][columnId] = viceVersaOf[cell];
	},

	willBeAlive:function(cell, aliveAdjacents){
		return (aliveAdjacents==3 ||(aliveAdjacents==2 && cell=='A'))
	},

	nextStateOf:function(rowId, columnId){
		var cell = this.table[rowId][columnId];
		var count = this.adjacentAliveCells(rowId, columnId).length;
		if(this.willBeAlive(cell, count))
			return 'A';
		return 'D'
	},

	isAnyCellAlive:function(){
		var count = 0;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				if(this.isAliveCell(i,j))
					return true;
			}
		}
		return false;
	},

	isAliveCell:function(row, column){
		if(this.table[row]){
			if(this.table[row][column] == 'A')
				return true;
		}
		return false;
	},

	adjacentAliveCells:function(rowId, columnId){
		var adjacentsTable = [];
		var rowNumbers = [-1,-1,-1,0,0,1,1,1];
		var colNumbers = [-1,0,1,-1,1,-1,0,1];

		for (var i = 0; i < 8; i++) {
			var row = rowId+rowNumbers[i];
			var column = columnId+colNumbers[i];

			if(this.isAliveCell(row,column))
				adjacentsTable.push([row, column]);
		}
		return adjacentsTable;
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