import { Injectable } from "@angular/core";
import { BackendService } from "./backend-service.service";
import { MarkRequest } from "./mark-request";
import { Subject } from "rxjs";
import { GameState } from './game-state';

@Injectable({
  providedIn: "root",
})
export class BoardStateService {
  public Turn: number = 1;
  public State: Subject<GameState> = new Subject();
  constructor(private backendService: BackendService) {}

  public GetCurrentTurn(): number {
    return this.Turn;
  }

  public TakeTurn(square: number) {
    let request: MarkRequest = { position: square, value: this.Turn };
    this.backendService.makeMark(request).subscribe((x) => {
      console.log("response:", x);
      this.State.next(x);
      console.log("Game is" + (!!x.finished ? "finished" : "not finished"));
      if (!x.finished) this.Turn = this.Turn * -1;
      else this.ResetBoard();
    });
  }
	
  ResetBoard() {
		this.Turn = 1;
		this.State.next({finished:false, winner: 0});
	}
}
