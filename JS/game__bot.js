class GameBot{

	constructor(){
		this.botFig = '○';	//○ or ×
	}

	makeMove(){
		if( Model.whoPlays.char == this.botFig ){
			var go = this.whereToGo();
			console.log( "Go to " + go[0] + ':' + go[1] );
			Model.selectedCell = $( ".game-cell[index-i=" + go[0] + "][index-j=" + go[1] + "]" );
			Control.selectorDblClick();			
		}
	}

	whereToGo(){
		var b = Object.create( Scanner.gBorder );
		b.top -= 5;
		b.bottom += 5;
		b.left -= 5;
		b.right += 5;

		if( b.top < 0 ) b.top = 0;
		if( b.left < 0 ) b.left = 0;

		var maxWeight = 0;
		var mx = 0;
		var my = 0;
		for( var y = b.top; y <= b.bottom; y++ )
			for( var x = b.left; x <= b.right; x++ ){
				var w = Scanner.countWeight( x, y );
				if( w > maxWeight ){
					maxWeight = w;
					mx = x;
					my = y;
				}
			}
		return [mx,my]
	}
}