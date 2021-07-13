import styles from './FormActions.module.css';

const FormActions = ({saveHandler, cancelHandler}) => {


    return (
        <div className={styles.formActions}>
                    <h2>Create Lead</h2>
                    <div>
                        <button className={styles.alt} onClick={cancelHandler}>Cancel</button>
                        <button className={styles.alt}>Save and New</button>
                        <button type="submit" className={styles.save} onClick={saveHandler}>Save</button>
                    </div> 
                </div>
    )

}

export default FormActions