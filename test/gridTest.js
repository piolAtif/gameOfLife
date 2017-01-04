var assert = require('assert');
var Grid = require('../src/grid.js');

describe('grid',function(){
	
	describe('next generation',function(){
		var tableOf = function(grid){
			return grid.nextGeneration().getTable();
		};
		
		it('should return next generation for a 1*1 grid',function(){
			var grid = new Grid(1,1);
			grid.setCellAsAlive(0,0);

			var generation = tableOf(grid);
			var expected = [['D']];

			assert.deepEqual(['D'], generation[0]);
			assert.deepEqual(expected, generation);
		});

		it('should return next generation for a 2*2 grid',function(){
			var grid = new Grid(2,2);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);

			var generation = tableOf(grid);

			var expected = [['D','D'],['D','D']];

			assert.deepEqual(expected, generation);
			assert.equal('D', generation[0][1]);
			assert.equal('D', generation[1][1]);
		});

		describe('generate a 3*3 grid',function(){
			//Setup==================================
			var grid = new Grid(3,3);
			grid.setCellAsAlive(0,1);
			grid.setCellAsAlive(1,1);
			grid.setCellAsAlive(2,1);

			var generation = tableOf(grid);

			//Tests===================================

			it('should return next generation',function(){

				var expected = [['D','D','D'],['A','A','A'],['D','D','D']];

				assert.deepEqual(expected, generation);
				assert.deepEqual(['A','A','A'],generation[1]);
			});

			it('third generation of grid should be same as initial',function(){
				var nextGen = tableOf(grid);
				var expected = [['D','A','D'],['D','A','D'],['D','A','D']];

				assert.deepEqual(expected, nextGen);
				assert.deepEqual(['D','A','D'], nextGen[0]);
			});
		});

		describe('generate a 4*4 grid',function(){
			var grid = new Grid(4,4);
			grid.setCellAsAlive(1,1);
			grid.setCellAsAlive(1,2);
			grid.setCellAsAlive(2,0);
			grid.setCellAsAlive(2,1);
			grid.setCellAsAlive(2,2);
			grid.setCellAsAlive(3,2);

			it('should return first generation of given grid',function(){
				var generation = tableOf(grid);
				var expected = [['D','D','D','D'],
								['A','D','A','D'],
								['A','D','D','A'],
								['D','D','A','D']];

				assert.deepEqual(expected, generation);
				assert.deepEqual(['D','D','D','D'],generation[0]);
			});

			it('All cells should be dead in eight th generation',function(){
				var generation;
				for (var i = 0; i < 8; i++) {
					generation = tableOf(grid);
				}

				var expected = [['D','D','D','D'],
								['D','D','D','D'],
								['D','D','D','D'],
								['D','D','D','D']];

				assert.deepEqual(expected, generation);
				assert.deepEqual(['D','D','D','D'], generation[0]);

			});
		});
	});
});