import Dexie , { Table } from 'dexie';

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
    super('buggy_db');
    this.create();
  }
}

export default function run() {
    var db = new DB();


    db.buildings.clear()
    .then(() => db.buildings.bulkAdd([
      {
        id: 1,
        name: 'Building #1',
        constructor: "Constructor company #1"
      },
      {
        id: 2,
        name: 'Building #2',
        constructor: "Constructor company #2"
      },
    ]))
    .then(() => db.buildings.toArray())
    .then((items: Building[]) => {
      console.log(items);
    })
}
