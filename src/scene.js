import Phaser from 'phaser';
import CommonGameScene from '../runner/gamescene';
//import logoImg from './assets/logo.png';
import sfxJoin from "./assets/playerjoin.mp3";
import sfxPush from "./assets/push.mp3";
import car from './assets/car.png';

import Background from './assets/Backgound.png';
import Ring from './assets/ringx0.6.png';

import x1 from './assets/x1.png';
import x1_5 from './assets/x1_5.png';
import x2 from './assets/x2.png';
import x2_5 from './assets/x2_5.png';


class MyGame extends CommonGameScene {

  


  constructor() {
    super();
    this.playerNameTags = {};
    this.PlayersStartPositions=[];
    this.player_index =0;
    this.BigText=null;
    this.GameStart= false;
    this.GameOver = false;
    this.GameSpeed = 1;

  }

  preload() {
   // this.load.image('logo', logoImg);
    this.load.audio("join", sfxJoin);
    this.load.audio("push", sfxPush);

    //game assets
    this.load.image("Background", Background);
    this.load.image("Ring", Ring);
    this.load.image("car", car);

    this.load.image("x1", x1);
    this.load.image("x1_5", x1_5);
    this.load.image("x2", x2);
    this.load.image("x2_5", x2_5);

    let SJ={
      "generator_info": "Shape definitions generated with PhysicsEditor. Visit https://www.codeandweb.com/physicseditor",
      "ringx0": {
        "type": "fromPhysicsEditor",
        "label": "ringx0",
        "isStatic": false,
        "density": 0.1,
        "restitution": 0,
        "friction": 0.1,
        "frictionAir": 0.01,
        "frictionStatic": 0.5,
        "collisionFilter": {
          "group": 0,
          "category": 1,
          "mask": 255
        },
        "fixtures": [
          {
            "label": "",
            "isSensor": false,
            "vertices": [
              [ { "x":210, "y":8 }, { "x":136, "y":4 }, { "x":145, "y":20 } ],
              [ { "x":145, "y":20 }, { "x":136, "y":4 }, { "x":72, "y":33 }, { "x":35, "y":70 }, { "x":88, "y":59 } ],
              [ { "x":88, "y":59 }, { "x":35, "y":70 }, { "x":47, "y":97 } ],
              [ { "x":35, "y":70 }, { "x":6, "y":153 }, { "x":20, "y":156 }, { "x":47, "y":97 } ],
              [ { "x":80, "y":674 }, { "x":152, "y":697 }, { "x":163, "y":687 }, { "x":100, "y":653 }, { "x":35, "y":628 } ],
              [ { "x":0, "y":580 }, { "x":35, "y":628 }, { "x":22, "y":563 }, { "x":3, "y":494 }, { "x":-10, "y":498 } ],
              [ { "x":20, "y":156 }, { "x":6, "y":153 }, { "x":-10, "y":210 }, { "x":2, "y":209 } ],
              [ { "x":219, "y":701 }, { "x":163, "y":687 }, { "x":152, "y":697 } ],
              [ { "x":100, "y":653 }, { "x":55, "y":609 }, { "x":35, "y":628 } ],
              [ { "x":55, "y":609 }, { "x":22, "y":563 }, { "x":35, "y":628 } ],
              [ { "x":-10, "y":498 }, { "x":3, "y":494 }, { "x":2, "y":209 }, { "x":-10, "y":210 } ]
            ]
          },
          {
            "label": "",
            "isSensor": false,
            "vertices": [
              [ { "x":1342, "y":29 }, { "x":1263, "y":9 }, { "x":1299, "y":57 }, { "x":1335, "y":99 }, { "x":1368, "y":78 } ],
              [ { "x":1317, "y":686 }, { "x":1363, "y":633 }, { "x":1287, "y":649 }, { "x":1235, "y":683 }, { "x":1226, "y":699 } ],
              [ { "x":1400, "y":582 }, { "x":1397, "y":494 }, { "x":1384, "y":490 }, { "x":1365, "y":559 }, { "x":1363, "y":633 } ],
              [ { "x":1168, "y":697 }, { "x":1226, "y":699 }, { "x":1235, "y":683 } ],
              [ { "x":1177, "y":4 }, { "x":1240, "y":23 }, { "x":1263, "y":9 } ],
              [ { "x":1240, "y":23 }, { "x":1299, "y":57 }, { "x":1263, "y":9 } ],
              [ { "x":1335, "y":99 }, { "x":1367, "y":152 }, { "x":1394, "y":146 }, { "x":1368, "y":78 } ],
              [ { "x":1367, "y":152 }, { "x":1385, "y":205 }, { "x":1397, "y":206 }, { "x":1394, "y":146 } ],
              [ { "x":1287, "y":649 }, { "x":1363, "y":633 }, { "x":1332, "y":605 } ],
              [ { "x":1332, "y":605 }, { "x":1363, "y":633 }, { "x":1365, "y":559 } ],
              [ { "x":1397, "y":494 }, { "x":1397, "y":206 }, { "x":1385, "y":205 }, { "x":1384, "y":490 } ]
            ]
          },
          {
            "label": "",
            "isSensor": false,
            "vertices": [
              [ { "x":145, "y":3 }, { "x":213, "y":8 }, { "x":1231, "y":3 }, { "x":1219, "y":-16 }, { "x":160, "y":-25 } ]
            ]
          },
          {
            "label": "",
            "isSensor": false,
            "vertices": [
              [ { "x":170, "y":699 }, { "x":185, "y":727 }, { "x":1244, "y":718 }, { "x":1256, "y":699 }, { "x":238, "y":694 } ]
            ]
          }
        ]
      }
    }
    
    this.load.json('shapes', SJ);
  }

  create() {
    super.create();
    this.CreateRace();
  }

  addPlayerSprite(playerState, profile) {
   // console.log("addPlayerSprite",playerState, profile,this.players);
    console.log('addPlayerSprite , this.player_index',this.player_index)
   
    const sprite = this.matter.add.sprite(0,0, 'car','',{label: 'car'+(this.player_index+1).toString() }).setScale(0.5);
    sprite.setPosition(
      this.PlayersStartPositions[this.player_index].x,
      this.PlayersStartPositions[this.player_index].y);
      this.player_index++;
      
      sprite.setFrictionAir(0.1);
      sprite.setMass(30);
      sprite.setFixedRotation();
      sprite.setFrictionStatic(1)     
      sprite.setName(playerState.id);
     // console.log(sprite)
     

    // add text for player name
    var style = {
      font: "24px Arial",
      fill: "#ffffff",
      wordWrap: true,
      align: "center",
     /* backgroundColor: "#ffffff",
      padding: {
        left: 5,
        right: 5,
        top: 2,
        bottom: 2,
      },*/
    };

    var text = this.add.text(
      sprite.x-sprite.displayWidth*0.75,
      sprite.y,
      profile.name+"\nL:0",
      style
    );
    text.setOrigin(0.5, 0.5);

    sprite.setData({laps:0,player_name:profile.name,player_id:playerState.id})
   

    this.playerNameTags[playerState.id] = text;

    this.sound.play("join");

    if(this.player_index == 5){

     if( !this.GameStart ) {
      //start count down animation
      this.time.addEvent({ delay: 600, callback:()=>{ this.BigText.setText('3'); this.Zoom(); } , callbackScope: this, loop: false });
      this.time.addEvent({ delay: 1200, callback:()=>{ this.BigText.setText('2'); this.Zoom(); }, callbackScope: this, loop: false });
      this.time.addEvent({ delay: 1800, callback: ()=>{ this.BigText.setText('1'); this.Zoom(); }, callbackScope: this, loop: false });
      this.time.addEvent({ delay: 2400, callback: ()=>{ this.BigText.setText('Go!'); this.Zoom(); }, callbackScope: this, loop: false });
      this.time.addEvent({ delay: 3000, callback: ()=>{ this.BigText.setText(''); this.BigText.setScale(1); this.GameStart = true; }, callbackScope: this, loop: false });
     }

    }

  

    return sprite;
  }
  Zoom(){
      this.BigText.setScale(4);
      this.BigText.setAlpha(0.5);
      this.tweens.add({
          targets: this.BigText,
          scale: 2,
          alpha:1,
          delay:50,
          ease: 'Power1',
          duration: 500
      });
  }
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  updateCommon(playerId, sprite, state) {
    const profile = state.getState("profile");
    const speed = 10;
    if( !this.GameStart || this.GameOver){return;}
   
    if (state.isKeyDown("left")) {
     // sprite.x -= speed;
     sprite.setAngularVelocity(-0.1);
    }
    if (state.isKeyDown("right")) {
     // sprite.setVelocityX(speed);
     //sprite.x += speed;
     sprite.setAngularVelocity(0.1);
    }
    if (state.isKeyDown("up")) {
      //sprite.y -= speed;
      sprite.thrust(0.1*this.GameSpeed);
    }
    if (state.isKeyDown("down")) {
      //sprite.y += speed;
      sprite.thrustBack(0.1*this.GameSpeed);
    }

  

    if (state.isKeyDown("b1") || state.isKeyDown("b2")) {
      this.sound.play("push");
    }

    this.playerNameTags[playerId].x = sprite.x-sprite.displayWidth*0.75,
    this.playerNameTags[playerId].y = sprite.y;

  }

  handlePlayerQuit(playerState) {
    if (this.playerNameTags[playerState.id]) {
      console.log('player quit');
      this.player_index--;
      this.playerNameTags[playerState.id].destroy();
      delete this.playerNameTags[playerState.id];
    }
  }


  /***************game code  ****************/
  CreateRace(){
    console.log('CreateRace')

    //background image
    let BG = this.add.image(0,0,'Background').setOrigin(0,0);
    //backgrund fit the canvas
    BG.setDisplaySize(this.cameras.main.width,this.cameras.main.height);

 //ring
  var shapes = this.cache.json.get('shapes');
 // console.log(shapes)
  let Ring = this.matter.add.sprite(0, 0, 'Ring', null, { isStatic: true,shape: shapes.ringx0 });
  Ring.setPosition(this.cameras.main.width*0.5,this.cameras.main.height*0.5);
   //rectangle inside the ring
   this.matter.add.rectangle(Ring.x-Ring.displayWidth*0.015, Ring.y-Ring.displayHeight*0.01, Ring.displayWidth*0.57, Ring.displayHeight*0.16, { 
    isStatic: true,chamfer: { radius: [10,10,10,10] }
 });


 this.matter.add.rectangle(Ring.x-Ring.displayWidth*0.17, Ring.y-Ring.displayHeight*0.27,16
  , Ring.displayHeight*0.4, { 
    isSensor: true, label: 'startline' }
);


this.matter.add.rectangle(Ring.x+Ring.displayWidth*0.2, Ring.y+Ring.displayHeight*0.28,16
  , Ring.displayHeight*0.4, { 
    isSensor: true, label: 'checkline' }
);



this.matter.world.on('collisionstart', (event,bodyA,bodyB)=> {

 
 // console.log('bodyA',bodyA.label)
 // console.log('bodyB',bodyB.label)
  //if(bodyA) bodyA.gameObject.setTint(0xff0000);
  //if(bodyB)  bodyB.gameObject.setTint(0x00ff00);

  this.CheckRace(bodyA,bodyB);

},this);
  //this.matter.add.mouseSpring();



  this.PlayersStartPositions=[
    {x:Ring.x-Ring.displayWidth*0.22,y:Ring.y-Ring.displayHeight*0.45},
    {x:Ring.x-Ring.displayWidth*0.22,y:Ring.y-Ring.displayHeight*0.30},
    {x:Ring.x-Ring.displayWidth*0.22,y:Ring.y-Ring.displayHeight*0.15},

    {x:Ring.x-Ring.displayWidth*0.38,y:Ring.y-Ring.displayHeight*0.30},
    {x:Ring.x-Ring.displayWidth*0.38,y:Ring.y-Ring.displayHeight*0.15},

    ];

    //randomize positions
    this.PlayersStartPositions = this.shuffle(this.PlayersStartPositions);

    var style = {
      font: "bold 54px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: '#000000',
			strokeThickness: 6
    };

   
   this.BigText = this.add.text(
    Ring.x-Ring.displayWidth*0.015,
    Ring.y+Ring.displayHeight*0.25,
    "First to complete 5 laps wins!",
    style);
   this.BigText.setOrigin(0.5, 0.5);


   

   //sprre options
   let Ts =this.add.text(140,100,'Speed Options:',{
    font: "bold 32px Arial",
    fill: "#000000",
    align: "center",
  });
  Ts.setOrigin(0.5,0.5);

  let bt1 = this.add.image(140,180,'x1').setInteractive();
  let bt2 = this.add.image(140,260,'x1_5').setInteractive();
  let bt3 = this.add.image(140,340,'x2').setInteractive();
  let bt4 = this.add.image(140,420,'x2_5').setInteractive();
  bt1.setScale(1.25);
  bt1.on('pointerdown',()=>{ resetSpeedButtons(); bt1.setScale(1.25); this.GameSpeed = 1;})
  bt2.on('pointerdown',()=>{ resetSpeedButtons(); bt2.setScale(1.25); this.GameSpeed = 1.5;})
  bt3.on('pointerdown',()=>{ resetSpeedButtons(); bt3.setScale(1.25); this.GameSpeed = 2;})
  bt4.on('pointerdown',()=>{ resetSpeedButtons(); bt4.setScale(1.25); this.GameSpeed = 2.5;})

  let OptionsC = this.add.container(0,0,[Ts,bt1,bt2,bt3,bt4]);
 // OptionsC.setVisible(false);
function resetSpeedButtons(){
  bt1.setScale(1);  bt2.setScale(1); 
  bt3.setScale(1);  bt4.setScale(1); 
}

  }
  
  CheckRace(bodyA,bodyB){
     // check if car check the line
  if(bodyB.label.indexOf("car") != -1 && bodyA.label=="checkline"){
   // console.log(bodyB.label,"pass check line")
    bodyB.gameObject.setData({passcheckline:true});
  }
  //check if car made a turn
if(bodyB.label.indexOf("car") != -1 && bodyA.label=="startline" ){
  let _a = bodyB.gameObject.rotation - Math.round(bodyB.gameObject.rotation/Math.PI)*Math.PI;
  //console.log('s1',_a)
  if( _a> -Math.PI/2 && _a< Math.PI/2){
    //console.log('s2',bodyB.gameObject.getData('passcheckline'))
    if( bodyB.gameObject.getData('passcheckline') ){
      bodyB.gameObject.setData({passcheckline:false});
      bodyB.gameObject.setData({laps:parseInt(bodyB.gameObject.getData('laps'))+1});
      console.log('@1',bodyB.gameObject.getData('player_name'))
      console.log('@2',bodyB.gameObject.getData('laps'))
      this.playerNameTags[bodyB.gameObject.getData('player_id')].setText(bodyB.gameObject.getData('player_name')+'\nL: '+bodyB.gameObject.getData('laps'))

      //check end of the game
      if(parseInt(bodyB.gameObject.getData('laps'))>=3){ this.GameOver = true; this.BigText.setText('Winner:'+bodyB.gameObject.getData('player_name'))}
     
    }
  }
}
  }
 
}

export default MyGame;