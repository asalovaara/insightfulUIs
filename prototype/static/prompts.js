
var cond = undefined; // This will be defined in the prompt shown to user when the page is rendered.

var taskList = [
  //{ taskId: "videorecordings",  condition: "baseline" },
  //{ taskId: "todos",    condition: cond},
  //{ taskId: "fixation-kublakhan",    condition: "interactive"},
  { taskId: "welcome",    condition: cond},
  { taskId: "rehearse1",    condition: cond},
  { taskId: "actualstart",    condition: cond},
  { taskId: "hint-poem",    condition: cond},
  { taskId: "hint-invite",    condition: cond},
  { taskId: "unrelated1", condition: cond},
  { taskId: "poem",    condition: cond},
  { taskId: "invitation40",    condition: cond},
  { taskId: "hint-chase",    condition: cond},
  { taskId: "hint-emptylines",    condition: cond},
  { taskId: "unrelated2", condition: cond},
  { taskId: "chase",    condition: cond},
  { taskId: "emptylines",    condition: cond},
  /*
  { taskId: "americanpie",    condition: cond},
  { taskId: "invitation20",    condition: cond},
  { taskId: countdown,    condition: cond},
  { taskId: "hallelujah",    condition: cond},
  { taskId: "invitation3",    condition: cond},
  { taskId: 3,    condition: cond},
  */
  { taskId: "end",    condition: cond}
]


var prompts = {
  "actualstart": {
    label: "Starting the actual study",
    instruction: //"<p>Thank you for volunteering to participate!</p>" +
      "<p>You will carry out a variety of tasks with the same simple text editor you have used to practise.</p>" +
      "<p>Press the button when you are ready.</p>",
//      "<p>We are interested in seeing how you go about solving them. "+
//      "This is an exploratory study, and we don't know how difficult these tasks will be for people. "+
//      "Therefore we do not have any expectations on your performance.</p>" +
//      "<p>Thank you again for your participation!</p><p>&nbsp;</p>" +
//      "<p>Antti (University of Helsinki)<br/>Frederic (University of Kingston)</p>",
    content: null,
    answerPrompt: null,
    buttonText: "OK! Let's start!"
  },
  "poem": {
    label: "Poem length problem",
    instruction: "You are participating in a poetry contest. " +
      "The rules of this contest say that <b>no poem can exceed 50 lines</b>. " +
      "How many lines does your poem have?",
      //"You remember that you have a poem that could be just below this limit, but you're not sure. <br/>&nbsp;<br/>" +
      //"How can you find out the line count, empty lines excluded?",
    content: "<p>In Xanadu did Kubla Khan </p><p>A stately pleasure-dome decree: </p><p>Where Alph, the sacred river, ran </p>" +
      "<p>Through caverns measureless to man </p><p>   Down to a sunless sea. </p><p>So twice five miles of fertile ground </p>" +
      "<p>With walls and towers were girdled round; </p><p>And there were gardens bright with sinuous rills, </p>" +
      "<p>Where blossomed many an incense-bearing tree; </p><p>And here were forests ancient as the hills, </p>" +
      "<p>Enfolding sunny spots of greenery. </p><p>But oh! that deep romantic chasm which slanted </p>" +
      "<p>Down the green hill athwart a cedarn cover! </p><p>A savage place! as holy and enchanted </p>" +
      "<p>As e'er beneath a waning moon was haunted </p><p>By woman wailing for her demon-lover! </p>" +
      "<p>And from this chasm, with ceaseless turmoil seething, </p><p>As if this earth in fast thick pants were breathing, </p>" +
      "<p>A mighty fountain momently was forced: </p><p>Amid whose swift half-intermitted burst </p>" +
      "<p>Huge fragments vaulted like rebounding hail, </p><p>Or chaffy grain beneath the thresher's flail: </p>" +
      "<p>And mid these dancing rocks at once and ever </p><p>It flung up momently the sacred river. </p>" +
      "<p>Five miles meandering with a mazy motion </p><p>Through wood and dale the sacred river ran, </p>" +
      "<p>Then reached the caverns measureless to man, </p><p>And sank in tumult to a lifeless ocean; </p>" +
      "<p>And 'mid this tumult Kubla heard from far </p><p>Ancestral voices prophesying war! </p>" +
      "<p>   The shadow of the dome of pleasure </p><p>   Floated midway on the waves; </p>" +
      "<p>   Where was heard the mingled measure </p><p>   From the fountain and the caves. </p>" +
      "<p>It was a miracle of rare device, </p><p>A sunny pleasure-dome with caves of ice! </p>" +
      "<p>   A damsel with a dulcimer </p><p>   In a vision once I saw: </p><p>   It was an Abyssinian maid </p>" +
      "<p>   And on her dulcimer she played, </p><p>   Singing of Mount Abora. </p><p>   Could I revive within me </p>" +
      "<p>   Her symphony and song, </p><p>   To such a deep delight 'twould win me, </p><p>That with music loud and long, </p>" +
      "<p>I would build that dome in air, </p><p>That sunny dome! those caves of ice! </p>" +
      "<p>And all who heard should see them there, </p><p>And all should cry, Beware! Beware! </p>" +
      "<p>His flashing eyes, his floating hair! </p><p>Weave a circle round him thrice, </p>" +
      "<p>And close your eyes with holy dread </p><p>For he on honey-dew hath fed, </p><p>And drunk the milk of Paradise.</p>",
    answerPrompt: "Line count is: ",
    answerIsValid: function(answer) {
      var validPattern = /[1-9]+[0-9]*$/;
      if ( validPattern.test(answer.trim()) ) {
        return { valid:true , msg:null };
      }
      else {
        return { valid:false , msg:"The answer is not a full number (integer)."};
      }
    },
    buttonText: "Done! Next task please!"
  },
  "americanpie": {
    label: "Rock song length problem",
    instruction: "You participate in a rock song contest. " +
      "The rules of this contest say that <b>the rock song cannot exceed 100 lines</b>. " +
      "How many lines does your song have?",
      //"You remember that you have a poem that could be just below this limit, but you're not sure. <br/>&nbsp;<br/>" +
      //"How can you find out the line count, empty lines excluded?",
    content: "<p><b>American Pie</b></p><p>A long long time ago</p>" +
      "<p>I can still remember how</p>" +
      "<p>That music used to make me smile</p>" +
      "<p>And I knew if I had my chance</p>" +
      "<p>That I could make those people dance</p>" +
      "<p>And maybe they'd be happy for a while</p>" +
      "<p>But February made me shiver</p>" +
      "<p>With every paper I'd deliver</p>" +
      "<p>Bad news on the doorstep</p>" +
      "<p>I couldn't take one more step</p>" +
      "<p>I can't remember if I cried</p>" +
      "<p>When I read about his widowed bride</p>" +
      "<p>Something touched me deep inside</p>" +
      "<p>The day the music died</p>" +
      "<p>So</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>And them good ole boys were drinking whiskey and rye</p>" +
      "<p>Singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>Did you write the book of love</p>" +
      "<p>And do you have faith in God above</p>" +
      "<p>If the Bible tells you so?</p>" +
      "<p>Do you believe in rock and roll?</p>" +
      "<p>Can music save your mortal soul?</p>" +
      "<p>And can you teach me how to dance real slow?</p>" +
      "<p>Well, I know that you're in love with him</p>" +
      "<p>'Cause I saw you dancin' in the gym</p>" +
      "<p>You both kicked off your shoes</p>" +
      "<p>Man, I dig those rhythm and blues</p>" +
      "<p>I was a lonely teenage broncin' buck</p>" +
      "<p>With a pink carnation and a pickup truck</p>" +
      "<p>But I knew I was out of luck</p>" +
      "<p>The day the music died</p>" +
      "<p>I started singin'</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>And them good ole boys were drinking whiskey and rye</p>" +
      "<p>Singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>Now, for ten years we've been on our own</p>" +
      "<p>And moss grows fat on a rolling stone</p>" +
      "<p>But, that's not how it used to be</p>" +
      "<p>When the jester sang for the king and queen</p>" +
      "<p>In a coat he borrowed from James Dean</p>" +
      "<p>And a voice that came from you and me</p>" +
      "<p>Oh and while the king was looking down</p>" +
      "<p>The jester stole his thorny crown</p>" +
      "<p>The courtroom was adjourned</p>" +
      "<p>No verdict was returned</p>" +
      "<p>And while Lennon read a book on Marx</p>" +
      "<p>The quartet practiced in the park</p>" +
      "<p>And we sang dirges in the dark</p>" +
      "<p>The day the music died</p>" +
      "<p>We were singin'</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>Them good ole boys were drinking whiskey and rye</p>" +
      "<p>And singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>Helter skelter in a summer swelter</p>" +
      "<p>The birds flew off with a fallout shelter</p>" +
      "<p>Eight miles high and falling fast</p>" +
      "<p>It landed foul on the grass</p>" +
      "<p>The players tried for a forward pass</p>" +
      "<p>With the jester on the sidelines in a cast</p>" +
      "<p>Now the half-time air was sweet perfume</p>" +
      "<p>While sergeants played a marching tune</p>" +
      "<p>We all got up to dance</p>" +
      "<p>Oh, but we never got the chance</p>" +
      "<p>'Cause the players tried to take the field</p>" +
      "<p>The marching band refused to yield</p>" +
      "<p>Do you recall what was revealed</p>" +
      "<p>The day the music died?</p>" +
      "<p>We started singin'</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>Them good ole boys were drinking whiskey and rye</p>" +
      "<p>And singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>Oh, and there we were all in one place</p>" +
      "<p>A generation lost in space</p>" +
      "<p>With no time left to start again</p>" +
      "<p>So come on Jack be nimble, Jack be quick</p>" +
      "<p>Jack Flash sat on a candlestick</p>" +
      "<p>'Cause fire is the devil's only friend</p>" +
      "<p>Oh and as I watched him on the stage</p>" +
      "<p>My hands were clenched in fists of rage</p>" +
      "<p>No angel born in Hell</p>" +
      "<p>Could break that Satan's spell</p>" +
      "<p>And as the flames climbed high into the night</p>" +
      "<p>To light the sacrificial rite</p>" +
      "<p>I saw Satan laughing with delight</p>" +
      "<p>The day the music died</p>" +
      "<p>He was singin'</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>Them good ole boys were drinking whiskey and rye</p>" +
      "<p>Singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>I met a girl who sang the blues</p>" +
      "<p>And I asked her for some happy news</p>" +
      "<p>But she just smiled and turned away</p>" +
      "<p>I went down to the sacred store</p>" +
      "<p>Where I'd heard the music years before</p>" +
      "<p>But the man there said the music wouldn't play</p>" +
      "<p>And in the streets the children screamed</p>" +
      "<p>The lovers cried, and the poets dreamed</p>" +
      "<p>But not a word was spoken</p>" +
      "<p>The church bells all were broken</p>" +
      "<p>And the three men I admire most</p>" +
      "<p>The Father, Son, and the Holy Ghost</p>" +
      "<p>They caught the last train for the coast</p>" +
      "<p>The day the music died</p>" +
      "<p>And they were singing</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>And them good ole boys were drinking whiskey and rye</p>" +
      "<p>Singin' this'll be the day that I die</p>" +
      "<p>This'll be the day that I die</p>" +
      "<p>They were singing</p>" +
      "<p>Bye, bye Miss American Pie</p>" +
      "<p>Drove my Chevy to the levee but the levee was dry</p>" +
      "<p>Them good ole boys were drinking whiskey and rye</p>" +
      "<p>Singin' this'll be the day that I die</p>",
    answerPrompt: "Line count is: ",
    answerIsValid: function(answer) {
      var validPattern = /[1-9]+[0-9]*$/;
      if ( validPattern.test(answer.trim()) ) {
        return { valid:true , msg:null };
      }
      else {
        return { valid:false , msg:"The answer is not a full number (integer)."};
      }
    },
    buttonText: "Done! Next task please!"
  },
  "hallelujah": {
    label: "Favorite rock song length problem #2",
    instruction: "You participate in a vote for best rock lyrics. " +
      "The rules of this contest say that <b>the rock song cannot exceed 60 lines</b>. " +
      "How many lines does your song have?",
      //"You remember that you have a poem that could be just below this limit, but you're not sure. <br/>&nbsp;<br/>" +
      //"How can you find out the line count, empty lines excluded?",
    content: "<p><b>Leonard Cohen: Hallelujah</b></p>" +
      "<p>Now, I've heard there was a secret chord</p>" +
      "<p>That David played, and it pleased the Lord</p>" +
      "<p>But you don't really care for music, do you?</p>" +
      "<p>It goes like this, the fourth, the fifth</p>" +
      "<p>The minor fall, the major lift</p>" +
      "<p>The baffled king composing hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Your faith was strong but you needed proof</p>" +
      "<p>You saw her bathing on the roof</p>" +
      "<p>Her beauty and the moonlight overthrew ya</p>" +
      "<p>She tied you to a kitchen chair</p>" +
      "<p>She broke your throne, and she cut your hair</p>" +
      "<p>And from your lips she drew the hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>You say I took the name in vain</p>" +
      "<p>I don't even know the name</p>" +
      "<p>But if I did, well really, what's it to you?</p>" +
      "<p>There's a blaze of light in every word</p>" +
      "<p>It doesn't matter which you heard</p>" +
      "<p>The holy or the broken hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>I did my best, it wasn't much</p>" +
      "<p>I couldn't feel, so I tried to touch</p>" +
      "<p>I've told the truth, I didn't come to fool you</p>" +
      "<p>And even though it all went wrong</p>" +
      "<p>I'll stand before the lord of song</p>" +
      "<p>With nothing on my tongue but hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>" +
      "<p>Hallelujah</p>",
    answerPrompt: "Line count is: ",
    answerIsValid: function(answer) {
      var validPattern = /[1-9]+[0-9]*$/;
      if ( validPattern.test(answer.trim()) ) {
        return { valid:true , msg:null };
      }
      else {
        return { valid:false , msg:"The answer is not a full number (integer)."};
      }
    },
    buttonText: "Done! Next task please!"
  },
  "invitation20": {
    label: "Recipient count problem",
    instruction: "You are inviting people your graduation party, but you can only " +
      "invite <b>20</b> friends.<br/>&nbsp;<br/>How many recipients does this email already have?",
    content: "<p><b>Subject: </b> Invitation to party my graduation next Saturday</p>" +
      "<p><b>To:</b><p>"+
      "maria.anders@romanbaths.co.uk; " +
      "ana.trujillo@firm.co.uk; " +
      "antonio.moreno@bookshop.co.uk; " +
      "thomas.hardy@firm.co.uk; " +
      "christina.berglund@firm.co.uk; " +
      "hanna.moos@firm.co.uk; " +
      "frederique.citeaux@bookshop.co.uk; " +
      "martin.sommer@romanbaths.co.uk; " +
      "laurence.lebihan@abacus.co.uk; " +
      "victoria.ashworth@ucl.ac.uk; " +
      "patricio.simpson@romanbaths.co.uk; " +
      "francisco.chang@firm.co.uk; " +
      "rita.muller@gmail.com; " +
      "sven.ottlieb@kingston.ac.uk; " +
      "janine.labrune@firm.co.uk; " +
      "ann.devon@gmail.com; " +
      "aria.cruz@bookshop.co.uk; " +
      "maria.larsson@helsinki.fi; " +
      "carine.schmitt@firm.co.uk; " +
      "paolo.accorti@romanbaths.co.uk; " +
      "<p><b>Message:</b></p><p>&nbsp;</p>" +
      "<p>My dear friends!</p>" +
      "<p>I'm soon graduating, and now is a time to party! I'd like to see everyone of " +
      "you at George and Dragon next Saturday night. Linda has promised to play some music too!</p>" +
      "<p>&nbsp</p>" +
      "<p>Yours, with best wishes XX </p>" +
      "<p>Jon</p>",
      answerPrompt: "The number of recipients is: ",
      answerIsValid: function(answer) {
        var validPattern = /[1-9]+[0-9]*$/;
        if ( validPattern.test(answer.trim()) ) {
          return { valid:true , msg:null };
        }
        else {
          return { valid:false , msg:"The answer is not a full number (integer)."};
        }
      },
      buttonText: "Done! Next task please!"
  },
  "invitation40": {
    label: "Recipient count problem",
    instruction: "You are inviting people your graduation party, but you can only " +
      "invite <b>40</b> friends.<br/>&nbsp;<br/>How many recipients does this email already have?",
    content: "<p><b>Subject: </b> Invitation to party my graduation next Saturday</p>" +
      "<p><b>To:</b><p>"+
      "maria.anders@romanbaths.co.uk; " +
      "ana.trujillo@firm.co.uk; " +
      "antonio.moreno@bookshop.co.uk; " +
      "thomas.hardy@firm.co.uk; " +
      "christina.berglund@firm.co.uk; " +
      "hanna.moos@firm.co.uk; " +
      "frederique.citeaux@bookshop.co.uk; " +
      "martin.sommer@romanbaths.co.uk; " +
      "laurence.lebihan@abacus.co.uk; " +
      "victoria.ashworth@ucl.ac.uk; " +
      "patricio.simpson@romanbaths.co.uk; " +
      "francisco.chang@firm.co.uk; " +
      "rita.muller@gmail.com; " +
      "sven.ottlieb@kingston.ac.uk; " +
      "janine.labrune@firm.co.uk; " +
      "annette.roulet@abacus.co.uk; " +
      "yoshi.tannamuri@bookshop.co.uk; " +
      "john.steel@abacus.co.uk; " +
      "renate.messner@romanbaths.co.uk; " +
      "jaime.yorres@bookshop.co.uk; " +
      "carlos.gonzalez@bookshop.co.uk; " +
      "felipe.izquierdo@abacus.co.uk; " +
      "fran.wilson@firm.co.uk; " +
      "giovanni.rovelli@romanbaths.co.uk; " +
      "catherine.dewey@romanbaths.co.uk; " +
      "jean.fresniere@firm.co.uk; " +
      "alexander.feuer@waterstones.co.uk; " +
      "simon.crowther@gmail.co.uk; " +
      "yvonne.moncada@abacus.co.uk; " +
      "ann.devon@gmail.com; " +
      "aria.cruz@bookshop.co.uk; " +
      "maria.larsson@helsinki.fi; " +
      "carine.schmitt@firm.co.uk; " +
      "paolo.accorti@foxtons.co.uk; " +
      "<p><b>Message:</b></p><p>&nbsp;</p>" +
      "<p>My dear friends!</p>" +
      "<p>I'm soon graduating, and now is a time to party! I'd like to see everyone of " +
      "you at George and Dragon next Saturday night. Linda has promised to play some music too!</p>" +
      "<p>&nbsp</p>" +
      "<p>Yours, with best wishes XX </p>" +
      "<p>Jon</p>",
      answerPrompt: "The number of recipients is: ",
      answerIsValid: function(answer) {
        var validPattern = /[1-9]+[0-9]*$/;
        if ( validPattern.test(answer.trim()) ) {
          return { valid:true , msg:null };
        }
        else {
          return { valid:false , msg:"The answer is not a full number (integer)."};
        }
      },
      buttonText: "Done! Next task please!"
  },
  "invitation3": {
    label: "Recipient count problem",
    instruction: "You are inviting people your graduation party, but you can only " +
      "invite <b>30</b> friends.<br/>&nbsp;<br/>How many recipients does this email already have?",
    content: "<p><b>Subject: </b> Invitation to party my graduation next Saturday</p>" +
      "<p><b>To:</b><p>"+
      "maria.anders@romanbaths.co.uk; " +
      "ana.trujillo@firm.co.uk; " +
      "antonio.moreno@bookshop.co.uk; " +
      "thomas.hardy@firm.co.uk; " +
      "christina.berglund@firm.co.uk; " +
      "hanna.moos@firm.co.uk; " +
      "frederique.citeaux@bookshop.co.uk; " +
      "martin.sommer@romanbaths.co.uk; " +
      "laurence.lebihan@abacus.co.uk; " +
      "victoria.ashworth@ucl.ac.uk; " +
      "patricio.simpson@romanbaths.co.uk; " +
      "francisco.chang@firm.co.uk; " +
      "rita.muller@gmail.com; " +
      "sven.ottlieb@kingston.ac.uk; " +
      "frederique.citeaux@bookshop.co.uk; " +
      "martin.sommer@romanbaths.co.uk; " +
      "laurence.lebihan@abacus.co.uk; " +
      "victoria.ashworth@ucl.ac.uk; " +
      "patricio.simpson@romanbaths.co.uk; " +
      "francisco.chang@firm.co.uk; " +
      "rita.muller@gmail.com; " +
      "sven.ottlieb@kingston.ac.uk; " +
      "janine.labrune@firm.co.uk; " +
      "ann.devon@gmail.com; " +
      "aria.cruz@bookshop.co.uk; " +
      "maria.larsson@helsinki.fi; " +
      "carine.schmitt@firm.co.uk; " +
      "paolo.accorti@romanbaths.co.uk; " +
      "<p><b>Message:</b></p><p>&nbsp;</p>" +
      "<p>My dear friends!</p>" +
      "<p>I'm soon graduating, and now is a time to party! I'd like to see everyone of " +
      "you at George and Dragon next Saturday night. Linda has promised to play some music too!</p>" +
      "<p>&nbsp</p>" +
      "<p>Yours, with best wishes XX </p>" +
      "<p>Jon</p>",
      answerPrompt: "The number of recipients is: ",
      answerIsValid: function(answer) {
        var validPattern = /[1-9]+[0-9]*$/;
        if ( validPattern.test(answer.trim()) ) {
          return { valid:true , msg:null };
        }
        else {
          return { valid:false , msg:"The answer is not a full number (integer)."};
        }
      },
      buttonText: "Done! Next task please!"
  },
  "countdown": {
    label: "Countdown reversal",
    instruction: "You a writing a children's tale about a fictitious Apollo 34 moon mission. But you have accidentally written the countdowns in a wrong order. How do you reverse their orders?",
    content: "<p><b>Apollo's launch faces problems!</b></p>" +
      "<p>Finally everything was ready for a lift off! The three astronauts were lying in their harnesses at the top of the rocket." +
      "<p>The command centre started the countdown:</p>" +
      "<p>4 5 6 7 8 9 10... But oh no! Suddenly the counting stopped. What was wrong?</p>" +
      "<p>Someone had forgotten to bring the astronauts' food to the shuttle! John found the food lying in the corridor. He climbed up and gave the food to the astronauts. The countdown started again.</p>" +
      "<p>6 7 8 9 10 ... But oh no! Again there was a trouble! What was it now?</p>" +
      "<p>One of the astronauts had to go to a toilet! With a blushed face, he did his business and returned to the rocket. Would Apollo be now ready for a lift-off?</p>" +
      "<p><p>1 2 3 4 5 6 7 8 9 10 LIFT-OFF! Now it succeeded!</p>" +
      "<p>The engines boomed, and Apollo started its ascent, first slowly, but all the time with a faster speed.</p>" +
      "<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>&nbsp;<p>&nbsp;</p>",
      answerPrompt: null,
      buttonText: "Done! Next task please!"
  },
  "chase": {
    label: "A mysterious chase",
    instruction: "You are writing a children’s story. You would like them to find a clue written in code. Can you encode the message in this story?",
    content: "<p>Sam, Sophie and Will raced through the castle corridors, their hearts pounding even faster than their feet. " +
      "Every time they looked out of one of the windows, they could see the armies approaching on each of the roads that radiated out from the castle.</p>" +
      "<p>'We need to escape!' shouted Sam.</p>" +
      "<p>'I think we're all aware of that!' Sophie screamed back.</p>" +
      "<p>Suddenly, they turned a corner and they were in a large dusty room. "+
      "They could see a table with a lit candle, a box of tacks and a short coil of rope. At the back of a room there was a pile of junk. "+
      "On the table, there was a message written in a strange code:</p>" +
      "<p class=\"rtl\"><i>Dear children, to escape the castle you must go to the far end of this room and find an old mirror. This mirror is your escape route out of here.</i></p>" +
      "<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>&nbsp;<p>&nbsp;</p>",
      answerPrompt: null,
      buttonText: "Done! Next task please!"
  },
  "end": {
    label: "Study completed.",
    instruction: "<p>You have now completed all the tasks. Thank you!</p>",
    content: undefined,
    answerPrompt: null,
    buttonText: null
  },
  "todos": {
    label: "TODOs and known bugs",
    instruction: "",
    content: "<p>Bugs:</p><ul>" +
      "<li>Right-to-left feature deletes part of text if the row has two span areas</li>" +
      "<li>Right-to-left feature does not place cursor in right position after an edit</li>" +
      "<li>In interactive condition, find and replace reports always that 0 strings were found.</li>" +
      "<li>RTL/LTR full-line action must be highlighted" +
      "</ul>" +
      "<p>Research design problems:</p>" +
      "<ul>" +
      "<li>Right-to-left is too unintuitive for users</li>" +
      "<li>Participants must be <b>primed</b> to see particular uses for particular tools</li>" +
      "<li>All tasks cannot be insight tasks: otherwise they learn to expect that there must be some trick.</li>" +
      "<li>Add 3 min timeout?</li>" +
      "<li>Add buttons to the toolbar to prevent users searching for a solution from a limited number of choices</li>" +
      //"3) creates an error exception often in the feature's second invocation. These times the range object provides a div for unknown reason." +
      //"4) Nested ltr/rtl settings work strangely." +
      "</ul>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "hint-poem": {
    label: "Recipe",
    instruction: "<p>You have a nice recipe, but its <b>STEPS</b> are not numbered (1, 2, 3, ...). " +
      "How can you change the steps into a numbered list?</p>",
    content: "<p>AVOCADO PASTA</p>"+
      "<p>The easiest, most unbelievably creamy avocado pasta. And it'll be on your dinner table in just 20 min!</p>"+
      "<p><b>INGREDIENTS:</b></p>"+
      "<p>12 ounces spaghetti</p>"+
      "<p>2 ripe avocados, halved, seeded and peeled</p>"+
      "<p>1/2 cup fresh basil leaves</p>"+
      "<p>2 cloves garlic</p>"+
      "<p>2 tablespoons freshly squeezed lemon juice</p>"+
      "<p>Salt and freshly ground black pepper, to taste</p>"+
      "<p>1/3 cup olive oil</p>"+
      "<p>1 cup cherry tomatoes, halved</p>"+
      //"<p>1/2 cup canned corn kernels, drained and rinsed</p>"+
      "<p><b>STEPS:</b></p>"+
      "<p>In a large pot of boiling salted water, cook pasta according to package instructions; drain well.</p>"+
      "<p>To make the avocado sauce, combine avocados, basil, garlic and lemon juice in the bowl of a food processor; season with salt and pepper, to taste. With the motor running, add olive oil in a slow stream until emulsified; set aside.</p>"+
      "<p>In a large bowl, combine pasta, avocado sauce, cherry tomatoes and corn.</p>"+
      "<p>Serve immediately.</p>",
      answerPrompt: null,
      buttonText: "Done! Next task please!"
  },
  "hint-invite": {
    label: "Search for typing errors",
    instruction: "<p>You have written the following text. " +
      "Before sending it, you would like to make sure that you have not misspelled ‘maintenance’ as ‘maintainance’, as you often do. " +
      "Can you check to see if you have made this common spelling error in the text below?</p>",
    content: "<p><b>An essay about maintenance</b></p>" +
      "<p>In the modern world, service technicians, machinists and mechanics rank amongst the most popular jobs. This reflects the increasing automation of every day life meaning that it is hard to miss the specialists who maintain and repair these machines. It is therefore important that we attract enough young people to these jobs to prevent being left in a situation where this expertise is lost. The most obvious ways of doing this are to make sure that those with specialised expertise receive a decent salary and secondly that they are offered a conducive working environment. This essay will explore the main peculiarities of the industrial maintainance occupation and take its perspectives into account. </p>" +
      "<p>Industrial systems are constantly evolving. Someone working in this field will need to be an expert in the support and maintainance of sophisticated systems such as computer-controlled electrical and mechanical production equipment, material processing and material handling equipment, general maintainance and facility support systems. According to the Occupational Outlook Handbook, specific duties many include the inspection of buildings, grounds and facilities to detect and resolve problems and potential problems, as well as 'cleaning and lubricating machinery, testing and replacement of electrical switches, sockets and plugs or deteriorated pipes, and the repair of floorings, railings, and appliances' (2008). However, this occupation may also include such common duties as painting, plumbing, and fixing broken parts of buildings (doors, windows, locks). Additionally, the maintenance workers would need to know how to install new equipment. " +
      "Thus, it should be emphasized that the major responsibilities of working in this area are both preventive maintainance and the installation of new equipment. </p>" +
      "<p>The introduction of robots into the manufacturing process means that the job of the maintenance worker requires a different form of expertise and skills. So, this kind of job may include simple mechanical repairs, as well as high-level technology-related work. The ever-increasing introduction of sophisticated machines calls for workers who can use computerized equipment and work with electronic components. Alongside this, the skills of working with traditional hand tools are also required.</p>" +
      "<p>Industrial maintenance is vital to all the establishments in which industrial machinery is used, but just as these establishments are differentiated according to their functions, final products and functional complexity of equipment, maintainance workers also differ according to their main responsibilities and the areas in which they work. Thus, they may be automotive service technicians, small engine mechanics, machinists, heavy vehicle and mobile equipment service technicians, heating and refrigeration mechanics, diesel service technicians, etc. </p>" +
      "<p>These jobs may be found mainly in the areas of industry where industrial machinery is extensively used. They may be food processing, textile mills, chemicals, fabricated metal products, motor vehicles, and primary metals. The mechanics may be also required in such establishments as government agencies, public utilities, mining companies, etc. </p>" +
      "<p>At first sight, it may seem that to become a maintainance worker one should not have more than high school education and a little knowledge in machinery because there is so much to be learnt ‘on the job’. While this might have been so two decades ago, today the employer requires the maintainance worker to be knowledgeable about the complex electronic systems and computers which regulate the work of equipment. Additionally, workers must be aware of all the complex components the machinery consists of and their work. They also must be able to work with reference manuals. " +
      "So, it is preferable that applicants for a job have taken “courses in mechanical drawing, mathematics, blueprint reading, computer programming, or electronics” (2008). It is also very important to distinguish industrial machinery mechanics from maintenance workers – the latter ones perform less sophisticated work. So, machinery maintainance workers  can still learn from practical experience, while industrial machinery mechanics need education after high school and some experience working on particular equipment. </p>" +
      "<p>Although the majority of machinery maintenance worker positions require just a high school diploma, it is highly recommended that workers have training in the area of industrial technology. In addition, to get some experience, the person may choose to assist experienced workers or professional trainers. In this case, they will be offered the easy jobs such as setting up, cleaning, and switching on machinery. After a while the assistant worker may be offered a steady job or at least given a good reference. " +
      "On the whole, industrial machinery mechanics should be competent in the following areas: mechanical, engineering and technology, computers and electronics and physics. As for primary skills needed, they are equipment maintenance, repairing, determining causes of errors, operation monitoring (making sure that equipment is working properly) and quality control analysis (testing the quality of products and services).</p>",
      // https://bestessayhelp.com/examples/other/industrial-maintenance-–-essay-sample
    answerPrompt: "Did the text have the error?",
    buttonText: "Done! Next task please!"
  },
  "hint-chase": {
    label: "Correcting left-to-right numbers in Arabic",
    instruction: "<p>In Arabic, numbers are written from left to right, although everything else is written from right to left. " +
      "In the text below, the numbers should be reversed. How do you do that?</p>",
    content: // http://context.reverso.net/translation/english-arabic/kilometres
      "<p class=\"align-right\">\u0627\u0644\u062a\u062d\u0642\u0642 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0623\u0644\u063a\u0627\u0645 \u0645\u0646 \u0030\u0035\u0031 \u0643\u064a\u0644\u0648\u0645\u062a\u0631\u0627 \u0645\u0646 \u0627\u0644\u0637\u0631\u0642\u0627\u062a\u002e</p>" +
      "<p class=\"align-right\">\u062a\u0637\u0647\u064a\u0631 \u0030\u0038\u0038\u0034\u0033 \u0643\u064a\u0644\u0648\u0645\u062a\u0631\u0627 \u0645\u0646 \u0627\u0644\u0637\u0631\u0642\u061b</p>" +
      "<p class=\"align-right\">\u0648\u062a\u0645 \u062a\u0634\u064a\u064a\u062f \u062e\u0637\u0648\u0637 \u0631\u0626\u064a\u0633\u064a\u0629 \u0644\u0644\u0625\u0645\u062f\u0627\u062f \u0628\u0627\u0644\u0645\u064a\u0627\u0647 \u0639\u0644\u0649 \u0627\u0645\u062a\u062f\u0627\u062f \u0645\u0627 \u0645\u062c\u0645\u0648\u0639\u0647 \u0034\u0034\u0030 \u0643\u064a\u0644\u0648\u0645\u062a\u0631</p>" +
      "<p class=\"align-right\">\u0648\u0647\u0630\u0647 \u0627\u0644\u0645\u0644\u0648\u062b\u0627\u062a \u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u0646\u062a\u0642\u0644 \u0644\u0645\u0633\u0627\u0641\u0629 \u0030\u0030\u0033 \u0643\u064a\u0644\u0648\u0645\u062a\u0631 \u0628\u0641\u0639\u0644 \u0627\u0644\u0631\u064a\u0627\u062d\u002e</p>" +
      "<p class=\"align-right\">\u0627\u0646\u0646\u064a \u0628\u062d\u0627\u062c\u0629 \u0627\u0644\u0649 \u0627\u0644\u0630\u0647\u0627\u0628 \u0639\u0644\u0649 \u0628\u0639\u062f \u0030\u0035 \u0643\u064a\u0644\u0648\u0645\u062a\u0631\u0627\u002e</p>",
//      "<p class=\"align-right\"></p>" +
//      "<p class=\"align-right\"></p>" +
//      "<p class=\"align-right\"></p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "hint-emptylines": {
    label: "Sorting a list of names",
    instruction: "<p>Here is a list of names participating in an event. How do you arrange them alphabetically?.</p>",
    content: "<p>Ashworth, Victoria</p>" +
      "<p>Simpson, Patricio</p>" +
      "<p>Chang, Francisco</p>" +
      "<p>Wang, Yang</p>" +
      "<p>Afonso, Pedro</p>" +
      "<p>Brown, Elizabeth</p>" +
      "<p>Muller, Rita</p>" +
      "<p>Ottlieb, Sven</p>" +
      "<p>Labrune, Janine</p>" +
      "<p>Devon, Ann</p>" +
      "<p>Mendel, Roland</p>" +
      "<p>Cruz, Aria</p>" +
      "<p>Roel, Diego</p>" +
      "<p>Rancé, Martine</p>" +
      "<p>Larsson, Maria</p>" +
      "<p>Schmitt, Carine</p>" +
      "<p>Accorti, Paolo</p>" +
      "<p>Franken, Peter</p>" +
      "<p>Rodriguez, Lino</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "emptylines": {
    label: "Getting rid of empty lines",
    instruction: "<p>You are planning a trip to New York with your friend. " +
      "You are now sending some trip-related notes to your friend by email. However there are a lot of empty lines in your notes." +
      "How do you remove them so that the email gets shorter?</p>",
    content: "<p>WHAT TO VISIT IN NEW YORK</p>" +
      "<p>(in no particular order)" +
      "<p>&nbsp;</p>" +
      "<p>MoMA</p>" +
      "<p>The statue</p>" +
      "<p>Cheese cake in a cafe</p>" +
      "<p>&nbsp;</p>" +
      "<p>&nbsp;</p>" +
      "<p>Central Park</p>" +
      "<p>&nbsp;</p>" +
      "<p>Apollo Theater</p>" +
      "<p>&nbsp;</p>" +
      "<p>Williamsburg (in Brooklyn)</p>" +
      "<p>&nbsp;</p>" +
      "<p>&nbsp;</p>" +
      "<p>Scorcese film shooting locations</p>" +
      "<p>&nbsp;</p>" +
      "<p>&nbsp;</p>" +
      "<p>Chinatown</p>" +
      "<p>&nbsp;</p>" +
      "<p>some shopping, Yankees caps etc</p>" +
      "<p>&nbsp;</p>" +
      "<p>Harlem</p>" +
      "<p>River cruise around Manhattan</p>" +
      "<p>&nbsp;</p>" +
      "<p>&nbsp;</p>" +
      "<p>Times Square</p>" +
      "<p>Flatiron Building (eat the cheese cake here?)</p>" +
      "<p>&nbsp;</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "unrelated1": {
    label: "A list of the hottest places on the Earth",
    instruction: "<p>As part of a homework assignment, you have been asked to compile a list of the hottest places on Earth. " +
      "You have already gathered the information you need but you would like to change the presentation. "+
      "You would like all the degree Celsius signs (°C) to be aligned under each other. What’s the best way to make it happen?</p>",
    content: "<p><b>Response to an inquiry</b></p>" +
      "<p>The hottest measured temperatures on the Earth</p>" +
      "<p>&nbsp;</p>" +
      "<p>‘Aziziya, Libya, 57.8 &deg;C</p>" +
      "<p>Death Valley, United States of America, 56.7 &deg;C</p>" +
      "<p>Mitribah, Kuwait, 54.0 &deg;C</p>" +
      "<p>Ahvaz, Iraq, 54.0 &deg;C</p>" +
      "<p>Basra, Iraq, 53.9 &deg;C</p>" +
      "<p>&nbsp;</p>" +
      "<p>In addition, ground temperatures may reach much higher levels, such as 84 &deg;C measured in Port Sudan, Sudan.</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "unrelated-response-letter": {
    label: "Writing a response letter to a call for offers",
    instruction: "<p>You are preparing an offer for a small job next month. " +
      "However, the cost calculation is ugly: you want that all the pound signs (&pound;) are aligned under each other. How can you make that happen?</p>",
    content: "<p><b>Response to an inquiry</b></p>" +
      "<p>Thank you for contacting me! A surprise birthday party for your niece will involve the following costs:</p>" +
      "<p>&nbsp;</p>" +
      "<p>Chocolate cake: 55.00 &pound;</p>" +
      "<p>3-person acoustic pop band: 580.00 &pound;</p>" +
      "<p>Invitation cards (20 pieces): 6.00 &pound;</p>" +
      "<p>Candies: 32.00 &pound;</p>" +
      "<p>Planning and organising (10 hours): 200.00 &pound;</p>" +
      "<p>&nbsp;</p>" +
      "<p>Looking forward to hear your answer,<p>" +
      "<p>Yours, with best wishes,</p>" +
      "<p>&nbsp;</p>" +
      "<p>X</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "unrelated2": {
    label: "List of common acids",
    instruction: "<p>Change the formatting of the following chemical structures following this style: H<sub>2</sub>SO<sub>4</sub>:</p>",
    content: "<p><b>Common acids and their chemical structures</b></p>" +
      "<p>Ethanoic acid: CH3COOH</p>" +
      "<p>Boric acid: H3BO3</p>" +
      "<p>Hydrochloric acid: HCl</p>" +
      "<p>Nitric acid: HNO3</p>" +
      "<p>Phosphoric acid: H3PO4</p>" +
      "<p>Sulfuric acid: H2SO4</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "unrelated3": {
    label: "XXX",
    instruction: "<p>Replace the occurrences of \"avokado\" with \"avocado\".</p>",
    content: "<p>AVOKADO PASTA</p>",
    answerPrompt: null,
    buttonText: "Done! Next task please!"
  },
  "rehearse1": {
    label: "Practice task",
    instruction: "<ol>" +
      "<li>Change the heading of the text in the text editor below into bold letters.</li>" +
      "<li>Familiarise yourself with the button row by trying different features.</li>" +
      "<li>Finally, answer the question at the bottom.</li>" +
      "</ol>",
    content: "<p>How to write \"hello\" in 10 different languages:</p>"+
      "<p>Finnish: Moi</p>" +
      "<p>Arabic: \u0647\u062a\u0627\u0641 \u0644\u0644\u062a\u0631\u062d\u064a\u0628</p>" +
      "<p>Hebrew: \u05e9\u05dc\u05d5\u05dd</p>"+
      "<p>French: Bonjour</p>"+
      "<p>Albanian: Tungjatjeta</p>"+
      "<p>Basque: kaixo</p>"+
      "<p>Latin: Salve</p>"+
      "<p>Northern Sami: Bures</p>"+
      "<p>Bengali: Namaskaar</p>"+
      "<p>Japanese: \u3053\u3093\u306b\u3061\u306f</p>", // +
      //"<p>&nbsp;</p><p>&nbsp;</p>",

      answerPrompt: "Which list item has \"Hello\" in Finnish?",
      answerIsValid: function(answer) {
        var validPattern = /[1-9]+[0-9]*$/;
        if ( validPattern.test(answer.trim()) ) {

          if ( answer == "1" ) {
            return { valid:true , msg:null };
          }
          else {
            return { valid:false, msg:"Wrong answer" };
          }
        }
        else {
          return { valid:false , msg:"The answer is not a full number (integer)."};
        }
      },
      buttonText: "Done! Next task please!"
  },
  "rehearse2": {
    // Unicodes: https://www.branah.com/unicode-converter

    label: "Practice task 2",
    instruction: "<p>Add bullets to the list.</p>",
    content: "<p>Writing \"hello\" in 10 different languages</p><p>&nbsp;</p>"+
      "<p>Finnish: Moi</p>" +
      "<p>Arabic: \u0647\u062a\u0627\u0641 \u0644\u0644\u062a\u0631\u062d\u064a\u0628</p>" +
      "<p>Hebrew: \u05e9\u05dc\u05d5\u05dd</p>"+
      "<p>French: Bonjour</p>"+
      "<p>Albanian: Tungjatjeta</p>"+
      "<p>Basque: kaixo</p>"+
      "<p>Latin: Salve</p>"+
      "<p>Northern Sami: Bures</p>"+
      "<p>Bengali: Namaskaar</p>"+
      "<p>Japanese: \u3053\u3093\u306b\u3061\u306f</p>", // +
      //"<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>",

      answerPrompt: null,
      buttonText: "Done! Next task please!"
  },
  "rehearse3": {
    label: "Practice task 3",
    instruction: "<p>Does this list have \"hello\" in Romanian?</p>",
    content: "<p>Writing \"hello\" in 10 different languages</p><p>&nbsp;</p>"+
      "<p>Finnish: Moi</p>" +
      "<p>Arabic: \u0647\u062a\u0627\u0641 \u0644\u0644\u062a\u0631\u062d\u064a\u0628</p>" +
      "<p>Hebrew: \u05e9\u05dc\u05d5\u05dd</p>"+
      "<p>French: Bonjour</p>"+
      "<p>Albanian: Tungjatjeta</p>"+
      "<p>Basque: Kaixo</p>"+
      "<p>Latin: Salve</p>"+
      "<p>Northern Sami: Bures</p>"+
      "<p>Bengali: Namaskaar</p>"+
      "<p>Japanese: \u3053\u3093\u306b\u3061\u306f</p>"+
      "<p>Azerbaijani: Salam</p>" +
      "<p>Balinese: Swastyastu</p>" +
      "<pSwahili: Habari</p>" +
      "<p>Hungarian: Jó napot kívánok</p>" +
      "<p>Hawaiian: Aloha</p>" +
      "<p>Lithuanian: Labas</p>" +
      "<p>Tumbuka: Monile</p>" +
      "<p>Croatian: Bok</p>" +
      "<p>Norwegian: Goddag</p>" +
      "<p>Scottish Gaelic: Halò</p>" +
      "<p>Czech: Dobrý den</p>" +
      "<p>Lingala: Mbote</p>" +
      "<p>Polish: Cześć</p>",
      //"<p>&nbsp;</p>",
      answerPrompt: "Your answer: ",
      buttonText: "Done! Next task please!"
    },
  "welcome" : {
    label: "Welcome!",
    instruction: "<p>Thank you for taking part in the study.</p>" +
      "<p>We invite you to undertake a series of tasks in a simple text editor. "+
      "For some of the tasks, there is more than one way of solving the problem. " +
      "<p>We would like you to look for the best solution.</p>" +
      "<p>When you think you have found the solution, you can tell the researcher who will move you on to the next task.</p>" +
      "<p>You will start with a practice task to help you to get used to the interface.</p>",
    content: null,
    answerPrompt: null,
    buttonText: "Take me to the practice task"
  },
  "videorecordings" : {
    label: "Video recording material",
    instruction: "Previews for video condition are created using this prompt",
    content:
      "<p>Item 1</p>" +
      "<p>Item 2</p>" +
      "<p>Item 3</p>" +
      "<p>Item 4</p>" +
      "<p>Item 5</p>",
    answerPrompt: null,
    buttonText: "Take me to the practice tasks"
  }
};
