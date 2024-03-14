import Dexie , { Table } from 'dexie';

interface Building {
  id: number;
  name: string;
}

class DB extends Dexie {
  buildings!: Table<Building>;

  create = () => {
    if (this.isOpen()) return;

    this.version(1).stores({
        buildings: 'id, name' 
    });

    if (!this.isOpen()) this.open();
  };

  constructor() {
    super('okay_db');
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
      },
      {
        id: 2,
        name: 'Building #2',
      },
    ]))
    .then(() => db.buildings.toArray())
    .then((items: Building[]) => {
      console.log(items);
    })
}
