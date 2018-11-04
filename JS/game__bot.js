class GameBot{

	constructor( fig ){
		this.botFig = fig;	//○ or ×
		this.lock = false;	//disable bot
	}

	makeMove(){
		if( this.lock ) return false;
		if( Model.whoPlays.char == this.botFig ){
			var go = this.whereToGo();
			console.log( "Go to " + go[0] + ':' + go[1] );
			Model.selectedCell = $( ".game-cell[index-i=" + go[0] + "][index-j=" + go[1] + "]" );
			Control.selectorDblClick();			
		}
	}

	whereToGo(){
		var b = Object.create( Scanner.gBorder );

		if(b.left == Infinity)	//first step( we don't care where to go, except the cells near the borders )
		{
			var l = 5;
			var r = Model.gameW - 6;
			var u = 5;
			var b = Model.gameH - 6;
			x = (Math.random()*( r - l ) + l)^0;
			y = (Math.random()*(b - u ) + u)^0;
			View.focus( $( ".game-cell[index-i=" + x + "][index-j=" + y+ "]" ) );
			return [x,y]
		}

		b.top -= 5;
		b.bottom += 5;
		b.left -= 5;
		b.right += 5;


		if( b.top < 0 ) b.top = 0;
		if( b.bottom >= Model.gameH ) b.bottom = Model.gameH - 1;
		if( b.left < 0 ) b.left = 0;
		if( b.right >=  Model.gameW ) b.right = Model.gameW - 1;

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