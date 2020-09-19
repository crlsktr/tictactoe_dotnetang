import { Injectable } from "@angular/core";
import { BackendService } from "./backend-service.service";
import { MarkRequest } from "./mark-request";
import { Observable, Subject } from "rxjs";
import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

@Injectable({
  providedIn: "root",
})
export class BoardStateService {
  public turn: number = 1;
  public GameDone: Subject<boolean> = new Subject();
  constructor(private backendService: BackendService) {
  }

  public GetCurrentTurn(): number {
	return this.turn;
  }

  public TakeTurn(square: number) {
    let request: MarkRequest = { position: square, value: this.turn };
    this.backendService.makeMark(request).subscribe((x) => {
		console.log("response:", x);
      this.GameDone.next(x.finished);
      console.log("Game is" + (!!x.finished ? "finished" : "not finished"));
      if (!x.finished) this.turn = this.turn * -1;
    });
  }
}
