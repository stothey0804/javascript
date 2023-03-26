import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

function App() {
	const [userList, setUserList] = useState([]);

	const addUserHandler = (uName, uAge) => {
		setUserList((prevUserList) => [
			...prevUserList,
			{ username: uName, age: uAge, id: Math.random().toString() },
		]);
	};

	return (
		<>
			<AddUser userList={userList} onAddUser={addUserHandler}></AddUser>
			<UserList userList={userList}></UserList>
		</>
	);
}

export default App;
