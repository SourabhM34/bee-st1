let fs = require("fs");
let path = require("path");
let filepath = path.join(__dirname, "..", "data", "todo.js");

class todo {
    constructor(id, taskitem) {
        this.id = id;
        this.taskitem = taskitem;
    }
    static deletetodo(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length === 0) {
                        data = [];
                    } else {
                        data = JSON.parse(data);
                        data = data.filter(element => element.id !== id);
                    }
    
                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task deleted");
                        }
                    )
                }
            )
        })
    }
    
    static updatetodo(id, taskitem) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length === 0) {
                        data = [];
                    } else {
                        data = JSON.parse(data);
                        data = data.map(element => {
                            if (element.id === id) {
                                element.taskitem = taskitem;
                            }
                            return element;
                        });
                    }
    
                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task updated");
                        }
                    )
                }
            )
        })
    }
    
    static gettodo() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    resolve(JSON.parse(data));
                }
            )
        })
    }

    static addtodo(id, taskitem) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length === 0) {
                        data = [];
                    } else {
                        data = JSON.parse(data);
                    }
                    
                    const newTodo = new todo(id, taskitem);
                    data.push(newTodo);

                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task added");
                        }
                    )
                }
            )
        })
    }
}

module.exports = todo;