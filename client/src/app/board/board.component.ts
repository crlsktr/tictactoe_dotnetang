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
	  this.boardState.State.subscribe(x=>{
		if (x.finished)
		{
			this.winner = x.winner === 0 ? "Tie": "Winner is " + x.winner;
		}
	  });
	  
  }
}
