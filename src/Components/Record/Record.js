import styles from './Record.module.css';
import {Link} from 'react-router-dom';
import React, { useContext, useState } from 'react';
import AuthContext from '../../Store/Auth/AuthContext';
const Record = (lead) => {

    const { orgId } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);

    const checkBoxHandler = () => {
       setChecked(prevState => !prevState);
       console.log(lead.id);
    }

    return   <div className={styles.record}>
                <div style={{minWidth:"3rem", position:"fixed", backgroundColor:"#fff", borderRight:"1px solid #a4a8b1"}} className={styles.column}>
                     <input type="checkbox" checked={checked} onChange={checkBoxHandler}/>
                </div>
                <Link className={styles.column} to={`/org/${orgId}/leads/${lead.lead.id}`}>
                <div style={{marginLeft:"3rem"}} className={ styles.column}> {lead.lead.first_name|| "-"} </div> 
                <div className={ styles.column }> { lead.lead.last_name|| "-" } </div> 
                <div className={styles.column} style={{minWidth:"18rem"}}> { lead.lead.company|| "-" }  </div>
                <div className={styles.column}> { lead.lead.email|| "-" } </div>
                <div className={styles.column}> { lead.lead.secondary_email|| "-" } </div>
                <div className={styles.column}> { lead.lead.website|| "-" } </div>
            </Link>
           </div>
         

}

export default React.memo(Record);