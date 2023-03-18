import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredAge, setEnteredAge] = useState("");

	const usernameChangeHandler = (e) => {
		setEnteredUsername(e.target.value);
	};

	const ageChangeHandler = (e) => {
		setEnteredAge(e.target.value);
	};

	const addUserHandler = (e) => {
		e.preventDefault();
		// 검증과 초기화
		// if (enteredAge === "" || enteredUsername === "") {
		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			alert("이름 또는 나이가 공란");
			return;
		}

		if (+enteredAge < 1) {
			alert("나이는 1이상 이어야 합니다");
			return;
		}
		// const userInfo = { username: enteredUsername, age: enteredAge };
		// props.setUserList(() => [...props.userList, userInfo]);
		props.onAddUser(enteredUsername, enteredAge);

		setEnteredUsername("");
		setEnteredAge("");
	};

	return (
		<Card className={classes.input}>
			<form onSubmit={addUserHandler}>
				<label htmlFor="username">Username</label>
				<input
					type={`text`}
					id="username"
					onChange={usernameChangeHandler}
					value={enteredUsername}
				></input>
				<label htmlFor="age">Age (Years)</label>
				<input
					type={`number`}
					id="age"
					onChange={ageChangeHandler}
					value={enteredAge}
				></input>
				<Button type="submit">Add User</Button>
			</form>
		</Card>
	);
};

export default AddUser;
