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

	isUndefined:function(value){
		return value == undefined;
	},

	addTo: function(tableToAdd, row,column){
		if(!this.isUndefined(this.table[row]))
			tableToAdd.push(this.table[row][column]);
	},

	addNearestDiagonalCells:function(tableToAdd, row,column){
		this.addTo(tableToAdd, row-1, column);
		this.addTo(tableToAdd, row+1,column);
	},

	addAdjacentCells: function(row,column, tableToAdd){
		var left = this.table[row][column-1];
		var right= this.table[row][column+1];

		tableToAdd.push(left, right);
		this.addTo(tableToAdd,row-1,column);
		this.addTo(tableToAdd, row+1,column);

		this.addNearestDiagonalCells(tableToAdd, row,column-1);
		this.addNearestDiagonalCells(tableToAdd, row, column+1);
	},

	countAliveAdjacentCells: function(row,column){
		var adjacentCells = [];
		this.addAdjacentCells(row,column, adjacentCells);

		return adjacentCells.filter(function(cell){
			return cell == 'A';
		}).length;
	},

	rule:function(row,column,aliveCells, list){
		if(aliveCells==2 || aliveCells==3){
			if(aliveCells == 3 && this.table[row][column] == 'D'){
				list[row][column] ='A';
			}
			else
				list[row][column] = this.table[row][column];	
		}
	},


	nextGeneration:function(){
		var newTable = createTable(this.rows, this.columns);
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				var count = this.countAliveAdjacentCells(i,j);
				this.rule(i,j,count, newTable);
			}
		}
		this.table = newTable;
		return this.table;
	}

	
};

module.exports = Grid;