import { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import styles from './LeadsActions.module.css';

const ModuleActions = (props) => {
    const [showOtherActions, setShowOtherActions] = useState(false);
    const match = useRouteMatch();
    const showActionHandler = () => {
        setShowOtherActions(prevState => !prevState)
    }
    
    return (
        <div className={styles["lead-actions"]}>
            <div style={{marginLeft:"1.5rem"}}>
                <h2>{props.module}</h2>
            </div>
            <div className={styles.actions}>
                <Link className={styles.btn} to={`${match.url}/${props.path}`}>Add {props.module}<div></div></Link>
                <div className={styles.additional}>
                <button className={`${styles["btn"]} ${styles["btn-alt"]}`} onClick={showActionHandler}>Actions</button>
                    { showOtherActions && <div className={styles["other-actions"]}>
                        <ul className={styles["actions-list"]}>
                            <li>Send Email</li>
                            <li>Bulk Update</li>
                            <li>Bulk Delete</li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )

}

export default ModuleActions;