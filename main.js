//Hamid werkt eerst aan dialogue System

import {Dialogue} from "./DialoguePrototype/dialogue.js";
import {variants, labels} from '@catppuccin/palette'
window.addEventListener('load', init)
function init()
{
    document.querySelector('#app').innerHTML = `
  <div>
  
  <!--The 'Main' div contains anything from wallpaper to the regular game. The dialogue gets on top of that.
  and on top of that is another UI-->
  <div class="Main">
  </div>
  
  <div class="overlay">
  
  </div>
  </div>
`
    let protoDiaScreen = new DialogueScreen()
}

export class DialogueScreen {
    presetDialogueScreen = `<div id="DialogueBlock">
  
  <div id="ActorPreview">
  <img src="" alt="" id="ActorImage"/>
  <p id="ActorName"></p>
  </div>
  
  <div id="DialogueHolder">
  <p id="DialogueText"></p>
  </div>
  <div id="NextButtonHolder">
  <button id="NextButton">
  Next
</button> 
  </div>
  <div id="DiaBlockBar">
  <p id="">
  Log
  </p>
  </div>
  </div>`
    constructor() {
        if(!document.getElementById('DialogueBlock')){
            document.querySelector('.overlay').innerHTML = this.presetDialogueScreen
        }
        this.DiaBlock = document.querySelector('#DialogueBlock')
        this.TextDisplay = document.querySelector('#DialogueText')
        this.ActorNameDisplay = document.querySelector('#ActorName')
        this.ActorIMGDisplay = document.querySelector('#ActorImage')
        this.TextDisplay.innerText = this.ProtoDialogue.current.CurrentLine
        this.ActorNameDisplay.innerText = this.ProtoDialogue.current.CurrentActor
        this.TextDisplay.style.color = variants.mocha.text.hex
        this.ActorNameDisplay.style.color = variants.mocha.text.hex
        this.ActorNameDisplay.style.fontSize = '2em';
        this.nextButton = document.querySelector('#NextButton')
        this.nextButton.addEventListener('click', ()=>this.nextl())
    }
    ProtoDialogue = new Dialogue('Prototype', [
        {
            CurrentActor: 'You',
            CurrentLine: 'What is this?'
        },
        {
            CurrentActor: 'Narrator',
            CurrentLine: 'This is a dialogue screen, where the story will be told.'
        },
        {
            CurrentActor: 'Narrator',
            CurrentLine: 'All will be revealed in time'
        },
        {
            CurrentActor: 'ActionToNext',
            Action(){
                document.body.style.backgroundColor = variants.mocha.red.hex
            }
        },
        {
            CurrentActor: '???',
            CurrentLine: 'Wendigo, im... not... there...'
        }
    ])

    nextl(){
        this.ProtoDialogue.NextLine()
        if(this.ProtoDialogue.finished){
            //End Dialogue
            this.DiaBlock.remove()
            return;
        }
        if(this.ProtoDialogue.current.CurrentActor === 'ActionToNext'){
                this.ProtoDialogue.current.Action();
                this.ProtoDialogue.NextLine()
        }
        this.TextDisplay.innerText = this.ProtoDialogue.current.CurrentLine
        this.ActorNameDisplay.innerText = this.ProtoDialogue.current.CurrentActor
    }

}

