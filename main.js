//Hamid werkt eerst aan dialogue System

document.querySelector('#app').innerHTML = `
  <div>
  
  <!--The 'Main' div contains anything from wallpaper to the regular game. The dialogue gets on top of that.
  and on top of that is another UI-->
  <div class="Main">
  </div>
  
  <div class="overlay">
  
  <div id="DialogueBlock">
  
  <div id="ActorPreview">
  <img src="" alt="" id="ActorImage"/>
  <div id="ActorName"></div>
  </div>
  
  <div id="DialogueHolder">
  <p id="DialogueText"></p>
  </div>
  
  <div id="DiaBlockBar">
  <p id="">
  Log
  </p>
  </div>
  </div>
  
  </div>
  </div>
`