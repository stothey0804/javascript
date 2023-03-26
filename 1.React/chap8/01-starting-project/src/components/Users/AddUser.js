import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState();

	const errorHandler = (e) => {
		setError(null);
	};

	const addUserHandler = (e) => {
		e.preventDefault();
		const enteredUsername = nameInputRef.current.value;
		const enteredAge = ageInputRef.current.value;
		// 검증과 초기화
		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({ title: "Invalid input", message: "Name or Age is empty." });
			return;
		}

		if (+enteredAge < 1) {
			setError({
				title: "Invalid age",
				message: "Age must be greater than 0 years old.",
			});
			return;
		}
		props.onAddUser(enteredUsername, enteredAge);
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	return (
		<>
			{error && (
				<ErrorModal
					title={error?.title}
					message={error?.message}
					onClickHandler={errorHandler}
				></ErrorModal>
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						type={`text`}
						id="username"
						// onChange={usernameChangeHandler}
						// value={enteredUsername}
						ref={nameInputRef}
					></input>
					<label htmlFor="age">Age (Years)</label>
					<input
						type={`number`}
						id="age"
						// onChange={ageChangeHandler}
						// value={enteredAge}
						ref={ageInputRef}
					></input>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</>
	);
};

export default AddUser;
