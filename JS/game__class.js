class GameModel{
	constructor(){
		//width of the game field in number of cells
		this.gameW = 50;
		//height of the game field in number of cells
		this.gameH = 50;
		//matrix ( game field )
		this.Field = [];
	} 
	
}


class GameView{
	constructor( model, control ){
		this.Model = model;
		this.Control = control;
	}

	//create game field ( in the div #gameField )
	createGameField( gameW, gameH ){
		var table = this.createTable();
		for( var j = 0; j < gameH; j++ ){
			var tr = this.createTableRow();
			for( var i = 0; i < gameW; i++ ){
				var td = this.createTableCell();
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
	createTableCell(){
		var context = this;
		return $( "<td>", {
			class: "game-table__td",
			append: $( "<div>", {
				class: "game-cell",
				on:{
					click: function(){
						context.moveSelectorTo( $(this) )
					},
					dblclick: function(){
						
					}				
				}
			} )
		} )
	}


	moveSelectorTo( bl ){
		var sel = $( gameSelector );
		var off = bl.offset();
		off.left -= 3; off.top -= 3;	//border width
		sel.offset( off )
	}
}