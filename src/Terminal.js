import {variants} from "@catppuccin/palette";
import {engine} from "../main.js";

export class Terminal {
    MainDiv = document.getElementById('Main');
    terminal = document.createElement('div')
    sidebar = document.createElement('div')
    topbarInstance = new Topbar()
    topbar = this.topbarInstance.topbar
    termwin = document.createElement('div')
    browserinst
    browserdiv

    constructor(_engine) {
        this._engine = _engine
        this._engine.AddToUpdateList(this)

        //ID's shouls help with making the css
        this.MainDiv.classList = 'center'

        this.browserinst  = new BrowserWindow(this._engine)
        this.browserdiv = this.browserinst.browserwindow
        this.browserdiv.id = 'BrowserWindow'
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

        this.terminal.appendChild(this.sidebar)
        this.sidebar.style.backgroundColor = variants.mocha.overlay0.hex

        this.termwin.appendChild(this.topbar)
        this.topbar.style.backgroundColor = variants.mocha.overlay2.hex

        this.termwin.appendChild(this.browserdiv)

        this.terminal.appendChild(this.termwin)
        this.MainDiv.appendChild(this.terminal)
    }

    Update() {
    }
}

export class Topbar {
    topbar;
    tabs;
    currentActiveTab;
    alertTab;

    constructor() {
        this.topbar = document.createElement('div')
    }
}

export class BrowserWindow {
    browserwindow
    currentTab;
    currentQuerry = "select * from Main where id=1";

    constructor(_engine ,currentTab = 'DBQ') {
        this.browserwindow = document.createElement('div')
        this.currentTab = currentTab;
        this._engine = _engine
        this.onInit();
    }

    callQuerry =(e)=>{
        let QRes = this._engine.db.exec(e.target.value)
        this.result = QRes[0]
        this.DBOutput.innerText = JSON.stringify(this.result)
        console.log(this.result)
    }

    onInit() {
        if (this.currentTab === 'DBQ') {
            this.DBQ = document.createElement('div')
            this.DBQ.id = 'DBQ'
            this.label = document.createElement('label')
            this.label.innerText = "SQL Query"
            this.DBinput = document.createElement('input')
            this.DBinput.id = 'DBInput'
            this.DBinput.value = this.currentQuerry
            this.DBOutput = document.createElement('textarea')
            this.DBOutput.disabled = true
            this.DBOutput.id="DBOutput"

            this.DBinput.addEventListener('change', this.callQuerry)
            this.DBQ.appendChild(this.label)
            this.DBQ.appendChild(this.DBinput)
            this.DBQ.appendChild(this.DBOutput)
            this.browserwindow.appendChild(this.DBQ);
        }

    }

}
