import { Component, OnInit } from "@angular/core";
import { BoardStateService } from "./board-state.service";
import { GameState } from "./game-state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit{
  title = "tictactoe";
  xWins: number = 0;
  oWins: number = 0;
  ties: number = 0;
  
  constructor(private boardState: BoardStateService) {}

	ngOnInit(): void {
		this.boardState.State.subscribe((state: GameState) => {
			if (state.finished) {
				console.log("xkcd:finished", state);
				switch (state.winner)
				{
					case -1:
						this.oWins++;
						break;
					case 1:
						this.xWins++;
						break;
					case 0:
						this.ties++;
						break;
				}
			}
		  });
	}
}
