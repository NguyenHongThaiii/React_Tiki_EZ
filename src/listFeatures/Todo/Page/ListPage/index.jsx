import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useMemo } from 'react/cjs/react.development';
import TodoHookForm from '../../components/TodoHookForm/index.jsx';
import TodoList from '../../components/TodoList/index.jsx';
ListPage.propTypes = {};

function ListPage() {
  const initTodolist = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'completed',
    },
  ];
  const location = useLocation();
  const history = useHistory();
  const params = useParams(location.search);
  console.log('params', params);
  // console.log(history.location.pathname);
  /*history dùng để đưa đường dẫn về nơi khác 
  vd: history.push('/home) thì đưa về home */
  const [todolist, setTodolist] = useState(initTodolist);
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterStatus(params.status || 'all');
  }, [location.search]);
  const handelTodolist = (todo, index) => {
    if (index > -1) {
      const newTodo = [...todolist];
      newTodo[index] = {
        ...newTodo[index],
        status: newTodo[index].status === 'new' ? 'completed' : 'new',
      };
      setTodolist(newTodo);
    } else {
      console.log('Chưa truyền index');
    }
  };
  const handelShowAll = () => {
    const queryParams = { status: 'all' };
    // history.push(`?${queryString.stringify(queryParams)}`)
    history.push({
      // pathname: match.path,
      search: queryString.stringify(queryParams),
      // search dùng để thêm dấu ? trước search
    });
  };
  const handelShowCompleted = () => {
    const queryParams = { status: 'completed' };
    // history.push('/?status=completed')
    history.push({
      // pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handelShowNew = () => {
    const queryParams = { status: 'new' };
    // history.push(queryString.stringify(queryParams))
    history.push({
      // pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderFilter = useMemo(() => {
    return todolist.filter((todo) => todo.status === filterStatus || filterStatus === 'all');
  }, [todolist, filterStatus]);

  // function HandelFormSubmit(formData) {
  //   const newTodoList = [...todolist];
  //   const newTodo = {
  //     id: todolist.length + 1,
  //     status: 'new',
  //     ...formData,
  //   };
  //   newTodoList.push(newTodo);
  //   setTodolist(newTodoList);
  // }
  const handelFormHook = (values) => {
    console.log(values);
    const newTodo = {
      id: todolist.length + 1,
      status: 'new',
      title: values.title,
    };
    // newTodoList.push(newTodo);
    const newTodoList = [...todolist, newTodo];
    setTodolist(newTodoList);
  };
  return (
    <div>
      {/* <TodoForm onSubmit={HandelFormSubmit} /> */}
      <TodoHookForm onSubmit={handelFormHook} />
      <TodoList todolist={renderFilter} TodoClick={handelTodolist} />
      <div>
        <button onClick={handelShowAll}>handelShowAll</button>
        <button onClick={handelShowCompleted}>handelShowCompleted</button>
        <button onClick={handelShowNew}>handelShowNew</button>
      </div>
    </div>
  );
}

export default ListPage;
