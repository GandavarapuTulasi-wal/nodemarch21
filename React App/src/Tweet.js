import axios from 'axios';
import { useEffect, useState } from 'react';

function Tweet() {
  let [tweets, setTweet] = useState([]);
  useEffect(() => {
    getTweets();
  }, []);
  const getTweets = () => {
    axios
      .get('/tweets')
      .then((res) => {
        setTweet(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTweet = (event) => {
    event.preventDefault();
    const tweetObject = {
      title: event.target.title.value,
      body: event.target.body.value,
      date_of_creation: event.target.date_of_creation.value,
      author: event.target.author.value,
      category: event.target.category.value,
    };
    axios
      .post('/tweets', tweetObject)
      .then((res) => {
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (indexToDelete) => {
    axios
      .delete('/tweets/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTweets();
  };
  const deleteAll = () => {
    axios
      .get('/tweets/deleteall')
      .then((res) => {
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card-container">
      <h1>Product Form</h1>
      <form onSubmit={addTweet} className="box">
        <input
          type="text"
          name="title"
          placeholder="Enter Tweet Title"
          className="todo-user-input"
        />
        <textarea
          cols="20"
          rows="5"
          placeholder="Enter Twitter Body"
          name="body"
          className="todo-user-input"
        ></textarea>
        <input
          type="date"
          name="date_of_creation"
          className="todo-user-input"
        />
        <input
          type="text"
          name="author"
          placeholder="Enter Author"
          className="todo-user-input"
        />
        <select name="category" className="todo-user-input">
          <option value="toys">entertainment</option>
          <option value="clothes">study</option>
          <option value="fooditems">politics</option>
          <option value="fooditems">sports</option>
        </select>
        <button>Add</button>
      </form>
      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <div>
        <h1>Tweets</h1>
        {tweets.map((val, index) => (
          <div className="card">
            <h3>{val.title}</h3>
            <p>{val.body}</p>
            <p>{val.date_of_creation}</p>
            <p>{val.author}</p>
            <p>{val.category}</p>
            <button
              className="delete"
              onClick={() => {
                deleteTodo(index);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Tweet;
