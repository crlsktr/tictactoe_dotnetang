using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace tictactoe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {

        private readonly ILogger<GameController> _logger;
		private readonly Game _game;

		public GameController(ILogger<GameController> logger, Game game)
        {
            _logger = logger;
			_game = game;
        }

        [HttpGet]
        public IEnumerable<int> Get()
        {
            return _game.board;
        }

		[HttpPost]
		public GameResult MakeMark([FromBody]MarkRequest req)
		{
			return _game.Mark(req.position,req.value);
		}
    }
}
