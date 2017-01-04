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

	addTo: function(tableToAdd, r,c){
		if(!this.isUndefined(this.table[r]))
			tableToAdd.push(this.table[r][c]);
	},

	addNearestDiagonalCells:function(tableToAdd, r,c){
		this.addTo(tableToAdd, r-1, c);
		this.addTo(tableToAdd, r+1,c);
	},

	addAdjacentCells: function(r,c, tableToAdd){
		var left = this.table[r][c-1];
		var right= this.table[r][c+1];

		tableToAdd.push(left, right);
		this.addTo(tableToAdd,r-1,c);
		this.addTo(tableToAdd, r+1,c);

		this.addNearestDiagonalCells(tableToAdd, r,c-1);
		this.addNearestDiagonalCells(tableToAdd, r, c+1);
	},

	countAliveAdjacentCells: function(r,c){
		var adjacentCells = [];
		this.addAdjacentCells(r,c, adjacentCells);

		return adjacentCells.filter(function(cell){
			return cell == 'A';
		}).length;
	},

	rule:function(r,c,aliveCells, list){
		if(aliveCells==2 || aliveCells==3){
			if(aliveCells == 3 && this.table[r][c] == 'D'){
				list[r][c] ='A';
			}
			else
				list[r][c] = this.table[r][c];	
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