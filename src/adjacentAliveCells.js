var isAliveCell = function(table, row, column){
	if(table[row]){
		if(table[row][column] == 'A')
			return true;
	}
	return false;
}

var adjacentAliveCells = function(table, rowId, columnId){
	var adjacentsTable = [];
	var rowNumbers = [-1,-1,-1,0,0,1,1,1];
	var colNumbers = [-1,0,1,-1,1,-1,0,1];

	for (var i = 0; i < 8; i++) {
		var row = rowId+rowNumbers[i];
		var column = columnId+colNumbers[i];

		if(isAliveCell(table,row,column))
			adjacentsTable.push([row, column]);
	}
	return adjacentsTable;
};

// module.exports = adjacentAliveCells;