import './App.scss';
import {useState, useEffect} from "react";
import queryString from "query-string";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFilterForm from "./components/PostFilterForm";


function App() {

  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Learn English'},
    {id: 2, title: 'Learn React'},
    {id: 3, title: 'Learn Angular'},
  ]);

  const [postList, setPostList] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Error to fetch post lists: ', error.message);
      }
    }
    fetchPostList();
  }, [filter]);

  useEffect(() => {

  });

  function handlePageChange(newPage) {
    // console.log('newPage', newPage);
    setFilter({
      ...filter,
      _page: newPage
    });
  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    // console.log(formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFilterChange(newFilter) {
    // console.log(newFilter);
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTerm
    });
  }


  return (
    <div className="app">
      <h1>React Hook - PostList</h1>

      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>

      <hr/>
      <PostFilterForm onSubmit={handleFilterChange}/>
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />

    </div>
  );
}

export default App;
