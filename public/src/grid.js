var isEqual = function(cell1, cell2){
	return JSON.stringify(cell1) == JSON.stringify(cell2);
}

var contains = function(list,cell){
	var cellsLength = list.filter(function(aliveCell){
		return isEqual(aliveCell, cell);
	}).length;

	return cellsLength>0;
};

var findIndexOf = function(list, cell){
	return list.findIndex(function(aliveCell){
		return isEqual(aliveCell, cell);
	});
};

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

	reverse:function(rowId, columnId){
		var cell = [rowId, columnId];
	
		if(contains(this.aliveCellList, cell)){
			var index = findIndexOf(this.aliveCellList,cell);
			this.aliveCellList.splice(index,1);
		}
		else
			this.aliveCellList.push(cell);
	},

	neighbourAliveCells:function(rowId, columnId){
		var adjacentsTable = [];
		var rows = [-1,-1,-1,0,0,1,1,1];
		var columns = [-1,0,1,-1,1,-1,0,1];

		for (var i = 0; i < 8; i++) {
			var cell = [rowId+rows[i], columnId+columns[i]];
			if(contains(this.aliveCellList,cell))
				adjacentsTable.push(cell);
		}

		return adjacentsTable;
	},

	willBeAlive:function(rowId, columnId){
		var cell = [rowId, columnId];
		var count = this.neighbourAliveCells(rowId, columnId).length;
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