import * as SQLite from 'expo-sqlite';
import Todo from '../models/Todo'

// Sätter upp en databas med namnet "todos.db"
const todoDb = SQLite.openDatabase("todos.db")



// Startar upp databasen
export const setupDb = () => {

    return new Promise((resolve, reject) => {
        todoDb.transaction((transaction) => {

// Skapar databas tabell med valda columner & restraints
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    completed BOOLEAN NOT NULL
                )`, [],
 // Hanterar resolve eller error beroende på hur transactionen gått
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )

        })
    })

}


// Hämtar information från databas tabellen todo
export const getTableInfo = () => {

    return new Promise((resolve, reject) => {

        todoDb.transaction((transaction) => {

            transaction.executeSql(
                `pragma table_info('todos')`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )

        })
    })

}


// Lägger till en ny todo i databasen
export const insert = (todo) => {
    
 
    return new Promise((resolve, reject) => {

        //metoden transaction tar in parameter (transaction) samt två callback funktioner res & err
        todoDb.transaction(transaction => {
            transaction.executeSql(
                `INSERT INTO todos (title, completed)
                VALUES (?,?)`, [todo.title , todo.isCompleted],
                (tx,res) => resolve(res),
                (tx,err) => reject(err)
            )
        }) 

    })
}

export const findAll = () => {

    return new Promise((resolve, reject) => {
        // skapar en transaction
        todoDb.transaction((transaction) => {
            // utför transaktion
            transaction.executeSql(
                `SELECT * FROM todos`, [],
                (tx, res) => resolve(
                    res.rows._array
                        .map(todo => new Todo(todo.id, todo.title, todo.completed === 1))
                ),
                (tx, err) => reject(err)
            )
        })

    })
}

// Raderar selected todo genom att hämta dess id
export const deleteById = (id) => {

    return new Promise((resolve, reject) => {

        todoDb.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM todos WHERE id = ?`, [id],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })

}
