'use strict'

class TodoModel {
    constructor(obj) {
        this.updateProperties(obj);
    }


    updateProperties(obj) {
        this.id = obj.id;
        if(obj.main) this.main = obj.main;
        if (obj.date) this.date = obj.date;
        if (obj.completed) this.completed = obj.completed;
    }

    static getFields() {
        return ['id', 'main', 'date', 'completed']
    }
}

class TodoTableComponent {
    constructor(obj) {
        this.containerElement = obj.containerElement;
        this.fields = TodoModel.getFields();
        this.updateProperties(obj);
        this.buildDOMElements();
        this.render();
    }

    updateProperties(obj) {
        this.todos = obj.todos;
    }

    buildDOMElements() {
        this.tableElement = document.createElement('TABLE');
        this.tableHeaderElement = this.tableElement.createTHead();
        this.tableBodyElement = document.createElement('TBODY');
        this.tableElement.appendChild(this.tableBodyElement);
    }

    renderHead() {
        this.tableHeaderElement.innerHTML = `
            <tr>
                ${this.fields.map(item => `<th>${item}</th>`).join('')}
            </tr>
        `;
    }

    renderBody() {
        this.tableBodyElement.innerHTML = `
            ${this.todos.map(todo => `
                <tr>
                    <td>${todo.id}</td>
                    <td>${todo.main}</td>
                    <td>${todo.date}</td>
                    <td>${todo.completed}</td>
                </tr>
            `).join('')}
        `;
    }

    render() {
        this.renderHead();
        this.renderBody();

        this.containerElement.innerHTML = "";
        this.containerElement.appendChild(this.tableElement);
    }
}