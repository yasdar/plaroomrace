import Phaser from 'phaser';
import CommonGameScene from '../runner/gamescene';
//import logoImg from './assets/logo.png';
import sfxJoin from "./assets/playerjoin.mp3";
import sfxPush from "./assets/push.mp3";

import snd_hit1 from "./assets/snd_hit1.mp3";
import snd_hole1 from "./assets/snd_hole1.mp3";
import splashs from "./assets/splash.mp3";




import Background from './assets/Background.png';
import Hole from './assets/hole.png';
import hole_flag from './assets/hole_flag.png';
import golfball from './assets/golfball.png';
import splash from './assets/splash.png';



class MyGame extends CommonGameScene {

  


  constructor() {
    super();
    this.playerNameTags = {};
    this.PlayersStartPositions=[];
    this.HolePositions=[];
    this.hole;
    this.player_index =0;
    this.BigText=null;
    this.GameOver = false;
    //this.bar=null;
    this.allBall=[];
    this.Teta=0;
    this.CurrentPlayer = 0;
    this.holeball;
    this.waterSplash;
  }

  preload() {
   // this.load.image('logo', logoImg);
    this.load.audio("join", sfxJoin);
    this.load.audio("push", sfxPush);
    this.load.audio("snd_hit1", snd_hit1);
    this.load.audio("snd_hole1", snd_hole1);
    this.load.audio("splashs", splashs);



    //game assets
    this.load.image("Background", Background);
    this.load.image("Hole", Hole);
    this.load.image("hole_flag", hole_flag);
    this.load.image("golfball", golfball);

    this.load.spritesheet("splash",splash,{ 
                    frameWidth: 128/4,
                    frameHeight: 32,
                })
    //this.load.image("bar", bar);
    let SJ={
      "generator_info": "Shape definitions generated with PhysicsEditor. Visit https://www.codeandweb.com/physicseditor",
      "Background": {
        "type": "fromPhysicsEditor",
        "label": "water",
        "isStatic": true,
        "density": 0.1,
        "restitution": 0,
        "friction": 0.1,
        "frictionAir": 0.55,
        "frictionStatic": 1,
        "collisionFilter": {
          "group": 0,
          "category": 1,
          "mask": 255
        },
        "fixtures": [
          {
            "label": "water",
            "isSensor": true,
            "vertices": [
              [ { "x":1728, "y":127 }, { "x":1688, "y":97 }, { "x":1490, "y":74 }, { "x":1345, "y":132 }, { "x":1450, "y":277 }, { "x":1620, "y":265 }, { "x":1678, "y":227 }, { "x":1720, "y":182 } ],
              [ { "x":1373, "y":77 }, { "x":1345, "y":132 }, { "x":1490, "y":74 } ],
              [ { "x":1388, "y":260 }, { "x":1450, "y":277 }, { "x":1345, "y":132 }, { "x":1345, "y":197 } ],
              [ { "x":1507, "y":289 }, { "x":1620, "y":265 }, { "x":1450, "y":277 } ]
            ]
          },
          {
            "label": "water",
            "isSensor": true,
            "vertices": [
              [ { "x":1619, "y":965 }, { "x":1545, "y":904 }, { "x":1483, "y":900 }, { "x":1400, "y":927 }, { "x":1308, "y":980 }, { "x":1173, "y":1135 }, { "x":1558, "y":1147 }, { "x":1606, "y":1032 } ],
              [ { "x":1692, "y":1515 }, { "x":1690, "y":1452 }, { "x":1625, "y":1350 }, { "x":1315, "y":1522 }, { "x":1460, "y":1555 }, { "x":1653, "y":1553 } ],
              [ { "x":1625, "y":1350 }, { "x":1570, "y":1255 }, { "x":1173, "y":1135 }, { "x":1145, "y":1277 }, { "x":1160, "y":1392 }, { "x":1223, "y":1475 }, { "x":1315, "y":1522 } ],
              [ { "x":1570, "y":1255 }, { "x":1558, "y":1147 }, { "x":1173, "y":1135 } ],
              [ { "x":1218, "y":1057 }, { "x":1173, "y":1135 }, { "x":1308, "y":980 } ]
            ]
          },
          {
            "label": "water",
            "isSensor": true,
            "vertices": [
              [ { "x":3471, "y":729 }, { "x":3525, "y":745 }, { "x":3590, "y":755 }, { "x":3655, "y":757 }, { "x":3575, "y":525 }, { "x":3476, "y":669 } ],
              [ { "x":3945, "y":905 }, { "x":3988, "y":842 }, { "x":4003, "y":707 }, { "x":3945, "y":532 }, { "x":3681, "y":449 }, { "x":3808, "y":837 }, { "x":3840, "y":892 }, { "x":3878, "y":919 } ],
              [ { "x":3756, "y":419 }, { "x":3681, "y":449 }, { "x":3945, "y":532 }, { "x":3863, "y":457 } ],
              [ { "x":3655, "y":757 }, { "x":3745, "y":772 }, { "x":3681, "y":449 }, { "x":3628, "y":477 }, { "x":3575, "y":525 } ],
              [ { "x":3990, "y":607 }, { "x":3945, "y":532 }, { "x":4003, "y":707 } ],
              [ { "x":3745, "y":772 }, { "x":3808, "y":837 }, { "x":3681, "y":449 } ]
            ]
          },
          {
            "label": "water",
            "isSensor": true,
            "vertices": [
              [ { "x":2866, "y":2338 }, { "x":2829, "y":2252 }, { "x":2762, "y":2167 }, { "x":2675, "y":2113 }, { "x":2552, "y":2080 }, { "x":2472, "y":2099 }, { "x":2213, "y":2338 } ],
              [ { "x":2401, "y":2122 }, { "x":2335, "y":2178 }, { "x":2287, "y":2228 }, { "x":2248, "y":2277 }, { "x":2213, "y":2338 }, { "x":2472, "y":2099 } ]
            ]
          }
        ]
      }
    }
    
    
    this.load.json('shapes', SJ);
  }

  create() {
    super.create();
    this.CreateMap();

    //prepare sounds
    this.sound.add('join', {volume: 1});
    this.sound.add('push', {volume: 1});
    this.sound.add('snd_hit1', {volume: 1});
    this.sound.add('snd_hole1', {volume: 1});
    this.sound.add('splashs', {volume: 1});


    this.matter.world.on('collisionstart', (event,bodyA,bodyB)=> {

 
       console.log('bodyA',bodyA.label)
       console.log('bodyB',bodyB.label)
      if(bodyB.label.indexOf("Circle Body") != -1 && bodyA.label=="water"){
        bodyB.parent.gameObject.setFrictionAir(0.07);
        
        bodyB.parent.gameObject.setData({'focus':'on'})
        this.time.addEvent({ delay: 1000, callback: ()=>{
          this.GoBack(bodyB.parent.gameObject);
        }, callbackScope: this, loop: false });
      }
       else if (bodyB.label.indexOf("Circle Body") != -1 && bodyA.label=="hole"){
       // console.log(bodyB.parent.gameObject)
        console.log(bodyB.parent.gameObject.getData('name')+' Win!');
        this.BigText.setText(bodyB.parent.gameObject.getData('name')+' Win!');
        bodyB.parent.gameObject.setVelocity(0,0);
        bodyB.parent.gameObject.setPosition(this.hole.x,this.hole.y);
        
        this.sound.play("snd_hole1");
        //hide all speed/rotaions effect
        this.allBall.forEach ( (ball)=>{
       if(ball!=null) {ball.setData({'focus':'on'})}
        });
        bodyB.parent.gameObject.setDepth(6);

        this.Zoom();
        this.GameOver = true;
       }
     
     },this);
  }

  addPlayerSprite(playerState, profile) {
   // console.log("addPlayerSprite",playerState, profile,this.players);
   // console.log('addPlayerSprite , this.player_index',this.player_index)

   // console.log('playerState' , playerState)
    //console.log('profile' ,profile)
  

let COLOR = 0xffffff;
  if(profile.color =='red'){COLOR=0xff0000;} 
  if(profile.color =='blue'){COLOR=0x0000ff;} 
  if(profile.color =='green'){COLOR=0x00ff00;} 
   if(profile.color =='yellow'){COLOR=0xffff00;} 


    const sprite = this.matter.add.sprite(0,0, 'golfball','').setScale(0.25);
    sprite.setPosition(
      this.PlayersStartPositions[this.player_index].x,
      this.PlayersStartPositions[this.player_index].y);
      this.player_index++;
      
      sprite.setBody({
        type: 'circle',
        radius: 14
    });

      sprite.setFrictionAir(0.01);
      sprite.setMass(3);
      sprite.setFixedRotation();  
      sprite.setName(playerState.id);
      sprite.setBounce(1);
      sprite.setCollidesWith([this.holeball]);
      sprite.setTint(COLOR);
     //small circle rotate around
    let ind = this.add.sprite(sprite.x,sprite.y,'golfball').setScale(0.06);
    ind.setTint(0xffffff);
    ind.setAlpha(1)
    // add text for player name
    var style = {
      font: "24px Arial",
      fill: "#ffffff",
      wordWrap: true,
      align: "center",
    };
    var text = this.add.text(
      sprite.x,
      sprite.y,
      profile.name+"\nL:0",
      style
    );
    text.setOrigin(0.5, 0.5);
    this.playerNameTags[playerState.id] = text;
  

    sprite.setData({name:profile.name, X:sprite.x,Y:sprite.y,'focus':'off',Graphic:this.add.graphics(),Linep:100,_ind:ind,laps:0,player_name:profile.name,player_id:playerState.id})
   
    this.allBall.push(sprite);
    this.sound.play("join");

   

    

    return sprite;
  }
  GoBack(sp){
     //play water animation
     this.waterSplash.setPosition(sp.x,sp.y)
     this.waterSplash.setVisible(true);

     this.sound.play("splashs");

     sp.setVisible(false);
      this.time.addEvent({ delay: 1000, callback: ()=>{
      if( !this.GameOver){sp.setData({'focus':'off'})}
      this.waterSplash.setVisible(false);
      sp.setVelocity(0,0);
      sp.setPosition(sp.getData('X'),sp.getData('Y'));
      sp.setVisible(true);
      sp.setFrictionAir(0.01);

    }, callbackScope: this, loop: false });
    
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

  looping(){
    this.Teta+=(3*Math.PI*0.0025);
   // console.log('looping ',this.allBall)
    for( let b=0 ; b <this.allBall.length; b++){
     // console.log('looping this.allBall[b]',b, this.allBall)
     if( this.allBall[b] != null && this.allBall[b].body) {
      let p =  this.allBall[b];

      let ind = p.getData('_ind');
      let Linep = parseInt(p.getData('Linep')) ;
      let Graphic =  p.getData('Graphic');

      let opacityline = 0.4;


      if( p.body.velocity.x != 0 || p.body.velocity.y != 0 || this.GameOver){
        ind.setVisible(false);
        opacityline = 0;
        Graphic.clear();
      }


      if(p.getData('focus') == 'off'){
        ind.setPosition(p.x+96*Math.cos(this.Teta),p.y+96*Math.sin(this.Teta));
        p.setVelocity(0,0);
        ind.setVisible(true);
        opacityline = 0;
      }

        

        

          if(p.getData('focus') == 'on' && p.body.velocity.x == 0 && p.body.velocity.y == 0){
            if(Linep>90){ Linep+=1; }else{ Linep+=2; }//correction for the speed
            if(Linep>110){Linep =10;}
    
            p.setData({'Linep':Linep});
              Graphic.clear();
              Graphic.lineStyle(6, 0xff0000, opacityline);
              let pinit = 18;
              let pfinal = 70;
    
                let Xi= p.x+pinit*Math.cos(this.Teta);
                let Yi= p.y+pinit*Math.sin(this.Teta);
                let Xii= p.x+(pinit+(pfinal*Linep/100))*Math.cos(this.Teta);
                let Yii= p.y+(pinit+(pfinal*Linep/100))*Math.sin(this.Teta);


            ind.setPosition(p.x+96*Math.cos(   p.getData('MyAngle')),p.y+96*Math.sin(   p.getData('MyAngle')));
            Xi= p.x+pinit*Math.cos(   p.getData('MyAngle'));
            Yi= p.y+pinit*Math.sin(   p.getData('MyAngle'));
            Xii= p.x+(pinit+(pfinal*Linep/100))*Math.cos(   p.getData('MyAngle'));
            Yii= p.y+(pinit+(pfinal*Linep/100))*Math.sin(   p.getData('MyAngle'));
            p.setData({'Shoot':true});

            var L = new Phaser.Geom.Line(Xi,Yi,Xii,Yii);
            Graphic.strokeLineShape(L);
          }
          
        }   
    } 
  }
  Actions(profile){
    this.CurrentPlayer  = parseInt(profile.name.replace('Player ',''))-1; 
    let p = this.allBall[this.CurrentPlayer];
    if(p==null ){return;}
    if(p.getData('focus') == 'on'){return;}

    p.setData({X:p.x,Y:p.y});

    let ind = p.getData('_ind');


    p.setData({'focus':'on',MyAngle:Phaser.Math.Angle.Between(p.x,p.y,ind.x,ind.y)});
    console.log('--------- action----------')
   // console.log('profile',profile.name);
   // console.log('power',Linep);
  }ShootNow(profile){

    this.CurrentPlayer  = parseInt(profile.name.replace('Player ',''))-1; 

    let p = this.allBall[this.CurrentPlayer];
    if(p == null){return;}
    let Linep = parseInt(p.getData('Linep')) ;
   
    if( p.getData('Shoot') ){
      console.log(p.getData('Shoot'),'---------ShootNow----------');
      this.sound.play("snd_hit1");
      p.setData({'Shoot':false})
      let Vx = Linep*0.1*Math.cos(   p.getData('MyAngle') );
      let Vy = Linep*0.1*Math.sin(   p.getData('MyAngle') );
      console.log("power",Linep)
      p.setVelocity(Vx,Vy);
      let SC = p.scaleX;
      this.tweens.add({
        targets: p,
        scale: SC*1.1,
        delay:10,
        ease: 'Bounce.easeOut',
        duration: Linep*5,
        yoyo:true,
        repeat:1
      });
      
      //50*Linep
      this.time.addEvent({ delay: 30*Linep, callback: ()=>{
        if( !this.GameOver){ p.setData({'focus':'off'});}
      }, callbackScope: this, loop: false });
    }



  }
  
  updateCommon(playerId, sprite, state) {
    const profile = state.getState("profile");

    if(  this.GameOver){return;}
   
   // console.log(state)
    if (state.isKeyDown("left")) {
    
     state.KeyIsDown = true;
      this.Actions(profile);
     
    }else{
      if(state.KeyIsDown && state.KeyWas=="left" ){
        state.KeyIsDown = false; console.log('-----> onUp l',state); this.ShootNow(profile);}
    }
   
    if (state.isKeyDown("right")) {
     // this.Actions(profile);
     state.KeyIsDown = true;
    }else{
      if(state.KeyIsDown && state.KeyWas=="right" ){
        state.KeyIsDown = false; console.log('-----> onUp r',state)}
    }


    if (state.isKeyDown("up")) {
      //this.Actions(profile);
      state.KeyIsDown = true;
    }else{
      if(state.KeyIsDown && state.KeyWas=="up" ){
        state.KeyIsDown = false; console.log('-----> onUp u',state)}
    }


    if (state.isKeyDown("down")) {
      //this.Actions(profile);
      state.KeyIsDown = true;
    }else{
      if(state.KeyIsDown && state.KeyWas=="down" ){
        state.KeyIsDown = false; console.log('-----> onUp d',state)}
    }

  

    if (state.isKeyDown("b1") || state.isKeyDown("b2")) {
      this.sound.play("push");
    }

    this.playerNameTags[playerId].x = sprite.x-sprite.displayWidth*2,
    this.playerNameTags[playerId].y = sprite.y;

  }

  handlePlayerQuit(playerState) {
    if (this.playerNameTags[playerState.id]) {
      console.log('player quit',playerState);
      if( this.allBall[parseInt(playerState.id.replace('p',''))-1] ){
        this.allBall[parseInt(playerState.id.replace('p',''))-1] = null;
        console.log(this.allBall)
      }
      this.player_index--;
      this.playerNameTags[playerState.id].destroy();
      delete this.playerNameTags[playerState.id];
    }
  }


  /***************game code  ****************/
  CreateMap(){
    console.log('CreateMap');
   let _w = this.cameras.main.width;
   let _h = this.cameras.main.height;
   this.holeball = this.matter.world.nextCategory();



   //custom world bounds
    this.CreateWall(_w*0.5,-8,_w+64, 32);
    this.CreateWall(_w*0.5,_h+8,_w+64, -32);
    this.CreateWall(_w+8,_h*0.5,32, _h+64);
    this.CreateWall(-12,_h*0.5,32, _h+64);








    //background image : used as refrence
    let BG = this.add.image(0,0,'Background').setOrigin(0,0);
    BG.setDisplaySize(this.cameras.main.width,this.cameras.main.height);
    BG.setVisible(false);

  var shapes = this.cache.json.get('shapes');
  // console.log(shapes)
   let water = this.matter.add.sprite(
    this.cameras.main.width*0.45,
    this.cameras.main.height*0.5, 
    'Background', 
    null, {shape: shapes.Background });

   water.setScale(BG.displayWidth/BG.width);
   water.setCollisionCategory(this.holeball);

   // water.setVisible(false);
    console.log("water",water.body.parts)
    this.PlayersStartPositions=[
      {
      x:BG.x+BG.displayWidth*0.1,
      y:BG.x+BG.displayHeight*0.2,
      },
      {
      x:BG.x+BG.displayWidth*0.2,
      y:BG.x+BG.displayHeight*0.85,
      },
      {
       x:BG.x+BG.displayWidth*0.45,
       y:BG.x+BG.displayHeight*0.5,
      },
      {
       x:BG.x+BG.displayWidth*0.8,
       y:BG.x+BG.displayHeight*0.05,
      },
      {
       x:BG.x+BG.displayWidth*0.7,
       y:BG.x+BG.displayHeight*0.65,
      }
  ]

  this.PlayersStartPositions = this.shuffle(this.PlayersStartPositions);

  this.hole = this.matter.add.sprite(0,0, 'Hole');
  var Bodies = Phaser.Physics.Matter.Matter.Bodies;
  var circleD = Bodies.circle(0,0, 28, { isSensor: true, label: 'hole',isStatic:true });
  this.hole.setExistingBody(circleD);

  this.hole.setCollisionCategory(this.holeball);
  
  this.HolePositions=[
    {
      x:BG.x+BG.displayWidth*0.19,
      y:BG.x+BG.displayHeight*0.52,
    },
    {
      x:BG.x+BG.displayWidth*0.54,
      y:BG.x+BG.displayHeight*0.76,
    },
    {
      x:BG.x+BG.displayWidth*0.78,
      y:BG.x+BG.displayHeight*0.9,
    },
    {
      x:BG.x+BG.displayWidth*0.67,
      y:BG.x+BG.displayHeight*0.23,
    },
    {
      x:BG.x+BG.displayWidth*0.9,
      y:BG.x+BG.displayHeight*0.4,
    },
  ];
  //random position of the hole
  this.HolePositions = this.shuffle(this.HolePositions);
  this.hole.setPosition(this.HolePositions[0].x,this.HolePositions[0].y)

  let hole_flag = this.add.image(0,0,'hole_flag').setOrigin(0,1);
  hole_flag.setScale(0.75,0.75)
  hole_flag.setPosition(this.hole.x,this.hole.y);
  hole_flag.setDepth(5)

this.waterSplash = this.add.sprite(200,200,'splash','0').setScale(2)
this.anims.create({
    key: "splashA",
    frames: this.anims.generateFrameNumbers('splash', {
        frames: ["0", "1", "2", "3"],
    }),
    frameRate: 8,
    repeat: -1,
});
this.waterSplash.play('splashA');
this.waterSplash.setVisible(false);

    var style = {
      font: "bold 54px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: '#000000',
			strokeThickness: 6
    };

   
   this.BigText = this.add.text(
   this.cameras.main.width*0.5,
   this.cameras.main.height*0.07,
    "First to reach the hole wins",
    style);
  
   this.BigText.setOrigin(0.5, 0.5);


  }
  CreateWall(x,y,w,h){
   let wall = this.matter.add.sprite(0,0,'');
   var Bodies = Phaser.Physics.Matter.Matter.Bodies;
   var Rect = Bodies.rectangle(x,y,w,h, {label: 'wall',isStatic:true });
   wall.setExistingBody(Rect);
   wall.setCollisionCategory(this.holeball);
  }
 
 
}

export default MyGame;

//problem about players index when removing a player