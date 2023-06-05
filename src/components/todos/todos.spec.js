// cypress/integration/todos.spec.js

describe('Todo App', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('adds a new todo', () => {
      const newTodoText = 'Test Todo';
      cy.get('input[placeholder="New Todo"]').type(newTodoText);
      cy.contains('Add Todo').click();
      cy.contains(newTodoText);
    });
  
    it('completes a todo', () => {
      cy.contains('Learn React')
        .siblings('input[type="checkbox"]')
        .check()
        .should('be.checked');
  
      cy.contains('Learn React').should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 0)');
    });
  
    it('edits a todo', () => {
      const editedTodoText = 'Edited Todo';
      cy.contains('Learn React').siblings('button[aria-label="edit"]').click();
      cy.get('input[aria-label="Edit Todo"]').clear().type(editedTodoText);
      cy.contains('Save').click();
      cy.contains(editedTodoText);
    });
  
    it('deletes a todo', () => {
      cy.contains('Learn React').siblings('button[aria-label="delete"]').click();
      cy.contains('Learn React').should('not.exist');
    });
  
    it('displays a prepopulated list of todos', () => {
      cy.contains('Learn React');
      cy.contains('Build a project');
      cy.contains('Deploy to production');
    });
  });
  
  describe('Todo List', () => {
    const todos = [
      { id: '1', text: 'Learn React', completed: false },
      { id: '2', text: 'Build a project', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ];
  
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('displays a list of todos', () => {
      todos.forEach((todo) => {
        cy.contains(todo.text);
      });
    });
  
    it('completes a todo', () => {
      const todo = todos[0];
      cy.contains(todo.text)
        .siblings('input[type="checkbox"]')
        .check()
        .should('be.checked');
  
      cy.contains(todo.text).should(
        'have.css',
        'text-decoration',
        'line-through solid rgb(0, 0, 0)'
      );
    });
  
    it('edits a todo', () => {
      const todo = todos[0];
      const editedTodoText = 'Edited Todo';
      cy.contains(todo.text).siblings('button[aria-label="edit"]').click();
      cy.get('input[aria-label="Edit Todo"]').clear().type(editedTodoText);
      cy.contains('Save').click();
      cy.contains(editedTodoText);
    });
  
    it('deletes a todo', () => {
      const todo = todos[0];
      cy.contains(todo.text).siblings('button[aria-label="delete"]').click();
      cy.contains(todo.text).should('not.exist');
    });
  });