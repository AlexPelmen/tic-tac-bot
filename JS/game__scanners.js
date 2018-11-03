WIN_NUM = 5;

//costs of attacks (weights)   [ capability, potential ]
ATTACK_WEIGHT = [[],[],[],[],[],[]];
ATTACK_WEIGHT[1][1] = 0.1 
ATTACK_WEIGHT[2][1] = 2
ATTACK_WEIGHT[3][1] = 4
ATTACK_WEIGHT[4][1] = 6
ATTACK_WEIGHT[5][1] = 200

ATTACK_WEIGHT[1][2] = 0.25
ATTACK_WEIGHT[2][2] = 5
ATTACK_WEIGHT[3][2] = 7
ATTACK_WEIGHT[4][2] = 100
ATTACK_WEIGHT[5][2] = 200



var stepStatistic = {
	currentAttacks: [],			//attacks of current player (whose step is going on)
	opponentAttacks: [],		//opponents attacks
} 




class Attack{
	constructor( cap = 0, pot = 0, div = 1 ){
		this.capability = cap;
		this.potential = pot;
		this.divider = div;
	}

	countWeigth(){
		return ATTACK_WEIGHT[ this.capability, this.potential ]	/ this.divider
	}
}





class checkLine{
	constructor(){
		this.subFig = "×";				//substitutable figure

		this.Attacks = [];				//0 - center attack
										//1..n - side attacks

		this.curAttack = new Attack;	//current attack

		this.iter = 1;					//iterator

		this.checkEdge = false;			//if attack is about edge of scanzone
										//we must check its edges to know potential

		this.attackplace = 1;			//number of cells, which potencially could be used for attack
										//if it number less then 5 - there's could be no attacks at all
	}

	checkCell( x, y ){	
		//console.dir( "x = " + x + ", iteration " + this.iter );		
		var fig = Model.Field[x] && Model.Field[x][y] !== undefined ? Model.Field[x][y] : 'b';	//detect border	

		if( this.iter == 4 && fig == this.subFig )	//if attack is about edge
			this.checkEdge = true;						
		else if( this.iter == 5 ){					//if, it's edge
			this.checkEdgeCell( x, y );
			//console.log( "checking is over!" )
			return 0;
		}
		this.iter++

		
		if( fig == '○' || fig == '×' ){ 	//some figure
			//console.log( "Figure " + fig  )
			if( this.subFig != fig ){
				this.Attacks.push( this.curAttack );
				//console.log( "Interapted" )
				return fig;
			}  			
			else{
				//console.log( "Increase capability" )
				this.curAttack.capability++;
				this.attackplace++;
			}
		}
		
		else if( fig == 'b' ){				//border
			this.Attacks.push( this.curAttack );
			//console.log( "border" )
			//console.log( "Interapted" )
			return 'b';
		}

		else{								//empty cell
			//console.log( "Empty cell" )
			if( this.curAttack.capability ){
				this.curAttack.potential++;
				this.Attacks.push( this.curAttack );
				this.curAttack = new Attack;
				this.curAttack.potential++;

				//console.log( "Increase potencial" )
				//console.log( "Create new attack" )				
			}		
			this.curAttack.divider++;
			this.attackplace++;	
			//console.log( "Increase divider" )	
		}	
	}

	substitudeFigure( fig ){
		this.subFig = fig;
		this.curAttack.capability++;
		//console.log( "Substitude " + fig )
		//console.log( "Increase capability" )
	}

	checkEdgeCell( x, y ){
		if( this.checkEdge ){	//long attack, we need to check potencial of this
			var fig = Model.Field[x] && Model.Field[x][y] !== undefined ? Model.Field[x][y] : 'b';
			//console.log( fig );
			if( fig == this.curFig || fig == 0 ){
				this.curAttack.potential++;
				//console.log( "Increase potential" )
			}
			if( this.curAttack.capability )
				this.Attacks.push( this.curAttack )
		}
		
	}

	turnAround(){
		this.iter = 1;
		this.checkEdge = false;
		this.curAttack = this.Attacks[0];	//center attack
		this.Attacks.splice(0,1)			//remove first element, cause it's center attack
		//console.log( "Turn around" )
	}
}




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

	checkWin( cellX, cellY ){
		var res = null;	
		var newFig = getFig(cellX,cellY);
		if( ! newFig ) return false;

		var res;
		res = res || checkLine( cellX, cellY, 1, 0 ); //horizontal
		res = res || checkLine( cellX, cellY, 0, 1 ); //vertical
		res = res || checkLine( cellX, cellY, 1, 1 ); //diagonal 45
		res = res || checkLine( cellX, cellY, 1, -1 ); //diagonal 135		

		return res;

		function getFig( x, y ){
			return Model.Field[x] && Model.Field[x][y] ? Model.Field[x][y] : 'b';
		}

		function checkLine( x, y, dx, dy ){
			x = +x;
			y = +y;
			var score = 0;
			while( getFig( x - dx, y - dy ) == newFig ){		
				x -= dx;	
				y -= dy;
			}
			while( getFig( x, y ) == newFig ){	
				x += dx;
				y += dy;
				score++;
			}
			if( score >= 5 )
				return true;
			return false;
		}	
	}


	//		*************************
	// 		******* TEST CELL *******
	//		*************************

	testCell( bl ){
		var x = +bl.attr( "index-i" );
		var y = +bl.attr( "index-j" );
		var res = this.countWeight( x,y );
		if( res )			
			View.showTestWeight( bl, res );
	}


	countWeight( x, y ){
		var attacks = this.getAttacks( x, y )
		if( ! attacks ) return;
		var sum = 0; 
		sum += count.call( this,  attacks.x );	
		sum += count.call( this,  attacks.o );

		return sum

		function count( atks ){
			var weight = 0;
			var breakPoints = 0;

			[ "0", "45", "90", "135" ].forEach( ( p )=>{
				if( this.isBreakPoint( atks[p] ) ){
					//console.log( "Break point" )
					if( ++breakPoints == 2 ){
						weight = 100;
						//console.log( "Pizdataya kletka" )
						return;
					}
				}
				atks[p].forEach( ( a )=>{
					weight += ATTACK_WEIGHT[a.capability][a.potential] / a.divider;
				});
			})
			return weight
		}
	}

	getAttacks( cellX, cellY ){
		if( Model.Field[ cellX ][ cellY ] )	//smth is in the cell yet 
			return false

		var cX = [];
		var cO = [];

		cX['0']   = this.getAttacksLine( cellX, cellY, '×', 1, 0 );
		cX['90']  = this.getAttacksLine( cellX, cellY, '×', 0, 1 );
		cX['45']  = this.getAttacksLine( cellX, cellY, '×', 1, -1 );
		cX['135'] = this.getAttacksLine( cellX, cellY, '×', 1, 1 );

		cO['0']   = this.getAttacksLine( cellX, cellY, '○', 1, 0 );
		cO['90']  = this.getAttacksLine( cellX, cellY, '○', 0, 1 );
		cO['45']  = this.getAttacksLine( cellX, cellY, '○', 1, -1 );
		cO['135'] = this.getAttacksLine( cellX, cellY, '○', 1, 1 );

		return {
			'x': cX,
			'o': cO
		}	
	}

	getAttacksLine( cellX, cellY, subFig, dx, dy ){	
		var C = new checkLine;

		C.substitudeFigure( subFig );
		
		for( 
			var x = cellX - dx, y = cellY - dy; 
			Math.abs( x - cellX ) < 6 && Math.abs( y - cellY ) < 6; 
			x -= dx, y -= dy 
		)		
			if( C.checkCell( x, y ) ) break;

		C.turnAround();

		for( 
			var x = cellX + dx, y = cellY + dy; 
			Math.abs( x - cellX ) < 6 && Math.abs( y - cellY ) < 6; 
			x += dx, y += dy 
		)			
			if( C.checkCell( x, y ) ) break;

		return this.filterAttacks( C )		
	}


	//remove non-potential attacks and attacks, 
	//which would never be finished
	filterAttacks( attackLine ){
		var res = []
		if( attackLine.attackplace >= 5 )
			attackLine.Attacks.forEach( ( a )=>{
				if( a.capability && a.potential )			
					res.push( a )							
			})
		attackLine.Attacks = res;
		return res
	}

	//detects attacks, which can be finished in the next step
	isBreakPoint( attackLine ){
		if( ! attackLine || ! attackLine.length ) return false;
		var centAtk;
		attackLine.forEach( ( a )=>{
			if( a.divider == 1 )
				centAtk = a;
		}) 	
		if( centAtk.capability >= 4 )
			return true	
		if( centAtk.potential == 2 && centAtk.capability >= 3 )
			return true;

		var res = false;			
		attackLine.forEach( ( a )=>{
			var score = centAtk.capability;
			if( a.divider == 2 ){	//side attack
				if( centAtk.potential == 2 && a.potential == 2 )
					score++;				
				if( score + a.capability >= 4 ){
					res = true;
					return;
				}
			}
		})
		return res;
	}
}
	