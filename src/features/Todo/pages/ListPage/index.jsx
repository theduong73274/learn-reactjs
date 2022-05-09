import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import TodoList from "../../components/TodoList";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import TodoForm from "../../components/TodoForm";

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "new",
    },
    {
      id: 3,
      title: "Code",
      status: "completed",
    },
    {
      id: 4,
      title: "Learn",
      status: "new",
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filterStatus, setFilterStatus] = useState(() =>{

    // Filter URL params
    const params = queryString.parse(location.search);
    // console.log(params);
    return params.status || 'all';
  });

  useEffect(() =>{
    const params = queryString.parse(location.search);
    // Update URL Param
    setFilterStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // console.log(todo, idx);
    // clone current array to the new one
    const newTodoList = [...todoList];

    // toggle state
    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    newTodoList[idx] = newTodo;

    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    // setFilterStatus('all');
    const queryParam = {status: 'all'};
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParam),
    })
  }

  const handleShowCompletedClick = () => {
    // setFilterStatus('completed');
    const queryParam = {status: 'completed'};
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParam),
    })
  }

  const handleShowNewClick = () => {
    // setFilterStatus('new');
    // Update URL Params
    const queryParam = {status: 'new'};
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParam),
    })
  }

  const renderedTodoList = useMemo(() => {

    return todoList.filter((todo) => filterStatus === 'all' || filterStatus === todo.status);
  }, [todoList, filterStatus]) 
  
  // console.log(renderedTodoList);

  const handleTodoFormSubmit = (values) => {
    // console.log('Form Submit', values);

    const newTodo = {
      id: new Date().getTime(),
      title: values.title,
      status: "new",
    };

    // Add newTodoList in todoList
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  }

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />


      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      {/* <TodoList todoList={todoList} onTodoClick={handleTodoClick} /> */}

      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>

      </div>
    </div>
  );
}

export default ListPage;
