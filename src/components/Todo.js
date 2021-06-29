import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../firebase';
import './Todo.css';

function Todo(props) {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState();

	let todo = props.todo;

	//Function that deletes a todo from the firebase database
	const deleteTodo = (event) => {
		event.preventDefault();

		try {
			db.collection('todos').doc(todo.id).delete();
		} catch (error) {
			console.log('Here', error);
		}
	};

	//This function updates the selected todo from the firebase database
	const updateTodo = (event) => {
		event.preventDefault();

		try {
			db.collection('todos').doc(props.todo.id).set(
				{
					todo: input,
				},
				{ merge: true }
			);

			toast.success('Successfully updated', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			setOpen(false);
		} catch (error) {
			alert('Error updating', error);
		}
	};

	const handleOpen = (event) => {
		event.preventDefault();
		setOpen(true);
	};

	return (
		<React.Fragment>
			<Modal
				basic
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				size="small"
				className="modal"
				size="mini"

			>
				<Modal.Header>Update Todo</Modal.Header>

				<Modal.Content>
					<input
						className="modal-container"
						placeholder={props.todo.todo}
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={updateTodo}>Update</Button>
					<Button onClick={() => setOpen(!true)}>Cancel</Button>
				</Modal.Actions>
			</Modal>

			<form className="form-container">
				<input disabled value={todo.todo} className="form-item" aria-label="Small" icon="delete" />
				<Button size="mini" icon="edit" onClick={handleOpen} />
				<Button size="mini" icon="delete" onClick={deleteTodo} />
			</form>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</React.Fragment>
	);
}

export default Todo;
