var assert = require('assert');
var Grid = require('../src/grid.js');

describe('grid',function(){
	
	describe('next generation',function(){
		
		it('should return next generation for a 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.setCellAsAlive(0,0);

			grid = grid.nextGeneration();
			var expectedGrid = new Grid(1,1);

			assert.deepEqual(expectedGrid, grid);
		});

		it('should return next generation for a 2*2 grid',function(){
			var grid = new Grid(2,2);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);

			grid = grid.nextGeneration();
			var expectedGrid = new Grid(2,2);

			assert.deepEqual(expectedGrid, grid);
		});

		it('should return nextGeneration for a 2*3 grid',function(){
			var grid = new Grid(2,3);
			grid.setCellAsAlive(0,0);
			grid.setCellAsAlive(0,2);
			grid.setCellAsAlive(1,1);

			grid = grid.nextGeneration();
			var expectedGrid = new Grid(2,3);
			expectedGrid.setCellAsAlive(0,1);
			expectedGrid.setCellAsAlive(1,1);

			assert.deepEqual(expectedGrid, grid);

		});

		describe('generate a 3*3 grid',function(){
			//Setup==================================
			var grid = new Grid(3,3);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);
			grid.setCellAsAlive(2,1);

			//Tests===================================

			it('should return next generation',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(3,3);
				expectedGrid.setCellAsAlive(1,0);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(1,2);

				assert.deepEqual(expectedGrid, grid);
			});

			it('third generation of grid should be same as initial',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(3,3);
				expectedGrid.setCellAsAlive(0,1);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(2,1);

				assert.deepEqual(expectedGrid, grid);
			});
		});

		describe('generate a 4*4 grid',function(){
			var grid;
			beforeEach(function(){
				grid = new Grid(4,4);

				grid.setCellAsAlive(1,1);
				grid.setCellAsAlive(1,2);
				grid.setCellAsAlive(2,0);
				grid.setCellAsAlive(2,1);
				grid.setCellAsAlive(2,2);
				grid.setCellAsAlive(3,2);
			});
			

			it('should return first generation of given grid',function(){
				grid.nextGeneration();

				var expectedGrid = new Grid(4,4);
				expectedGrid.setCellAsAlive(1,0);
				expectedGrid.setCellAsAlive(1,2);
				expectedGrid.setCellAsAlive(2,0);
				expectedGrid.setCellAsAlive(2,3);
				expectedGrid.setCellAsAlive(3,2); 

				assert.deepEqual(expectedGrid,grid);
			});

			it('should return second generation for given grid',function(){
				var generation = grid.nextGeneration();
				var newGen = generation.nextGeneration();

				var expectedGrid = new Grid(4,4);
				expectedGrid.setCellAsAlive(1,1);
				expectedGrid.setCellAsAlive(2,2);
				expectedGrid.setCellAsAlive(2,3);

				assert.deepEqual(expectedGrid, grid);
			});

			it('All cells should be dead in eight th generation',function(){
				var grid = new Grid(4,4);

				for (var i = 0; i < 8; i++) {
					grid = grid.nextGeneration();
				}

				var expectedGrid = new Grid(4,4);

				assert.deepEqual(expectedGrid,grid);
			});
		});
	});

	describe("Need to change",function(){
		var grid = new Grid(1,1);
			
		describe('when cell is alive',function(){

			it('should return false if 1 neighbouring cell is alive',function(){
				assert.ok(!grid.willBeAlive('A',1));
			});

			it('should return true if 2 adjacent cells are alive',function(){
				assert.ok(grid.willBeAlive('A',2));
			});

			it('should return false if 4 adjacent cells are alive',function(){
				assert.ok(!grid.willBeAlive('A',4));
			});

			it('should return true if 3 adjacent cells are alive',function(){
				assert.ok(grid.willBeAlive('A',3));
			});
		});

		describe('when cell is dead',function(){
			
			it('should return false if 1 neighbouring cell is alive',function(){
				assert.ok(!grid.willBeAlive('D',1));
			});

			it('should return false when 2 adjacent cells are alive',function(){
				assert.ok(!grid.willBeAlive('D',2));
			});

			it('should return true when 3 adjacent cells are alive',function(){
				assert.ok(grid.willBeAlive('D',3));
			});

			it('should return false if 4 adjacent cells are alive',function(){
				assert.ok(!grid.willBeAlive('D',4));
			});
		});
	});

	describe('next state of',function(){
		describe('dead cells 3*3 grid',function(){
			it("should return same prev state for dead cells",function(){
				var grid = new Grid(3,3);

				assert.equal('D',grid.nextStateOf(0,1));
				assert.equal('D',grid.nextStateOf(1,1));
			});
		});
		
		describe('non dead cells 3*3 grid',function(){
			var grid = new Grid(3,3);

			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					grid.setCellAsAlive(i,j);
				}
			}

			it("should return four edge cells alive",function(){
				assert.equal('A',grid.nextStateOf(0,0));
				assert.equal('A',grid.nextStateOf(0,2));
				assert.equal('A',grid.nextStateOf(2,0));
				assert.equal('A',grid.nextStateOf(2,2));

			});

			it("should return other cells as dead",function(){
				assert.equal('D',grid.nextStateOf(1,0));
				assert.equal('D',grid.nextStateOf(1,1));
				assert.equal('D',grid.nextStateOf(1,2));
				assert.equal('D',grid.nextStateOf(2,1));
				assert.equal('D',grid.nextStateOf(0,1));

			});
		});

	});

	describe('reverse',function(){

		it('should return A as reverse for D cell for 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.reverse(0,0);

			var expectedGrid = new Grid(1,1);
			expectedGrid.setCellAsAlive(0,0); 

			assert.deepEqual(expectedGrid, grid);
		});

		it('should return reverse if some cells reverse double time',function(){
			var grid = new Grid(2,2);
			grid.reverse(0,0);
			grid.reverse(1,1);
			grid.reverse(1,1);

			var expectedGrid = new Grid(2,2);
			expectedGrid.setCellAsAlive(0,0);

			assert.deepEqual(expectedGrid, grid);
		})

		it('should return reverse of each cell in 2*2 grid',function(){
			var grid =  new Grid(2,2);
			grid.reverse(0,0);
			grid.reverse(1,0);

			var expectedGrid = new Grid(2,2);
			expectedGrid.setCellAsAlive(0,0);
			expectedGrid.setCellAsAlive(1,0);

			assert.deepEqual(expectedGrid, grid);
		});
	});

	describe('adjacentAliveCells',function(){

		it("should return empty list for a 1*1 table",function(){
			var grid = new Grid(1,1);

			var neighbouringCells = grid.adjacentAliveCells(0,0);

			assert.equal(0,neighbouringCells.length);
		});

		it("should return neighbouring cells list for a 1*2 table",function(){
			var grid = new Grid(1,2);
			grid.reverse(0,0);
			
			var _00thCellAdjacents = grid.adjacentAliveCells(0,0);
			var _01thCellAdjacents = grid.adjacentAliveCells(0,1);

			assert.equal(0, _00thCellAdjacents.length);
			assert.equal(1, _01thCellAdjacents.length);
			assert.deepEqual([[0,0]], _01thCellAdjacents);
		});

		it("should return neighbouring cells for a 3*3 table",function(){
			var grid = new Grid(3,3);
			grid.reverse(0,0);
			grid.reverse(0,2);
			grid.reverse(1,1);

			var _00thCellAdjacents = grid.adjacentAliveCells(0,0);
			var _11thCellAdjacents = grid.adjacentAliveCells(1,1);
			var _01thCellAdjacents = grid.adjacentAliveCells(0,1);

			assert.equal(1, _00thCellAdjacents.length);
			assert.deepEqual([[1,1]], _00thCellAdjacents);

			assert.equal(2,_11thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2]], _11thCellAdjacents);

			assert.equal(3, _01thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2],[1,1]], _01thCellAdjacents);
		});
	});
});