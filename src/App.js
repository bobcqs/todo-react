import React from 'react';
import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const initialValues = [
    {
      title: 'Clean up files',
      project: 'Office Chores',
      id: uuidv4(),
    },
    {
      title: 'Walk dog',
      project: 'Life Chores',
      id: uuidv4(),
    },
  ];

  //设定初始化的值
  const [todos, setTodos] = useState(initialValues);

  const addTodo = (title, project) => {
    const todo = {
      title: title,
      project: project,
      id: uuidv4(),
    };
    setTodos(todos.concat(todo));
    console.log(todos);
  };

  const handleDelete = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleUpdateSubmit = (title, project, id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          project,
        }
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className='ui three column centered grid'>
      <div className='column'>
        <TodoList todos={todos} onDelete={handleDelete} onUpdateSubmit={handleUpdateSubmit} />
        <Addbutton onSubmit={addTodo} />
      </div>
    </div>
  );
}

function TodoForm({ onCancel, onFormSubmit }) {
  const [Title, setTitle] = useState([]);
  const [Project, setProject] = useState([]);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleProjectChange = e => {
    setProject(e.target.value);
  }

  const handleSubmit = () => {
    onFormSubmit(Title, Project);
  }

  return (
    <div className='ui centered card'>
      <div className='content'>
        <div className='ui form'>
          <div className='field'>
            <label>Title</label>
            <input type='text' value={Title} onChange={handleTitleChange} />
          </div>
          <div className='field'>
            <label>Project</label>
            <input type='text' value={Project} onChange={handleProjectChange} />
          </div>
          <div className='ui two bottom attached buttons'>
            <button onClick={handleSubmit} className='ui basic blue button'>
              Create
            </button>
            <button onClick={onCancel} className='ui basic red button'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Todo({ onDelete, onUpdate, title, project, id }) {
  const handleDelete = () => onDelete(id);

  return (
    <div className='ui centered card'>
      <div className='content'>
        <div className='header'>
          {title}
        </div>
        <div className='meta'>
          {project}
        </div>
        <div className='extra content'>
          <span
            onClick={onUpdate}
            className='right floated edit icon'
          >
            <i className='edit icon' />
          </span>
          <span
            onClick={handleDelete}
            className='right floated trash icon'
          >
            <i className='trash icon' />
          </span>
        </div>
      </div>
    </div>
  );
}

function TodoItem({ title, project, id, onDelete, onFormSubmit }) {
  const [isUpdate, setIsUpdate] = useState(false);

  //点击update后 设置setIsUpdate为true
  const handleUpdate = () => setIsUpdate(true);

  //点击cancel后 设置setIsUpdate为false
  const handleCancel = () => setIsUpdate(false);

  const handleUpdateSubmit = (Title, Project) => {
    onFormSubmit(Title, Project, id);
    setIsUpdate(false);
  }

  return isUpdate ? (
    <TodoForm
      //向子组件TodoForm通过props传值
      title={title}
      project={project}
      onCancel={handleCancel}
      onFormSubmit={handleUpdateSubmit}
    />
  ) : (
    <Todo
      //向子组件Todo通过props传值
      id={id}
      title={title}
      project={project}
      onDelete={onDelete}
      onUpdate={handleUpdate}
    />
  );
}

function TodoList({ todos, onDelete, onUpdateSubmit }) {
  return todos.map(todo => (
    //向子组件TodoItem通过props传值
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      project={todo.project}
      onDelete={onDelete}
      onFormSubmit={onUpdateSubmit}
    />)
  )
}

function Addbutton({ onSubmit }) {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);

  const handleCancel = () => setShowForm(false);

  const handleSubmit = (title, project) => {
    onSubmit(title, project);
    setShowForm(false);
  }

  return showForm ? (
    //向子组件TodoFrom通过props传值
    <TodoForm onCancel={handleCancel} onFormSubmit={handleSubmit} />
  ) : (
    <div className='ui basic content center aligned segment'>
      <button
        onClick={handleAdd}
        className='ui basic button icon'>
        <i className='plus icon' />
      </button>
    </div>
  );
}

export default App;
