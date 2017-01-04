var assert = require('assert');
var adjacentAliveCells = require('../src/adjacentAliveCells');


describe('adjacentAliveCells',function(){

		it("should return empty list for a 1*1 table",function(){
			var table = [['A']];
			var neighbouringCells = adjacentAliveCells(table, 0,0);

			assert.equal(0,neighbouringCells.length);
		});

		it("should return neighbouring cells list for a 1*2 table",function(){
			var table = [['A','D']];
			var _00thCellAdjacents = adjacentAliveCells(table,0,0);
			var _01thCellAdjacents = adjacentAliveCells(table,0,1);

			assert.equal(0, _00thCellAdjacents.length);
			assert.equal(1, _01thCellAdjacents.length);
			assert.deepEqual([[0,0]], _01thCellAdjacents);
		});

		it("should return neighbouring cells for a 3*3 table",function(){
			var table = [['A','D','A'],['D','A','D'],['D','D','D']];

			var _00thCellAdjacents = adjacentAliveCells(table,0,0);
			var _11thCellAdjacents = adjacentAliveCells(table,1,1);
			var _01thCellAdjacents = adjacentAliveCells(table,0,1);

			assert.equal(1, _00thCellAdjacents.length);
			assert.deepEqual([[1,1]], _00thCellAdjacents);

			assert.equal(2,_11thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2]], _11thCellAdjacents);

			assert.equal(3, _01thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2],[1,1]], _01thCellAdjacents);
		});
});
