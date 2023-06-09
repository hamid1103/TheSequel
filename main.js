//Hamid werkt eerst aan dialogue System
import initSqlJS from "sql.js"
import {Dialogue} from "./DialoguePrototype/dialogue.js";
import {variants, labels} from '@catppuccin/palette'
import {DialogueScreen} from "./src/DialogueScreen.js";

export class engine{
    SQL;
    db;
    ToUpdate= []
    constructor() {

    }
    AddToUpdateList(item){
        this.ToUpdate.push(item)
    };
    Update(){
        for (let Obj in this.ToUpdate){
            if(typeof this.ToUpdate[Obj].Update === 'function'){
                this.ToUpdate[Obj].Update()
            }
        }
    }


}
let game = new engine()


window.main = () => {
    window.requestAnimationFrame(main)
    game.Update();
}

window.addEventListener('load', ()=> {
    setSQLJS().then(r =>     console.log('Initted SQL'))
    init().then(() => {
        main()
        console.log('Initted Game')
    });
}, { once: true })

async function setSQLJS(){
    game.SQL = await initSqlJS({
        locateFile: file => `./src/sql-wasm.wasm`
    })
    game.db = new game.SQL.Database();
    let sqlInitQuery = 'CREATE TABLE Main (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR, country VARCHAR);\n' +
        'INSERT INTO Main (id, email, name, country) VALUES (1, \'cras.lorem@yahoo.com\', \'Brock Downs\', \'Norway\');\n' +
        'INSERT INTO Main (id, email, name, country) VALUES (2, \'hamid.en.hidde@gmail.com\', \'Hamid\', \'Netherlands\');\n' +
        'INSERT INTO Main (id, email, name, country) VALUES (3, \'bussiness@arcadianflame.nl\', \'Bussiness\', \'Netherlands\');\n' +
        'INSERT INTO Main (id, email, name, country) VALUES (4, \'corvo@arcadianflame.nl\', \'Corvo\', \'Netherlands\');'
    game.db.run(sqlInitQuery)
    console.log(game.db.exec("select * from Main where id=1"))
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
    let protoDiaScreen = new DialogueScreen(game)

}
