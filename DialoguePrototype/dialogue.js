/**
 * Class for loading Dialogue Data
 */
export class Dialogue {
    dialogueName;
    script;
    finished;
    DefaultScript = [
        {
            CurrentImage: null,
            CurrentActor: 'Narrator',
            CurrentText: 'Hey, you.'
        },
        {
            CurrentImage: null,
            CurrentActor: 'Narrator',
            CurrentText: "You're finally awake."
        },
        {
            CurrentImage: null,
            CurrentActor: 'Narrator',
            CurrentText: "You were trying to cross the border, weren't you?"
        },
        {
            CurrentImage: null,
            CurrentActor: 'Narrator',
            CurrentText: "Walked straight into that imperial ambush. Same as us."
        },
        {
            CurrentImage: null,
            CurrentActor: 'Narrator',
            CurrentText: "And that thief over there."
        }
    ]
    log = [];
    current;
    currentIndex;

    /**
     *
     * @param dialoguename name for dialogue
     * @param script Array of Dialogue. Template: {
     *             CurrentImage: null,
     *             CurrentActor: 'Narrator',
     *             CurrentText: "And that thief over there."
     *         }
     */
    constructor(dialoguename, script = this.DefaultScript) {
        this.dialogueName = dialoguename
        this.script = script
        this.currentIndex = 0
        this.current = this.script[this.currentIndex]

    }

    StartFromBeginning() {
        this.currentIndex = 0
        this.current = this.script[this.currentIndex]
    }

    AddToScript(actor, text, image) {
        let NewLine = {
            CurrentActor: line.actor
        }
    }

    GoTo(index) {
        if ((index > this.script.length) || (index < 0)) {
            this.StartFromBeginning()
        }
        this.current = this.script[index]
    }

    AddToLog() {
        this.log.push({
            Line: this.current,
            Index: this.currentIndex
        })
    }

    /**
     * Make sure to check for Dia.finished AFTER calling Next()
     * @constructor
     */
    Next() {
        this.AddToLog()
        this.currentIndex++
        if (this.currentIndex > this.script.length - 1){
            this.finished = true
        }
        this.current = this.script[this.currentIndex]
    }

}