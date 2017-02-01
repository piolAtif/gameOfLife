var assert = require('assert');
var aliveCells = require('../aliveCells');

var assert = require('assert');

describe.only('get possible cells around',function(){
	it("should return possible cells around a given cell",function(){
		var cells = aliveCells.getPossibleCellsAround([0,0]);
		var expected = [[-1,-1],[-1,0],[-1,1],
						[0,-1],		  [0,1],
						[1,-1],[1,0],[1,1]];

		assert.deepEqual(expected, cells);
	});

	it("should return possible cells for 4,2 coordinates' cell",function(){
		var cells = aliveCells.getPossibleCellsAround([4,2]);
		var expected = [[3,1],[3,2],[3,3],
						[4,1],	    [4,3],
						[5,1],[5,2],[5,3]];

		assert.deepEqual(expected, cells);
	});

	it("should return possible cells for -1,-1 coordinates' cell",function(){
		var cells = aliveCells.getPossibleCellsAround([-1,-1]);
		var expected = [[-2,-2],[-2,-1],[-2,0],
						[-1,-2],	    [-1,0],
						[0,-2],[0,-1],[0,0]];

		assert.deepEqual(expected, cells);
	});	
});

describe.only('alive cells around',function(){
	var State = aliveCells.State;

	it("should return 0 for an alive cell in state",function(){
		var initialState = new State([0,0]);
		var aliveNeighbours = initialState.getAliveNeighbourCells([0,0]);

		assert.equal(0,aliveNeighbours.length);
	});

	it("should return 4 for dead 1,1 if four cells are alive",function(){
		var list = [[0,0],[0,1],[0,2],[1,0]];
		var state = new State(list);
		var aliveNeighbours = state.getAliveNeighbourCells([1,1]);
		assert.deepEqual(list, aliveNeighbours);
	});

	describe('sum of neighbour alive cells for blinker pattern',function(){
		var state = new State([[0,0],[0,1],[0,2]]);
		
		it("should return two alive cells for 0,1 coordinates' cell",function(){
			var aliveNeighbours = state.getAliveNeighbourCells([0,1]);
			var expected = [[0,0],[0,2]];

			assert.deepEqual(expected, aliveNeighbours);
		});

		it("should return one alive for given coordinates' cell",function(){
			var _00AliveNeighbours = state.getAliveNeighbourCells([0,0]);
			var _02AliveNeighbours = state.getAliveNeighbourCells([0,2]);

			assert.deepEqual([[0,1]], _00AliveNeighbours);
			assert.deepEqual([[0,1]], _02AliveNeighbours);
		});

		it("should return 3 for dead -1,1 coordinates' cell",function(){
			var aliveNeighbours = state.getAliveNeighbourCells([-1,1]);
			var expected = [[0,0],[0,1],[0,2]];
			assert.deepEqual(expected, aliveNeighbours);
		});
	});
});

describe.only('willBeAlive',function(){
	var State = aliveCells.State;

	describe('when cell is alive',function(){

		it("should return false if 1 neighbouring cell is alive",function(){
			var state = new State([[0,0],[0,1]]);
			assert.ok(!state.willBeAlive([[0,0],1]));
		});

		it("should return false if no neighbouring cell is alive",function(){
			var state = new State([0,0]);
			assert.ok(!state.willBeAlive([0,0],0));
		});

		it("should return true if 2 neighbouring cells are alive",function(){
			var state = new State([0,0],[0,1],[0,2]);
			assert.ok(!state.willBeAlive([0,1],2));
		});

		it("should return true if 3 neighbouring cells are alive",function(){
			var state = new State([[0,0],[0,1],[0,2],[-1,0]]);
			assert.ok(state.willBeAlive([0,0],3));
		});

		it("should return false if 4 neighbouring cells are alive",function(){
			var state = new State([[0,0],[0,1],[0,2]]);
			assert.ok(!state.willBeAlive([0,0],4));
		});

	});

	describe('when cell is dead',function(){
		
		it("should return false if 1 neighbouring cell is alive",function(){
			var state = new State([[0,0]]);
			assert.ok(!state.willBeAlive([0,1],1));
		});

		it("should return false if 2 neighbouring cells are alive",function(){
			var state = new State([[0,0],[0,1]]);
			assert.ok(!state.willBeAlive([-1,0],2));
		});

		it("should return true if 3 neighbouring cells are alive",function(){
			var state = new State([[0,0][0,1],[0,2]]);
			assert.ok(state.willBeAlive([-1,1],3));
		});
	});
});


describe.only('alive for next generation',function(){
	var State = aliveCells.State;
	
	it("should return empty list from an alive cell's list",function(){
		var state = new State([[0,0]]);
		assert.equal(0, state.aliveForNextGen().length);
	});

	it("should return empty list if there is no alive cell",function(){
		var state = new State([]);
		assert.equal(0, state.aliveForNextGen().length);
	});

	it("should return empty list if list contains two alive cells",function(){
		var state = new State([[0,0],[0,1]]);
		assert.equal(0, state.aliveForNextGen().length);
	});

	it("should return alive cells list for given list",function(){
		var state = new State([[0,0],[0,1],[0,2]]);
		assert.deepEqual([[0,1]], state.aliveForNextGen());
	});

	it("should return 0 if each cell doesn't have a alive neighbour",function(){
		var state = new State([[-1,0],[1,-1],[1,1]]);
		assert.equal(0, state.aliveForNextGen().length);
	});

	it("should return same list for given block pattern",function(){
		var list = [[0,0],[0,1],[1,0],[1,1]];
		var state = new State(list);
		assert.deepEqual(list, state.aliveForNextGen());
	});

	it("should return alive cells list for given glider pattern",function(){
		var glider = [			  [-1,1],
					  [0,-1],	  [0,1],
					  	  	[1,0],[1,1]];

		var state = new State(glider);
		var expected = [[-1,0],	
								[0,1],[0,2],
						[1,0],[1,1]];

		assert.deepEqual(expected, state.aliveForNextGen());
	});
});


describe('get possible alive cells',function(){
	var State = aliveCells.State;
	
	it("should return empty list for one alive cell",function(){
		var state = new State([[0,0]]);
		assert.equal(0, state.getPossibleAliveCells([0,0]).length);

	});

	it("should return list of alive cells for given alive cell",function(){
		var state = new State([[0,0],[0,1],[0,2]]);

		assert.deepEqual([[0,1]],state.getPossibleAliveCells([0,0]));

	});

});

describe('next generation',function(){
	var State = aliveCells.State;
	it("should return next generation of one alive cell",function(){
		var initialState= new State([0,0]);
		assert.equal(0, initialState.nextGeneration().length);
	});

	it("should return vertical for horizontal three alive cells",function(){
		var pattern = [[0,0],
					   [1,0],
					   [2,0]];

		var initialState = new State(pattern);
		var expected = [[1,-1],[1,0],[1,2]];
		assert.deepEqual(expected, initialState.nextGeneration());
	});
});

