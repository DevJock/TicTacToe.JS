var express = require('express');
var router = express.Router();

/* GET users listing. */

let game;


function runonce()
{
  game = new TicTacToe();
}

router.get('/',function(req,res){
  if(!game){
    runonce();
  }
})

router.post('/data/', function(req, res, next) 
{
  var pos = res.pos;
  var turn = res.turn;
  return game
});














module.exports = router;
