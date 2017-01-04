var assert = require('assert');
var Grid = require('../src/grid.js');

describe('grid',function(){
	
	describe('next generation',function(){
		
		it('should return next generation for a 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.setCellAsAlive(0,0);

			var tableOfGrid = grid.nextGeneration().getTable();
			var expected = [['D']];

			assert.deepEqual(['D'], tableOfGrid[0]);
			assert.deepEqual(expected, tableOfGrid);
		});

		it('should return next generation for a 2*2 grid',function(){
			var grid = new Grid(2,2);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);

			var tableOfGrid = grid.nextGeneration().getTable();

			var expected = [['D','D'],['D','D']];

			assert.deepEqual(expected, tableOfGrid);
			assert.equal('D', tableOfGrid[0][1]);
			assert.equal('D', tableOfGrid[1][1]);
		});

		describe('generate a 3*3 grid',function(){
			//Setup==================================
			var grid = new Grid(3,3);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);
			grid.setCellAsAlive(2,1);

			var tableOfGrid = grid.nextGeneration().getTable();

			//Tests===================================

			it('should return next generation',function(){

				var expected = [['D','D','D'],['A','A','A'],['D','D','D']];

				assert.deepEqual(expected, tableOfGrid);
				assert.deepEqual(['A','A','A'],tableOfGrid[1]);
			});

			it('third generation of grid should be same as initial',function(){
				var tableOfGrid = grid.nextGeneration().getTable();
				var expected = [['D','A','D'],['D','A','D'],['D','A','D']];

				assert.deepEqual(expected, tableOfGrid);
				assert.deepEqual(['D','A','D'], tableOfGrid[0]);
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
				var tableOfGrid = grid.nextGeneration().getTable();
				var expected = [['D','D','D','D'],
								['A','D','A','D'],
								['A','D','D','A'],
								['D','D','A','D']];

				assert.deepEqual(expected, tableOfGrid);
				assert.deepEqual(['D','D','D','D'],tableOfGrid[0]);
			});

			it('should return second generation for given grid',function(){
				var generation = grid.nextGeneration();
				var newGen = generation.nextGeneration();
				var tableOfNewGrid = newGen.getTable();


				var expected = [['D','D','D','D'],
								['D','A','D','D'],
								['D','D','A','A'],
								['D','D','D','D']];

				assert.deepEqual(expected, tableOfNewGrid);
				assert.deepEqual(['D','A','D','D'], tableOfNewGrid[1]);

			});

			it('All cells should be dead in eight th generation',function(){
				var tableOfGrid;
				for (var i = 0; i < 8; i++) {
					tableOfGrid = grid.nextGeneration().getTable();
				}

				var expected = [['D','D','D','D'],
								['D','D','D','D'],
								['D','D','D','D'],
								['D','D','D','D']];

				assert.deepEqual(expected, tableOfGrid);
				assert.deepEqual(['D','D','D','D'], tableOfGrid[0]);

			});
		});
	});
});