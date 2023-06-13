import { React } from 'react'

import styles from './CardsStyles.module.css'

const Cards = props => {
    return (
        <div className={props.className + " " + styles.card}>
            {props.children}
        </div>
    )
}

export default Cards