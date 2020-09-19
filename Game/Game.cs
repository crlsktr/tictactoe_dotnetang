using System;
using System.Collections.Generic;
using System.Linq;


public class Game
{
	public List<int> board { get; } = new List<int>(){0,0,0,0,0,0,0,0,0};
	public int turn = 1;
	private bool _done = false;

	/// 
	public GameResult Mark(int square, int side)
	{
		if (!Valid(square,side))
			throw new ArgumentException("Not a valid square, try again");
		
		board[square] = side;
		var turnResult = CheckGame();
		turn = turn * -1;
		if (turnResult.Finished)
			ResetGame();
		
		return turnResult;
	}

	private void ResetGame()
	{
		board.Clear();
		board.AddRange(new int[]{0,0,0,0,0,0,0,0,0});
		turn = 1;
		_done = false;
	}

	private GameResult CheckGame()
	{
		PrintBoard();
		var col1 = board[0] == board[3] && board[3] == board[6] && board[0] != 0;
		var col2 = board[1] == board[4] && board[4] == board[7] && board[1] != 0;
		var col3 = board[2] == board[5] && board[5] == board[8] && board[2] != 0;

		var row1 = board[0] == board[1] && board[1] == board[2] && board[0] != 0;
		var row2 = board[3] == board[4] && board[4] == board[5] && board[3] != 0;
		var row3 = board[6] == board[7] && board[7] == board[8] && board[6] != 0;
		
		var dia1 = board[0] == board[4] && board[4] == board[8] && board[0] != 0;
		var dia2 = board[2] == board[4] && board[4] == board[6] && board[2] != 0;
		
		var tie = !board.Any(x => x == 0);
		_done = (col1 || col2 || col3) || (row1 || row2 || row3) || (dia1|| dia2) || tie;
		if (_done)
			return new GameResult() {Finished = true, Winner = tie == true ? 0 : turn };
		else
			return new GameResult() {Finished = false, Winner = 0};
	}

	private void PrintBoard()
	{
		Console.WriteLine($"\n{board[0]}\t{board[1]}\t{board[2]}");
		Console.WriteLine($"{board[3]}\t{board[4]}\t{board[5]}");
		Console.WriteLine($"{board[6]}\t{board[7]}\t{board[8]}\n");
	}

	private bool Valid(int square, int side)
	{
		Console.WriteLine($"sq{square}, side{side},turn{turn}, done{_done}");
		return (square < 9 && square >= 0) && (side == 1 || side == -1 && side == turn) && !_done;
	}
}