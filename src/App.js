import './App.scss';
import {useState, useEffect} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

function App() {

  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Learn English'},
    {id: 2, title: 'Learn React'},
    {id: 3, title: 'Learn Angular'},
  ]);

  const [postList, setPostList] = useState([])

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const {data} = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('Error to fetch post lists: ', error.message);
      }
    }
    console.log('POST list effect');
    fetchPostList();
  }, []);

  useEffect(() => {
    console.log('TODO list effect');
  })

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


  return (
    <div className="app">
      <h1>React Hook - PostList</h1>

      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>

      <hr/>
      <PostList posts={postList} />

    </div>
  );
}

export default App;
