import { useHistory } from 'react-router-dom';
import styles from './FormActions.module.css';

const FormActions = ({saveHandler, module}) => {
    const history = useHistory();

    const cancelHandler = (event) =>{
        event.preventDefault();
        history.goBack(-1);

    }
    return (
        <div className={styles.formActions}>
                    <h2>Create {module}</h2>
                    <div>
                        <button className={styles.alt} onClick={cancelHandler}>Cancel</button>
                        <button className={styles.alt}>Save and New</button>
                        <button type="submit" className={styles.save} onClick={saveHandler}>Save</button>
                    </div> 
                </div>
    )

}

export default FormActions