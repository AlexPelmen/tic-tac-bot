WIN_NUM = 5;

class GameScannner{
	constructor(){
		//borders of the field which we must check
		this.gBorder = {
			left: 	Infinity,
			top: 	Infinity,
			right: 	0,
			bottom: 0
		}
		//previews figure 
		this.preFig = null;
		//the number of cells when figure is constant
		this.score = 0;
	}

	addPointToBorders( x, y ){
		var b = this.gBorder;
		b.left = Math.min( x, b.left );
		b.right = Math.max( x, b.right );
		b.top = Math.min( y, b.top );
		b.bottom = Math.max( y, b.bottom );
	}

	checkWin(){
		var res = null;		
		res = this.checkHorizontals();
		if( ! res )
			res = this.checkVerticals();
		if( ! res )
			res = this.checkDiagonals();
		return res;	
	}

	checkHorizontals(){
		var b = this.gBorder;
		this.preFig = null;
		this.score = 0;
		for( var y = b.top; y <= b.bottom; y++ ){
			for( var x = b.left; x <= b.right; x++ ){
				var res = this.checkNewCell( x, y )
				if( res )
					return {
						player: Model.Field[x][y],		//who wins
						p1: [ x - WIN_NUM, y ],			//first point
						p2: [ x, y ]					//last point
					}
			}
			this.score = 0;
			this.preFig = null;
		}
		return false;
	}

	checkVerticals(){
		var b = this.gBorder;
		this.preFig = null;
		this.score = 0;		
		for( var x = b.left; x <= b.right; x++ ){
			for( var y = b.top; y <= b.bottom; y++ ){
				var res = this.checkNewCell( x, y )
				if( res )
					return {
						player: Model.Field[x][y],	//who wins
						p1: [ x, y - WIN_NUM ],			//first point
						p2: [ x, y ]					//last point
					}
			}
			this.score = 0;
			this.preFig = null;
		}
		return false;
	}

	checkDiagonals(){
		var b = this.gBorder;
		this.preFig = null;
		this.score = 0;

		//check diagonals from top cells
		for( var x = b.left; x <= b.right; x++ ){
			var res = checkDiag45( x, b.top )
			if( ! res ) 
				res = checkDiag135( x, b.top )
			if( res ) 
				return res;
		}

		//check diagonals from right cells
		for( var y = b.top; y <= b.bottom; y++ ){
			var res = checkDiag45( b.right, y )				
			if( ! res ) 
				res = checkDiag135( b.right, y )
			if( res ) 
				return res;
		}

		function checkDiag45( cellX, cellY ){
			for( var x = cellX, y = cellY; x >= b.left && y <= b.bottom; x--, y++ ){
				var res = Scanner.checkNewCell( x, y )
				if( res )
					return {
						player: Model.Field[x][y],		//who wins
						p1: [ x + WIN_NUM, y - WIN_NUM ],	//first point
						p2: [ x, y ]						//last point
					}
			}
			Scanner.score = 0;
			Scanner.preFig = null;
			return false;
		}

		function checkDiag135( cellX, cellY ){
			for( var x = cellX, y = cellY; x <= b.right && y <= b.bottom; x++, y++ ){
				var res = Scanner.checkNewCell( x, y )
				if( res )
					return {
						player: Model.Field[x][y],		//who wins
						p1: [ x - WIN_NUM, y - WIN_NUM ],	//first point
						p2: [ x, y ]						//last point
					}
			}
			Scanner.score = 0;
			Scanner.preFig = null;
			return false;
		}
	}

	checkNewCell( x, y ){
		if( this.preFig || Model.Field[x][y] ){		//if there's no nulls of zeros
			if( this.preFig == Model.Field[x][y] )
				this.score++;
			else{
				this.preFig = Model.Field[x][y];
				this.score = 0;
			}
			if( this.score == WIN_NUM - 1 )
				return true		//someone wins
		}
	}

}
	