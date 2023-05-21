import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ITransaction} from '../redux/models/ModelApp';

const tableName = 'transactions';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: 'posApp-data.db', createFromLocation: '~posApp-data.db'},

    () => {
      console.log('succes');
    },
    (error: any) => {
      console.log('error', error);
    },
  );
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    acudienteID TEXT,
    acudienteNombre TEXT,
    detalleMovimiento TEXT,
    cedula TEXT NOT NULL,
    fecha TEXT NOT NULL,
    idComercio INT NOT NULL,
    idMovimiento INT NOT NULL,
    idPrograma INT NOT NULL,
    idSucursales INT NOT NULL,
    idUsuario INT NOT NULL,
    montoTransaccion NUM NOT NULL,
    tipoOperacion TEXT NOT NULL,
    trackingNumber TEXT NOT NULL,
    isConsolidated INT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getTodoItems = async (
  db: SQLiteDatabase,
): Promise<ITransaction[]> => {
  console.log('db get');
  try {
    const todoItems: ITransaction[] = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (
  db: SQLiteDatabase,
  todoItems: ITransaction[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(acudienteID,
        acudienteNombre,
        detalleMovimiento,
        cedula,
        fecha,
        idComercio,
        idMovimiento,
        idPrograma,
        idSucursales,
        idUsuario,
        montoTransaccion,
        tipoOperacion,
        trackingNumber,
        isConsolidated) values` +
    todoItems
      .map(
        i =>
          `('${
            i.acudienteID && i.acudienteID.length > 0 ? i.acudienteID : null
          }','${
            i.acudienteNombre && i.acudienteNombre.length > 0
              ? i.acudienteNombre
              : null
          }','${i.detalleMovimiento}','${i.cedula}','${i.fecha}',${
            i.idComercio
          },
          ${i.idMovimiento},${i.idPrograma},${i.idSucursales},${i.idUsuario},'${
            i.montoTransaccion
          }','${i.tipoOperacion}',
          '${i.trackingNumber}',0)`,
      )
      .join(',');
  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (
  db: SQLiteDatabase,
  list: ITransaction[],
) => {
  console.log('to remove', list);
  let ids = list.map(item => item.trackingNumber).join(',');

  const deleteQuery = `DELETE from ${tableName} where trackingNumber IN (${ids})`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
