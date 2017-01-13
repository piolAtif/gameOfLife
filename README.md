# Game of life
 'Game of life' is based on [conway game of life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).

## Description
 
  'Game of life' also known as <b>Life</b>.
The game starts by its initial state, requiring no further input.
 
For interacting with the game, create patterns with particular properties.

Those are followings: 

* Game of life is a finite two-dimensional orthogonal grid of square cells.
* Each of which is in one of two possible states, <b>alive or dead</b>.

* Every cell interacts with its <b>eight neighbours</b>, which are the cells those are horizontal, vertical, or diagonal adjacent.

* At each step in time, the following transitions occur:
	1. If cell is alive and has two or three adjacents than it will be alive otherwise it will be dead.
	2. If cell is dead and has three adjacents than it will be alive otherwise it will be dead.

## Start the server
`node server.js`

## How to start the game

To start the game go to given below link in the browser.
```shell
localhost:8000
```
It will open game page

There will be a button start game
Press that, it will start the game.

## Test
`mocha test`

  
 
