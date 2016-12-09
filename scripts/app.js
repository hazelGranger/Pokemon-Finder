function app(){
  console.log(POKEDEX_SM);
}
var printdex = function(){
  var html = "<ul>"
  for(p in POKEDEX_SM){
    if(POKEDEX_SM[p].t2){
      html += "<li>" + p + " : " + POKEDEX_SM[p].t1 + ", " + POKEDEX_SM[p].t2 + "</li>"
    }else{
      html += "<li>" + p + " : " + POKEDEX_SM[p].t1 + "</li>"
    }
  }
  html += "</ul>";
  $('#list').append(html);
}

//printdex();


var tableDex = function () {
  var html = "";
  for (p in POKEDEX_SM){
    html += "<tr>";
    html += "<td>"+ p +"</td>";
    if(POKEDEX_SM[p].t2){
      html += "<td>"+ POKEDEX_SM[p].t1 + "," +  POKEDEX_SM[p].t2 +"</td>";
    }else{
      html += "<td>"+ POKEDEX_SM[p].t1;
    }
    html += "<td>"+ POKEDEX_SM[p].bs.hp +"</td>";
    html += "<td>"+ POKEDEX_SM[p].bs.at +"</td>";
    html += "<td>"+ POKEDEX_SM[p].bs.df +"</td>";
    html += "<td>"+ POKEDEX_SM[p].bs.sa +"</td>";
    html += "<td>"+ POKEDEX_SM[p].bs.sp +"</td>";
    html += "<td>"+  POKEDEX_SM[p].bs.sp  +"</td>";
    html += "</tr>";
  }
  $('#table tbody').append(html);
}

//tableDex();

var getDex = function(pokename){
  return BattlePokedex[pokename];
}

var renderPokeDiv = function(pokemon){
  if (pokemon.id == "undefined") return false;// do not render pokemon not in the pokedex
  var pokeImgPos = getPokeImgPos(pokemon.id);
  var html = "<li>";
  html += "<div class=\"pokeimg\" style=\"background-position: " +  pokeImgPos.left +"px "+ pokeImgPos.top +"px;\"></div>";
  html += "<div class=\"spec\">" + pokemon.species +"</div>";
  html += "<div class=\"types\">" + pokemon.types +"</div>";
  html += "<div class=\"abilities\">" + resolveObj(pokemon.abilities) +"</div></li>";
  return html;
}

var resolveObj = function(obj){
  var string = "";
  for(p in obj){
    string += obj[p] + ", ";
  }
  return string;
}

var getPokeImgPos = function(id){
  return {top: Math.floor((id - 1)/16) * (-30),left: (id-1)%16 *(-40)};
}

//inorder to get img position
var attachIdToPokemons = function(){
  var i = 0;
  for(var key in  BattlePokedex){
    i++;
    BattlePokedex[key].id = i;
  }
}

attachIdToPokemons();

var getByAbility = function(desAbl){
  var resPokemons = {length: 0};
  for(key in BattlePokedex){
    for(abl in BattlePokedex[key].abilities){
      if (BattlePokedex[key].abilities[abl].toLowerCase() == desAbl.toLowerCase()) {
        resPokemons[key] = BattlePokedex[key];
        resPokemons.length++;
      }
    }
  }
  return resPokemons;
}

var getByMoves = function(moveArray){
  var resPokemons = {length:0};
  for(var pokemon in BattleLearnsets){
    // console.log(BattleLearnsets[pokemon].learnset);
    var count = 0;
    for (var i = 0; i < moveArray.length; i++) {
      BattleLearnsets[pokemon].learnset.hasOwnProperty(moveArray[i])
      if (BattleLearnsets[pokemon].learnset.hasOwnProperty(moveArray[i])){
        count++;
      }
      if (count == moveArray.length) {
        resPokemons[pokemon] = BattlePokedex[pokemon];
        resPokemons.length++;
      }
    }
  }
  return resPokemons;
}

var checkMove = function(inputMove){
  return (BattleMovedex.hasOwnProperty(inputMove.toLowerCase()))? true : false;
}




