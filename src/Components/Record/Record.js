import styles from './Record.module.css';
import {Link} from 'react-router-dom';
import React, { useContext, useState } from 'react';
import AuthContext from '../../Store/Auth/AuthContext';
const Record = (lead) => {
    const { orgId } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);

    const checkBoxHandler = () => {
       setChecked(prevState => !prevState);
    }

    return   (<div className={styles.record}>
        <div style={{minWidth:"3rem", position:"relative"}} className={styles.checkbox}>
             <input type="checkbox" checked={checked} onChange={checkBoxHandler}/>
        </div>
        <Link className={styles.column} to={`/org/${orgId}/leads/${lead.lead.id}`}>
        <div className={ styles.column}> {lead.lead.first_name|| "-"} </div> 
        <div className={ styles.column }> { lead.lead.last_name|| "-" } </div> 
        <div className={styles.column} style={{minWidth:"18rem"}}> { lead.lead.company|| "-" }  </div>
        <div className={styles.column}> { lead.lead.email|| "-" } </div>
        <div className={styles.column}> { lead.lead.secondary_email|| "-" } </div>
        <div className={styles.column}> { lead.lead.website|| "-" } </div>
    </Link>
   </div>);
         

}

export default React.memo(Record);