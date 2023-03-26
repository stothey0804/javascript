import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const Backdrop = (props) => {
	return (
		<div className={classes.backdrop} onClick={props.onClickHandler}></div>
	);
};

const ModalOverlay = (props) => {
	return (
		<Card className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<Button onClick={props.onClickHandler}>Okay</Button>
			</footer>
		</Card>
	);
};

const ErrorModal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop {...props}></Backdrop>,
				document.getElementById("backdropRoot")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay {...props}></ModalOverlay>,
				document.getElementById("overlayRoot")
			)}
		</>
	);
};

export default ErrorModal;
