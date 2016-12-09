$(document).ready(function(){

  $('#findDex').click(function(){
    var pokename = $('#pokename').val();
    pokename = pokename.replace(/\s+/g,"");
    var pokemon = getDex(pokename);
    if (pokemon) {
      $('.pokemon').html(renderPokeDiv(pokemon));
    }else{
      $('.pokemon').text("No such pokemon");
    }
  });

  $('#findByAbl').click(function(){
    var abl = $('#ability').val();
    abl = abl.replace(/(^\s*)|(\s*$)/g,"");
    var pokemons = getByAbility(abl);
    var html = "";
    if (pokemons.length == 0) {
      $('.byabl #pokelist').text("No such ability");
      return;
    };
    for(key in pokemons){
      if (key!= "length") {
        html += renderPokeDiv(pokemons[key]);
      };
    }
    $('.byabl #pokelist').html(html);

  });

  $('#findByMove').click(function(){
    var moveArr = [];
    var formLength = 4;
    for (var i = 1; i < formLength + 1; i++) {
      if($("#move"+ i).val()){
        var inputMove = $("#move"+ i).val().replace(/\s+/g,"");
        if (checkMove(inputMove)) {
          moveArr.push(inputMove.toLowerCase());
        }
      }
    }
    var pokemons = getByMoves(moveArr);
    var html = "";
    if (pokemons.length == 0) {
      $('.bymove #pokelist').text("No such Pokemon");
      return;
    };
    for(key in pokemons){
      if (key!= "length" && pokemons[key]) {
        html += renderPokeDiv(pokemons[key]);
      };
    }
    $('.bymove #pokelist').html(html);
  })
})