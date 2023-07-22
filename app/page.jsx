"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [number, setNumber] = useState("");

  const getTodos = async e => {
    e.preventDefault();
    const todos = parseInt(number);
    if (number > 100) return toast.error("Input must be less than 100");
    if (number < 1) return toast.error("Input must be greater than 1");
    if (number === "") return toast.error("Input must be greater than 1");
    if (isNaN(number)) return toast.error("Input must be a number");
    let loadingId;
    try {
      loadingId = toast.loading("Loading...");
      const response = await axios.get(`/api/todo/${todos}`);
      toast.dismiss(loadingId);
      toast.success("successfully fetched...");
      setTodos(response.data);
      setNumber("");
    } catch (error) {
      toast.dismiss(loadingId);
      if (number > 50) {
        toast.error("Large number may fail to load");
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    }
  };

  return (
    <div className='w-[90%] mx-auto'>
      <nav className='py-4 px-6'>
        <h1 className='text-2xl font-bold'>Todo List</h1>
      </nav>
      <div className='flex flex-col items-center mt-8'>
        {/* input field */}
        <div className='flex flex-col items-center'>
          <label htmlFor='todo' className='text-gray-700 w-full mb-2'>
            Enter a number between 1 and 100 to get a list of todos
          </label>
          <input
            type='text'
            className='border w-[100%] border-gray-300 rounded px-4 py-2 mb-2'
            id='todo'
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder='Enter a number between 1 and 100'
          />
          <button
            onClick={getTodos}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Submit
          </button>
        </div>
        {/* list of todos */}
        <div className='mt-8'>
          <h1 className='text-3xl font-bold mb-4 text-center underline'>
            Todos
          </h1>
          {/* completed */}
          <div className='mb-4'>
            <h3 className='text-2xl font-bold text-green-500 mb-2'>
              Completed
            </h3>
            {todos
              .filter(todo => todo.completed === true)
              .map(todo => (
                <>
                  <section
                    key={todo.id}
                    className='text-green-500 flex flex-col place-items-start rounded p-2 mb-1'
                  >
                    <div className=''>User Id - Title</div>
                    <div className='gap-9 flex place-items-center rounded p-4'>
                      <h1 className='text-lg font-bold'>{todo.userId}</h1>
                      <p className='text-gray-700'>{todo.title}</p>
                    </div>
                  </section>
                  <hr className='border-green-300' />
                </>
              ))}
          </div>
          {/* not completed */}
          <div>
            <h3 className='text-lg text-red-500 font-bold mb-2'>
              Not Completed
            </h3>
            {todos
              .filter(todo => todo.completed === false)
              .map(todo => (
                <>
                  <section
                    key={todo.id}
                    className='flex text-red-500 flex-col place-items-start p-2 mb-1'
                  >
                    <div className=''>User Id - Title</div>
                    <div className='gap-9 flex place-items-center rounded p-4'>
                      <h1 className='text-lg font-bold'>{todo.userId}</h1>
                      <p className='text-gray-700'>{todo.title}</p>
                    </div>
                  </section>
                  <hr className='border-gray-300' />
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
