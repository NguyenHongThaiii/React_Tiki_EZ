import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css'
TodoList.propTypes = {
    todolist: PropTypes.array,
    TodoClick: PropTypes.func
};
TodoList.defaultProps = {
    todolist: [],
    TodoClick: undefined
}
function TodoList({ todolist, TodoClick }) {
    // const handelTodolist = (todo, index) => {
    //     if (!TodoClick) return;
    //     TodoClick(todo, index)
    // }

    return (
        <ul className="todo-list" >
            {
                todolist.map((todo, index) => (
                    <li key={todo.id}
                        className={classnames({
                            'todo-item': true,
                            completed: todo.status === 'completed'
                        })}
                        onClick={() => TodoClick(todo, index)}
                    >{todo.title}</li>
                ))
            }
        </ul >
    );
}

export default TodoList;