import Dexie , { Table } from 'dexie';
import './style.css'

const appEl = document.querySelector('#app')!;

interface Building {
  id: number;
  name: string;
  constructor: string;
}

class DB extends Dexie {
  buildings!: Table<Building>;

  create = () => {
    if (this.isOpen()) return;

    this.version(1).stores({
        buildings: 'id, name, constructor' 
    });

    if (!this.isOpen()) this.open();
  };

  constructor() {
    super('buildings_db');
    this.create();
  }
}

var db = new DB();


db.buildings.bulkAdd([
  {
    id: 1,
    name: 'Building #1',
    constructor: "Constructor company"
  }
])
.then(() => db.buildings.toArray())
.then((items) => {
  appEl.innerHTML = `${appEl}`
  console.log('shit')
})

