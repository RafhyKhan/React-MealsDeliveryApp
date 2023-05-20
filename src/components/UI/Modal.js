
import classes from './Modal.module.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
/*
Modal I finished, from previous 
*/

//Not using conetxt allows you to make the module more reusable and doesnt tie it to a specific case
const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
}

const ModalOverlay = props => {

    //props.children is where content passes through
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}



const portalElement = document.getElementById('overlays');

const Modal = props => {

    //will be using portals, made portal in HTMl file <div if='overlay..'></div>
    //will be using DOM to connect to the div we mad ein HTML, and portalElement variable to save code

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement )}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;