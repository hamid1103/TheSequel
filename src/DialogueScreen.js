import {variants} from "@catppuccin/palette";
import {Dialogue} from "../DialoguePrototype/dialogue.js";
import {Terminal} from "./Terminal.js";

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

    constructor(_engine) {
        if (!document.getElementById('DialogueBlock')) {
            document.getElementById('overlay').innerHTML = this.presetDialogueScreen
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
        this.nextButton.addEventListener('click', () => this.nextl())

        this.engine = _engine
    }

    ProtoDialogue = new Dialogue('Prototype', [
        {
            CurrentActor: 'You',
            CurrentLine: 'So...'
        },
        {
            CurrentActor: 'ActionToNext',
            CurrentLine: 'What is this?',
            CurrentDispActor: 'You',
            Action() {
                document.body.style.backgroundColor = variants.mocha.red.hex
            }
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: 'This, my friend, is my job.'
        },
        {
            CurrentActor: 'You',
            CurrentLine: "It looks like a shitty hacker effect from movies in the 90's."
        },
        {
            CurrentActor: 'ActionToNext',
            CurrentLine: 'Well might be, but I AM a hacker so there is no problem with that now is there?',
            CurrentDispActor: 'Raemond',
            Action() {
                document.body.style.backgroundColor = variants.mocha.sky.hex
            }
        },
        {
            CurrentActor: 'You',
            CurrentLine: "And why are you showing me this?"
        },
        {
            CurrentActor: 'You',
            CurrentLine: "I work with databases and that's about it."
        },
        {
            CurrentActor: 'You',
            CurrentLine: "I have no clue about whatever this is supposed to be."
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "Well, that's why you're here. I need you to test one of my new tools. See if you can get a feel for it."
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "Come on. Please?"
        },
        {
            CurrentActor: 'ActionToNext',
            CurrentLine: "Alright, Alright. Shit",
            CurrentDispActor: 'You',
            Action: (engine)=> {
                engine.terminal.ShowTerminal()
            }
        },
        {
            CurrentActor: 'You',
            CurrentLine: "What you want me to do?"
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "You are now connected to a demo Database."
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "I know you work with these things all the time but just in case, I added an LightSQL manual page in the topbar."
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "On the left there is a list of tables found in the current database."
        },
        {
            CurrentActor: 'ActionToNext',
            CurrentLine: "I'll be right here, watching.",
            CurrentDispActor: 'Raemond',
            Action: (engine)=> {
                engine.terminal.ShowTerminal()
            }
        },
        {
            CurrentActor: 'Raemond',
            CurrentLine: "Try to make it so only the account with the name 'Corvo' pops up."
        }
    ])

    nextl() {
        this.ProtoDialogue.NextLine()
        if (this.ProtoDialogue.finished) {
            let ovdiv = document.getElementById('overlay')
            ovdiv.style.pointerEvents = "none"
            console.log('DIA DONE')
            //End Dialogue
            this.DiaBlock.remove()
            return;
        }
        if (this.ProtoDialogue.current.CurrentActor === 'ActionToNext') {
            this.ProtoDialogue.current.Action(this.engine);
            if (this.ProtoDialogue.finished) {
                let ovdiv = document.getElementById('overlay')
                ovdiv.style.pointerEvents = "none"
                console.log('DIA DONE')
                //End Dialogue
                this.DiaBlock.remove()
                return;
            }
            if (this.ProtoDialogue.current.CurrentDispActor != undefined)
                this.ActorNameDisplay.innerText = this.ProtoDialogue.current.CurrentDispActor
        } else {
            this.ActorNameDisplay.innerText = this.ProtoDialogue.current.CurrentActor
        }
        if (this.ProtoDialogue.current.CurrentLine != undefined) {
            this.TextDisplay.innerText = this.ProtoDialogue.current.CurrentLine
        } else {
            this.TextDisplay.innerText = ''
        }
    }

}
