export default class Todo {
    constructor(obj) {
        updateProperties(obj);
    };

    updateProperties(obj) {
        this.main = obj.main;
        if (obj.dueDate) {
            this.dueDate = obj.date;
        }
        if (obj.completed) {
            this.completed = obj.completed;
        }
        if (obj.list) {
            this.list = obj.list
        }
        if (obj.important) {
            this.important = obj.important;
        }
    }


}