var assert = require('assert');
var Grid = require('../public/src/grid.js');

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

	describe("willBeAlive",function(){

		describe('when cell is alive',function(){

			it('should return false if 1 neighbouring cell is alive',function(){
				var grid = new Grid(2,2);
				grid.setCellAsAlive(0,0);

				assert.ok(!grid.willBeAlive(0,0));
			});

			it('should return true if 2 adjacent cells are alive',function(){
				var grid = new Grid(2,2);
				grid.setCellAsAlive(0,0);
				grid.setCellAsAlive(1,0);
				grid.setCellAsAlive(0,1);

				assert.ok(grid.willBeAlive(0,1));
				assert.ok(grid.willBeAlive(0,0));
				assert.ok(grid.willBeAlive(1,0));
			});

			it('should return true if 3 adjacent cells are alive',function(){
				var grid = new Grid(2,2);
				grid.setCellAsAlive(0,0);
				grid.setCellAsAlive(0,1);
				grid.setCellAsAlive(1,0);
				grid.setCellAsAlive(1,1);

				assert.ok(grid.willBeAlive(0,0));
				assert.ok(grid.willBeAlive(0,1));
				assert.ok(grid.willBeAlive(1,1));

			});
		});

		describe('when cell is dead',function(){
			
			it('should return false if 1 neighbouring cell is alive',function(){
				var grid = new Grid(2,2);
				assert.ok(!grid.willBeAlive(0,0));
			});

			it('should return false when 2 adjacent cells are alive',function(){
				var grid = new Grid(2,2);
				grid.setCellAsAlive(0,0);
				grid.setCellAsAlive(0,1);

				assert.ok(!grid.willBeAlive(1,0));
				assert.ok(!grid.willBeAlive(1,1));

			});

			it('should return true when 3 adjacent cells are alive',function(){
				var grid = new Grid(2,2);
				grid.setCellAsAlive(0,0);
				grid.setCellAsAlive(0,1);
				grid.setCellAsAlive(1,0);

				assert.ok(grid.willBeAlive(1,1));
			});
		});
	});

	describe('neighbourAliveCells',function(){

		it("should return empty list for a 1*1 table",function(){
			var grid = new Grid(1,1);

			var neighbouringCells = grid.neighbourAliveCells(0,0);

			assert.equal(0,neighbouringCells.length);
		});

		it("should return neighbouring cells list for a 1*2 table",function(){
			var grid = new Grid(1,2);
			grid.setCellAsAlive(0,0);
			
			var _00thCellAdjacents = grid.neighbourAliveCells(0,0);
			var _01thCellAdjacents = grid.neighbourAliveCells(0,1);

			assert.equal(0, _00thCellAdjacents.length);
			assert.equal(1, _01thCellAdjacents.length);
			assert.deepEqual([[0,0]], _01thCellAdjacents);
		});

		it("should return neighbouring cells for a 3*3 table",function(){
			var grid = new Grid(3,3);
			grid.setCellAsAlive(0,0);
			grid.setCellAsAlive(0,2);
			grid.setCellAsAlive(1,1);

			var _00thCellAdjacents = grid.neighbourAliveCells(0,0);
			var _11thCellAdjacents = grid.neighbourAliveCells(1,1);
			var _01thCellAdjacents = grid.neighbourAliveCells(0,1);

			assert.equal(1, _00thCellAdjacents.length);
			assert.deepEqual([[1,1]], _00thCellAdjacents);

			assert.equal(2,_11thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2]], _11thCellAdjacents);

			assert.equal(3, _01thCellAdjacents.length);
			assert.deepEqual([[0,0],[0,2],[1,1]], _01thCellAdjacents);
		});
	});
});