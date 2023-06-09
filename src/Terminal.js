import {variants} from "@catppuccin/palette";

export class Terminal {
    MainDiv = document.getElementById('Main');
    terminal = document.createElement('div')
    sidebar = document.createElement('div')
    topbarInstance = new Topbar()
    topbar = this.topbarInstance.topbar
    termwin = document.createElement('div')
    browserinst = new BrowserWindow()
    browserdiv = this.browserinst.browserwindow

    constructor() {
        //ID's shouls help with making the css
        this.MainDiv.classList = 'center'

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
}

export class Topbar{
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
    constructor() {
        this.browserwindow = document.createElement('div')
    }
}
