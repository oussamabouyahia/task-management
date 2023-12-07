import { useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ListOfTask from "./components/ListOfTask";
import AddTask from "./components/AddTask";

type TaskType = {
  _id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
};
function App() {
  const [list, setList] = useState<TaskType[]>([]);
  return (
    <>
      <h1>Task management</h1>

      <BrowserRouter>
        <div
          style={{
            display: "flex",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/task">Tasks</Link>
          <Link to="/add">new task</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/task"
            element={<ListOfTask list={list} setList={setList} />}
          />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
