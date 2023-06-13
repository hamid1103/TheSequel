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
        this.oldTab = this.topbarInstance.currentActiveTab

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

    HideTerminal(){
        this.terminal.style.display = 'none'
    }
    ShowTerminal(){
        this.terminal.style.display = 'flex'
    }

    goalReached = false;
    Update() {
        if(this.topbarInstance.currentActiveTab !== this.oldTab){
            this.oldTab = this.topbarInstance.currentActiveTab
            this.browserinst.currentTab = this.topbarInstance.currentActiveTab
            this.browserinst.setWin();
            console.log(this.topbarInstance.currentActiveTab)
        }
        try {
            if(this.browserinst.currentQuerryResult.values[0][0] === 4 && !this.goalReached){
                alert("GOAL REACHED")
                this.goalReached = true
            }
        }
        catch(err) {
            // do nothing
        }

    }
}

export class Tab{
    icon;
    name;
    tooltip;

    topbardiv;
    tabDiv;
    tooltipdiv;
    constructor(name, icon, tooltip,topbardiv) {
        this.tooltip = tooltip
        this.topbardiv = topbardiv
        this.tabDiv = document.createElement('div')
        this.tabDiv.classList = 'tooltip tab'
        this.tabDiv.id=name
        this.tabDiv.innerText = name
        this.name = name;
        this.icon = icon;

        this.tooltipdiv = document.createElement('div')
        this.tooltipdiv.classList = 'tooltiptext'
        this.tooltipdiv.innerText = this.tooltip

        this.tabDiv.appendChild(this.tooltipdiv)
        this.topbardiv.appendChild(this.tabDiv)
    }
}

export class Topbar {
    topbar;
    tabs = [];
    currentActiveTab;
    alertTab;

    constructor(currentActiveTab = 'DBQ') {
        this.topbar = document.createElement('div')
        this.currentActiveTab = currentActiveTab
        this.DBQ = new Tab('DBQ', '', 'Database Query Tool', this.topbar)
        this.LSQLMan = new Tab('LSQLMan', '', 'LightSQL Manual', this.topbar)
        this.topbar.addEventListener('click', (e)=>{
            if(e.target.classList.contains('tab')){
                this.currentActiveTab = e.target.id
            }
        })
    }
}

export class BrowserWindow {
    browserwindow
    currentTab;
    currentQuerry = "select * from Main where id=1";
    currentQuerryResult

    constructor(_engine ,currentTab = 'DBQ') {
        this.browserwindow = document.createElement('div')
        this.currentTab = currentTab;
        this._engine = _engine
        this.onInit();
    }

    callQuerry =(e)=>{
        this.currentQuerry = e.target.value
        let QRes = this._engine.db.exec(e.target.value)
        this.result = QRes[0]
        this.DBOutput.innerHTML = ''
        this.DBOutput.appendChild(this.CreateSQLTable(this.result.columns, this.result.values))
        this.lastQuerry = e.target.value
        this.currentQuerryResult = this.result
        console.log(this.result)
    }

    CreateSQLTable = (Headers, Values) =>{
        console.log(Headers)
        let Table = document.createElement('table')
        let THead = Table.createTHead()
        let HROW = THead.insertRow()
        for(let header in Headers){
            let th = document.createElement('th')
            let text = document.createTextNode(Headers[header])
            th.appendChild(text)
            HROW.appendChild(th)
        }
        for(let row in Values){
            let newRow = Table.insertRow()
            for(let data in Values[row]){
                let td = document.createElement('td')
                let text = document.createTextNode(Values[row][data])
                td.appendChild(text)
                newRow.appendChild(td)
            }
        }
        return Table
    }

    setWin(first = false){
        this.browserwindow.innerHTML = ''
        switch (this.currentTab){
            case 'DBQ':
                this.setDBQ(first)
                break;
            case 'LSQLMan':
                this.setLSQLMan()
                break;
            default:
                this.browserwindow.innerHTML = 'Page dont exist'
                this.browserwindow.style.color = variants.mocha.text.hex
                break
        }
    }
    onInit() {
        this.setWin(true)
    }

    setDBQ(first = false){
        this.DBQ = document.createElement('div')
        this.DBQ.id = 'DBQ'
        this.label = document.createElement('label')
        this.label.innerText = "SQL Query"
        this.DBinput = document.createElement('input')
        this.DBinput.id = 'DBInput'
        this.DBinput.value = this.currentQuerry
        this.DBOutput = document.createElement('div')
        this.DBOutput.id="DBOutput"
        this.DBTablesO = document.createElement('div')

        this.DBinput.addEventListener('keyup', this.callQuerry)
        this.DBQ.appendChild(this.label)
        this.DBQ.appendChild(this.DBinput)
        this.DBQ.appendChild(this.DBOutput)
        this.browserwindow.appendChild(this.DBQ);
        this.browserwindow.appendChild(this.DBTablesO)

        let QTables = this._engine.db.exec(`select name from sqlite_schema where type='table' AND name not LIKE 'sqlite_%'`)
        let QTablesResult = QTables[0]
        this.DBTablesO.style.color = variants.mocha.text.hex
        this.DBTablesO.appendChild(this.CreateSQLTable(QTablesResult.columns, QTablesResult.values))

        let QRes
        if(first){
            QRes = this._engine.db.exec('select * from Main where id=1')
        }else {
            QRes = this._engine.db.exec(this.lastQuerry)
        }
        this.result = QRes[0]
        this.DBOutput.innerHTML = ''
        this.DBOutput.appendChild(this.CreateSQLTable(this.result.columns, this.result.values))
    }

    setLSQLMan(){

    }

}
