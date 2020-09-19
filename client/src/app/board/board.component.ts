import { Component, OnInit } from '@angular/core';
import { BoardStateService } from '../board-state.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {

	winner : string = "play";
  constructor(private boardState:BoardStateService) { }

  ngOnInit(): void {
  }

  MakeMark(square)
  {
	  this.boardState.TakeTurn(square);
	  this.boardState.GameDone.subscribe(x=>{
		  console.log("xkcd:",x);
		if (x)
			this.winner = "Winner is " + (this.boardState.turn === 1 ? "X":"O");
	  });
	  
  }
}
