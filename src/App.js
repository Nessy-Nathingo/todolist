import React, { useState, useEffect } from 'react';
import { Button, Input, List } from 'semantic-ui-react';
import Todo from './components/Todo';
import Footer from './components/Footer';
import db from './firebase';
import firebase from 'firebase';

import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);

	//when the app loads, liten to database and get todos from database

	useEffect(() => {
		// code here runs when the app loads
		db.collection('todos')
			.orderBy('timeStamp', 'desc')
			.onSnapshot((snapshot) => {
				setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })));
			});
	}, []);

	// Function that adds a todo to the firebase database
	const addToDo = (event) => {
		event.preventDefault();

		db.collection('todos').add({
			todo: input,
			timeStamp: firebase.firestore.FieldValue.serverTimestamp(), //creates a timestamp value for todo
		});

		setInput(''); //clears input field after adding todo
		
	};

	return (
		<div className="App">
			<h1>ToDo List</h1>
			<div>
				<Input
					size="small"
					type="text"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Enter a todo"
				/>
				<Button disabled={!input} type="submit" icon="add" onClick={addToDo} />

				<hr />
				<div className="list_container">
					<ul>
						{todos.map((todo) => (
							<List key={todo.id} className="list">
								<List.Header>
									<Todo todo={todo} />
								</List.Header>
							</List>
						))}
					</ul>
				</div>
				<hr />
			</div>
			<Footer/>
		</div>
	);
}

export default App;
