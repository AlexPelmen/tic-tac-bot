class Player{
	constructor( char, cssClass ){
		this.char = char;
		this.cssClass = cssClass;
	}
}

const FIRST_PLAYER = new Player( "&#9675;", "figureX" );
const SECOND_PLAYER = new Player( "&#128936;", "figureO" );

class GameModel{
	constructor(){
		//width of the game field in number of cells
		this.gameW = 50;
		//height of the game field in number of cells
		this.gameH = 50;
		//matrix ( game field )
		this.Field = this.initField();
		//what figure would be set in the next step
		this.whoPlays = FIRST_PLAYER;
		//the cell, which is currently targeted by selector
		this.selectedCell = null;
	}

	documentLoad(){
		//just select first one
		$( $( ".game-cell" )[0] ).click();
	}

	initField(){
		var Field = [];
		for( var i = 0; i < this.gameH; i++ ){
			Field[i] = [];
			for( var j = 0; j < this.gameW; j++ )
				Field[i][j] = 0;
		}
		return Field;		
	}

	//set the figure in the matrix
	setFigure( bl ){		
		var x = bl.attr( 'index-i' );
		var y = bl.attr( 'index-j' );
		this.Field[x][y] = this.whoPlays.char;	
		console.dir([x,y])	
	}

	selectFigure( bl ){
		this.selectedCell = bl;
	}
	
}


class GameView{

	//create game field ( in the div #gameField )
	createGameField( gameW, gameH ){
		var table = this.createTable();
		for( var j = 0; j < gameH; j++ ){
			var tr = this.createTableRow();
			for( var i = 0; i < gameW; i++ ){
				var td = this.createTableCell( i, j );				
				tr.append( td );
			}
			table.append( tr );
		}
		$( gameField ).append( table );
	}

	//<table>
	createTable(){
		return $( "<table>", { 
			class: "game-table" 
		} );
	}

	//<tr>
	createTableRow(){
		return $( "<tr>", {
			class: "game-table__tr" 
		} )
	}

	//<td> with <div> inside
	createTableCell( i, j ){
		var td = $( "<td>", {
			class: "game-table__td",
		} )
		var div = $( "<div>", {
			class: "game-cell",
			on:{
				click: function(){ 
					Control.tableCellClick.call( this )
				}	
			}
		} )
		div.attr( "index-i", i );
		div.attr( "index-j", j );
		td.append( div );
		return td;
	}

	//target div #gameSelector to the current cell
	moveSelectorTo( bl ){
		var sel = $( gameSelector );
		var off = bl.offset();
		off.left -= 3; off.top -= 3;	//border width
		sel.offset( off )
	}

	//draw a figure in the block
	setFigure( bl ){
		bl.html( Model.whoPlays.char );
		bl.addClass( Model.whoPlays.cssClass );
	}
}



class GameControl{

	documentLoad(){
		//set ondblclick listner on selector
		$( "#gameSelector" ).dblclick( this.selectorDblClick );
	}

	tableCellClick(){
		var bl = $(this);
		View.moveSelectorTo( bl );
		Model.selectFigure( bl );
	}

	selectorDblClick(){
		var bl = $( Model.selectedCell );	
		Model.setFigure( bl );
		View.setFigure( bl );
	}
}