import axios from "axios";

export const GET = async (req, { params: { id } }) => {
  const newId = parseInt(id);
  try {
    const requests = Array.from(
      { length: newId },
      () => Math.floor(Math.random() * 100) + 1
    );

    const todoResponses = await Promise.all(
      requests.map(id =>
        axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      )
    );
    const todos = todoResponses.map(response => response.data);

    todos.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // completed:true comes after completed:false
      } else {
        // Within the same completed status, sort lexicographically by title
        return a.title.localeCompare(b.title);
      }
    });
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
