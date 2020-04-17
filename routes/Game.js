class Game
{
    constructor()
    {
        this.grids = [];
        this.data = [];
        this.turn = 0;
        this.playCount = 0;
        this.stopped = false;
        this.winner = -1;
        this.games = 0;
        this.empty = -1;
        this.xval = 0;
        this.oval = 1;
        
        this.player1 = "CPU";
        this.player2 = "Player";
        this.scoreX = 0;
        this.scoreO = 0;
        this.winnings = [-1,-1,-1];
        
        this.fontReady = false;
        this.button;
    }
    
    reset()
    {
        console.log("Resetting");
        for(var i=0;i<9;i++)
        {
            data[i] = -1;
        }
        player1 = player1.substring(0,7);
        player2 = player2.substring(0,7);
        playCount = 0;
        turn = 0;
        stopped = false;
        winnings = [-1,-1,-1];
        loop();
    }
    
    
    educatedGuess()
    {
        var val = empty;
        do{
            val = getRandomInt(0,8);
        }while(data[val] != empty);
        return val;
    }
    
    
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    testData()
    {
        if(data[0] === data[1] && data[0] === data[2] && data[0] != empty) 
        {
            winnings = [0,1,2];
            return data[0];
        }
    
        if(data[3] === data[4] && data[3] === data[5] && data[3] != empty)
        {
            winnings = [3,4,5];
            return data[3];
        }
        
        if(data[6] === data[7] && data[6] === data[8] && data[6] != empty)
        {
            winnings = [6,7,8];
            return data[6];
        }
        if(data[0] === data[3] && data[0] === data[6] && data[0] != empty)
        {
            winnings = [0,3,6];
            return data[0];
        }
    
        if(data[1] === data[4] && data[1] === data[7] && data[1] != empty)
        {
            winnings = [1,4,7];
            return data[1];
        }
    
        if(data[2] == data[5] && data[2] == data[8] && data[2] != empty)
        {
            winnings = [2,5,8];
            return data[2];
        }
    
        if(data[0] == data[4] && data[0] == data[8] && data[0] != empty)
        {
            winnings = [0,4,8];
            return data[0];
        }
    
        if(data[2] == data[4] && data[2] == data[6] && data[2] != empty)
        {
            winnings = [2,4,6];
            return data[2];
        }
    
        return empty;
    }
    
}

