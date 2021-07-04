import { useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import styles from './LeadsActions.module.css';

const LeadActions = () => {
    const [showOtherActions, setShowOtherActions] = useState(false);
    const match = useRouteMatch();
    const showActionHandler = () => {
        setShowOtherActions(prevState => !prevState)
    }
    
    return (
        <div className={styles["lead-actions"]}>
            <div>
                <h2>Leads</h2>
            </div>
            <div className={styles.actions}>
                <Link className={styles.btn} to={`${match.url}/add-lead`}>Add Lead<div></div></Link>
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

export default LeadActions;