// We create our only state
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        // Load the image
        game.load.image("French Fries","French Fries.gif");
        game.load.image("Salt","Salt.jpg");
    }
    , create: function () {
        // This function is called after the 'preload' function 
        // Here we set up the game, display sprites, etc.
        this.keyboard = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(300,300,"French Fries");
        this.player.scale.setTo(.15,.15);
        
        this.coins = game.add.group();
        this.coins.enableBody = true;
        this.coins.createMultiple(10,"Salt");
        
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds= true;
        game.time.events.loop(300, this.addCoins,this);
    }
    , update: function () {
        this.player.body.velocity.x = 0;
        if(this.keyboard.right.isDown){
            this.player.body.velocity.x = 300;
            
        }
        else if(this.keyboard.left.isDown) {
             this.player.body.velocity.x = -300;
            
        }
        
        if(this.keyboard.up.isDown) {
            this.player.body.velocity.y = -300;
        }
        else if(this.keyboard.down.isDown) {
             this.player.body.velocity.y = 300;}
        // This contains Game Logic 
    }
    , addCoins: function(){
        var coin = this.coins.getFirstDead();
        
        // If there isn't any dead coin, do nothing 
        if (!coin) {
            return;
        }
        coin.scale.setTo(.2,.2);
        coin.anchor.setTo(0.5, 1);
        coin.reset( game.rnd.pick([game.width/2,0]),0);
        coin.body.gravity.y = 300;
        coin.body.velocity.x = 100 *
        game.rnd.pick([-2, 2]);
        coin.body.bounce.x = 1;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
        
    }
};
// We initialize Phaser
var game = new Phaser.Game(800, 800, Phaser.AUTO, '');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');