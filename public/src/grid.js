var contains = function(list,cell){
	var cellsLength = list.filter(function(aliveCell){
		return JSON.stringify(aliveCell) == JSON.stringify(cell);
	}).length;

	return cellsLength>0;
}

//create grid
var Grid = function(rows, columns){
	this.rows = rows;
	this.columns = columns;
	this.aliveCellList = [];
}

Grid.prototype = {
	setCellAsAlive:function(rowId, columnId){
		this.aliveCellList.push([rowId, columnId]);
	},

	adjacentAliveCells:function(rowId, columnId){
		var adjacentsTable = [];
			var rowNumbers = [-1,-1,-1,0,0,1,1,1];
			var colNumbers = [-1,0,1,-1,1,-1,0,1];

			for (var i = 0; i < 8; i++) {
				var row = rowId+rowNumbers[i];
				var column = columnId+colNumbers[i];
				var cell = [row, column];

				if(contains(this.aliveCellList,[row, column]))
					adjacentsTable.push([row, column]);
			}
		return adjacentsTable;
	},

	willBeAlive:function(rowId, columnId){
		var cell = [rowId, columnId];
		var count = this.adjacentAliveCells(rowId, columnId).length;
		return (count==3 ||(count==2 && contains(this.aliveCellList, cell)));
	},
	
	nextGeneration:function(){
		var newAliveCellList = [];
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.columns; j++) {
				if(this.willBeAlive(i,j))
					newAliveCellList.push([i,j]);
			}
		}
		this.aliveCellList = newAliveCellList;
		return this;
	}
};

module.exports = Grid;