'use strict'

class Observable {
    constructor() {
        this.subscribers = [];
    }


    subscribe (fn) {
        this.subscribers.push(fn);
    }

    unsubscribe(fn) {
        this.subscribers = this.subscribers.filter(it => it !== fn);
    }

    notifySubscribers() {
        this.subscribers.forEach(fn => fn());
    }
}




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


class TodoCollectionModel extends Observable {
    constructor(todos) {
        super();
        this.todos = todos;
    }

    getTodo(id) {
        return this.todos.find(it => it.id === id);
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.notifySubscribers();
    }

    updateTodo(obj) {
        const todo = this.getTodo(obj.id);
        todo.updateProperties(obj);
        this.notifySubscribers();
    }
}


const GreyModalElement = function () {
    const element = document.getElementById('grey-modal-background');
    return {
        show: function() {
            element.classList.remove('hidden');
        },
        hide: function() {
            element.innerHTML = "";
            element.classList.add('hidden');
        },
        appendChild: function(childElement) {
            element.appendChild(childElement)
        }

    }
}();



class TodoTableComponent {
    constructor(obj) {
        this.containerElement = obj.containerElement;
        this.fields = TodoModel.getFields();
        this.updateProperties(obj);


        this.showCreateTodoModalFn = () => {
            const createTodoForm = new CreateTodoFormComponent(
                {},
                this.todoCollection
            );
            createTodoForm.render();

            GreyModalElement.appendChild(createTodoForm.formElement)
            GreyModalElement.show();
            createTodoForm.inputFieldForTitle.focus();
        }


        this.showEditTodoModalFn = event => {
            const rowElement = event.target.closest('tr');
            const todoId = Number(rowElement.querySelector('td:first-child').textContent)
            const editTodoForm = new EditTodoFormComponent(
                {},
                this.todosCollection,
                this.todosCollection.getTodo(todoId)
            );

            editTodoForm.render();
            GreyModalElement.show();
            GreyModalElement.appendChild(editTodoForm.formElement);
            editTodoForm.inputFieldForTitle.focus();
        }


        this.buildDOMElements();
        this.render();
    }

    updateProperties(obj) {
        this.todosCollection = new TodoCollectionModel(obj.todos);
        this.todosCollection.subscribe(() => {
            this.render();
        })
    }

    buildDOMElements() {
        this.tableElement = document.createElement('TABLE');
        this.tableHeaderElement = document.createElement('THEAD');
        this.tableBodyElement = document.createElement('TBODY');
        this.tableElement.appendChild(this.tableHeaderElement);
        this.tableElement.appendChild(this.tableBodyElement);

        this.createAddTodoBtn();
    }

    createAddTodoBtn() {
        this.createTodoBtnElement = document.createElement('BUTTON');
        this.createTodoBtnElement.textContent = "Create Todo";
        this.createTodoBtnElement.addEventListener('click', this.showCreateTodoModalFn);
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
            ${this.todosCollection.todos.map(todo => `
                <tr>
                    <td>${todo.id}</td>
                    <td>${todo.main}</td>
                    <td>${todo.date}</td>
                    <td>${todo.completed}</td>
                </tr>
            `).join('')}
        `;

        for (let i = 0; i < this.tableBodyElement.children.length; i++) {
            const rowElement = this.tableBodyElement.children[i];
            rowElement.addEventListener('click', this.showEditTodoModalFn);
        }
    }

    render() {
        this.renderHead();
        this.renderBody();

        this.containerElement.innerHTML = "";
        this.containerElement.appendChild(this.tableElement);

        this.containerElement.appendChild(this.createTodoBtnElement)
    }
}


class BaseFormAbstract{
    constructor(obj) {
        if (new.target === BaseFormAbstract) {
            throw new TypeError('Cannot construct Abstract instances directly')
        }
        this.method = obj.method || "POST";
        this.action = obj.action || null;
        this.enctype = obj.enctype || null;

        this.buildDOMElements();
        this.updateAttributes();
    }

    buildDOMElements() {
        this.formElement = document.createElement('FORM');
        this.submitButtonElement = document.createElement('BUTTON');
        this.submitButtonElement.type = "submit";
        this.submitButtonElement.textContent = 'Submit';
    }

    updateAttributes() {
        this.formElement.method = this.method;
        this.formElement.action = this.action;
        if (this.enctype) {
            this.formElement.enctype = this.enctype
        }

    }

    submit() {
        this.formElement.submit();
    }
}


class TodoFormAbstract extends BaseFormAbstract  {
    constructor (obj) {
        super(obj);
        if (new.target === TodoFormAbstract) {
            throw new TypeError("Cannot construct Abstract instances directly")
        }

        this.destroyFormFn = () => {
            GreyModalElement.hide();
        }

        this.submitEventFn = event => {
            event.preventDefault();
            this.submit();
        };

        this.updateFormElement();
        this.updateSubmitButtonElement();
        this.buildCancelButton();
    }

    updateFormElement() {
        this.formElement.className = "modal";
    }

    updateSubmitButtonElement() {
        this.submitButtonElement.textContent = "Add Todo";
        this.submitButtonElement.classList.add("green");
        this.submitButtonElement.addEventListener('click', this.submitEventFn);
    }

    buildCancelButton() {
        this.cancelButtonElement = document.createElement('BUTTON');
        this.cancelButtonElement.textContent = "Cancel";
        this.cancelButtonElement.addEventListener('click', this.destroyFormFn);
    }

    validate() {
        let isValid = true;
        const formFields = this.formElement.querySelectorAll('input[type="text"]');
        for (let i = 0; i < formFields.length; i++) {
            if (formFields[i].value === "") {
                isValid = false;

                if (!formFields[i].classList.contains('error')) {
                    formFields[i].classList.add('error');
                }
            } else {
                if (formFields[i].classList.contains('error')) {
                    formFields[i].classList.remove('error');
                }
            }
        }
        return isValid;
    }

    submit() {
        if (this.validate()) {
            this.formElement.submit();
        }
    }

    render() {
        this.formElement.innerHTML = `
            <label>Main:</label>
            <input type="text" name="main" value="" tabIndex="10" />
            <label>Due:</label>
            <input type="text" name="date" value="" tabIndex="20" />
            <label>Completed:</label>
            <input type="checkbox" name="completed" tabIndex="30" />
        `;
        
        this.cancelButtonElement.tabIndex = 100;
        this.submitButtonElement.tabIndex = 110;

        this.formElement.appendChild(this.submitButtonElement);
        this.formElement.appendChild(this.cancelButtonElement);


        this.inputFieldForTitle = this.formElement.querySelector('input[name="main"]');
        this.inputFieldForDate = this.formElement.querySelector('input[name="date"]')
        this.inputFieldForCompleted = this.formElement.querySelector('input[name="completed"]')

    }
}

class CreateTodoFormComponent extends TodoFormAbstract {
    constructor(obj, todosCollection){
		super(obj);
		this.todosCollection = todosCollection;
	}

	submit(){
		if(this.validate()){
			let todo = new TodoModel({
				id: this.todosCollection.todos.length + 1,
				main: this.inputFieldForTitle.value,
				date: this.inputFieldForDate,
				completed: this.inputFieldForCompleted.value
			});
			this.todosCollection.addTodo(todo);
			this.destroyFormFn();
		}
	}
}


class EditTodoFormComponent extends TodoFormAbstract{

	constructor(obj, todosCollection, todo){
		super(obj);
		this.todosCollection = todosCollection;
		this.todo = todo;

		this.submitButtonElement.textContent = "Update todo";
		this.buildInputFieldForId();
	}

	buildInputFieldForId(){
		this.inputFieldForId = document.createElement('INPUT');
		this.inputFieldForId.name = "id";
		this.formElement.appendChild(this.inputFieldForId);
	}

	bindTodoToForm() {
		this.inputFieldForTitle.value = this.todo.main;
		this.inputFieldForDate.value = this.todo.date;
		this.inputFieldForCompleted.value = this.todo.completed;
		this.inputFieldForId.value = this.todo.id;
	}

	submit(){
		if(this.validate()){
			const todoProperties = {
				id: Number(this.inputFieldForId.value),
				main: this.inputFieldForTitle.value,
				// I just create a new author here for the sake of simplicity
				date: this.inputFieldForDate.value,
				completed: this.inputFieldForCompleted
			};
			this.todosCollection.updateTodo(todoProperties);
			this.destroyFormFn();
		}
	}

	render(){
		super.render();
		this.bindTodoToForm();
	}
}

