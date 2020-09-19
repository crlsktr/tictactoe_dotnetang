import { Component, OnInit, Input } from "@angular/core";
import { BoardStateService } from '../board-state.service';

@Component({
  selector: "app-square",
  templateUrl: "./square.component.html",
  styleUrls: ["./square.component.less"],
})
export class SquareComponent implements OnInit {
  @Input()
  place: number;
	mark: string = "";

  constructor(private board:BoardStateService) {}

  ngOnInit(): void {
	  this.board.State.subscribe(s => {
		  if (s.finished)
		  	this.mark = "";
	  });
  }

  DrawMark(){
	this.mark = this.board.Turn === -1 ? "O": "X";
  }
}
