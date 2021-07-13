import styles from './Record.module.css';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../Store/Auth/AuthContext';
const Record = (lead) => {

    const checkBoxHandler = () =>{
       
    }
   
    const { orgId } = useContext(AuthContext);
    return   <div className={styles.record}>
                <div style={{minWidth:"3rem", position:"fixed", backgroundColor:"#fff", borderRight:"1px solid #a4a8b1"}} className={styles.column}>
                     <input type="checkbox" onClick={checkBoxHandler}/>
                </div>
                <Link className={styles.column} to={`/org/${orgId}/leads/${lead.lead.id}`}>
                <div style={{marginLeft:"3rem"}} className={ styles.column}> {lead.lead.first_name|| "-"} </div> 
                <div className={ styles.column }> { lead.lead.last_name|| "-" } </div> 
                <div className={styles.column}> { lead.lead.email|| "-" } </div>
                <div className={styles.column} style={{minWidth:"18rem"}}> { lead.lead.company|| "-" }  </div>
                <div className={styles.column}> { lead.lead.website|| "-" } </div>
                <div className={styles.column}> { lead.lead.phone|| "-" } </div>
                <div className={styles.column}> { lead.lead.secondary_email|| "-" } </div>
                <div className={styles.column}> { lead.lead.mobile|| "-" } </div>
                <div className={styles.column}>  { lead.lead.fax|| "-" } </div>
                <div className={styles.column}> { lead.lead.lead_scource|| "-" } </div>
                <div className={styles.column}> { lead.lead.language|| "-" } </div>
                <div className={styles.column}> { lead.lead.lead_industry|| "-" } </div>
                <div className={styles.column}> { lead.lead.skype_id|| "-" } </div>
                <div className={styles.column}> { lead.lead.state|| "-" } </div>
                <div className={styles.column}> { lead.lead.street|| "-" } </div>
                <div className={styles.column}> { lead.lead.po|| "-" }  </div>
                <div className={styles.column}>{ lead.lead.zip_code|| "-" }</div>
                <div className={styles.column}> { lead.lead.city|| "-" } </div>
            <div className={styles.column}> { lead.lead.country|| "-" }</div>
            </Link>
           </div>
         

}

export default Record;