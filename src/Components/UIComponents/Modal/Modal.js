import React from 'react'
import Styles from './ModalStyle.module.css'

const Modal = () => {
    return (
        <div id="myModal" className={Styles.modal}>
            <div className={Styles.modalContent}>
                <span className={Styles.close}>&times;</span>
                <p>Some text in the Modal..</p>
            </div>

        </div>
    )
}


export default Modal;