import React from "react";
import {createPortal} from "react-dom"

import classes from './Modal.module.css'

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop}></div>
  );
}

const ModalOverlay = (props) => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}

const potalElem = document.getElementById('overlays');

const Modal = (props) => {
  return (<>
  {createPortal(<Backdrop></Backdrop>, potalElem)}
  {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, potalElem)}
  </>);
};

export default Modal;