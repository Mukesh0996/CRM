import styles from './Input.module.css';
import React from 'react';

const Input = ({label, value, type , name, handleChange, section, error}) => {
   
    return <div className={`${styles.formControl} ${error && error.value === name ? styles.error: ""}`}>
                <label htmlFor={name}>{label}</label>
                <input id={name} type={type} value={value} name={name} onChange={(e)=> handleChange(e , section)} autoComplete="none"/>
                { error && error.value === name && <p className={styles.errorMessage}>{error.message}</p> }
            </div>            
};

export default React.memo(Input);