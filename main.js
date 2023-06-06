//Hamid werkt eerst aan dialogue System
import initSqlJS from "sql.js"
window.addEventListener('load', ()=> {
    setSQLJS()
    init();
    console.log('Initted')
})
import {Dialogue} from "./DialoguePrototype/dialogue.js";
import {variants, labels} from '@catppuccin/palette'
import {DialogueScreen} from "./src/DialogueScreen.js";
let SQL
let db
async function setSQLJS(){
    SQL = await initSqlJS({
        locateFile: file => `./src/sql-wasm.wasm`
    })
    db = new SQL.Database();
    console.log(db)
}
async function init() {
    document.querySelector('#app').innerHTML = `
  <div>
  
  <!--The 'Main' div contains anything from wallpaper to the regular game. The dialogue gets on top of that.
  and on top of that is another UI-->
  <div id="Main">
  </div>
  
  <div class="overlay">
  
  </div>
  </div>
`
    let protoDiaScreen = new DialogueScreen()

}

export class Terminal {
    MainDiv = document.getElementById('Main');
    terminal = document.createElement('div')
    sidebar = document.createElement('div')
    topbar = document.createElement('div')
    termwin = document.createElement('div')

    constructor() {
        //ID's shouls help with making the css
        this.MainDiv.classList = 'center'

        this.terminal.id = 'Terminal'
        this.sidebar.id = 'Sidebar'
        this.topbar.id = 'Topbar'
        this.termwin.id = 'TerminalWindow'

        this.terminal.style.width = '85vw'
        this.terminal.style.height = '90vh'
        this.terminal.style.left = '50%'
        this.terminal.style.top = '50%'
        this.terminal.style.display = 'flex'
        this.terminal.style.backgroundColor = variants.mocha.base.hex

        this.terminal.appendChild(this.topbar)
        this.topbar.style.backgroundColor = variants.mocha.crust.hex

        this.terminal.appendChild(this.sidebar)
        this.topbar.style.backgroundColor = variants.mocha.overlay2.hex
        this.terminal.appendChild(this.termwin)
        this.MainDiv.appendChild(this.terminal)
    }


}
