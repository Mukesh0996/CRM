import React, { useEffect, useState } from 'react';
import styles from './ViewLead.module.css';
import { useParams } from 'react-router';

import {  faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useHttp from '../../Hooks/httpHook';
import TopBarLoading from '../../Pages/LoadingTopBar';
import { getSingleLeadRecord } from '../../Store/Leads/leads-actions';
import AddNote from '../AddNote/AddNote';

const ViewLead = () => {

    const params = useParams();
    const {orgId, leadId} = params;
    const [lead, setLead] = useState([]);
    let displayRecord;

    const {sendRequest : fetchLeadRecord , isLoading, error} = useHttp(getSingleLeadRecord, false);

    useEffect(() => {
        fetchLeadRecord({orgId, leadId}, (leadRecord) => {
            setLead(leadRecord.record)
        });
        
    }, []);
    const navigateBackHandler = () => {

    }

    if(lead) {
        displayRecord =  Object.keys(lead).map((leadR, index) => {
                    return <div className={styles.field} key={index}> 
                                <div className={styles.label}>{ leadR }</div> 
                                <div className={styles.value}>{ lead[leadR] || "-" }</div> 
                            </div>
                })
       
    }

    const mouseDownHandler = (e) => e.preventDefault();


return <section className={styles.singleRecord}>
            { isLoading && <TopBarLoading/>}
            <section className={styles["singleRecord-actions"]}>
                <div className={styles.back}>
                    <FontAwesomeIcon icon={faBackward} onClick={navigateBackHandler}/>
                    <p>{ "" || lead.last_name}</p>
                </div>
                <div className={styles.action}>
                    <button className={styles.convert}>Convert</button>
                    <button className={styles.edit}>Edit</button>
                    <button className={styles.clone}>Clone</button>
                    <button className={styles.delete}>Delete</button>
                </div>
            </section>
            <section className={styles.values}>
                <section className={styles.rightPane}>
                       <div className={styles.full}>
                            <h1 className={styles.leadInfo}>Lead Information:</h1>
                            <div className={styles.full}>  {displayRecord}</div>     
                       </div>
                       <div className={styles.notes}>
                            <h1>Notes:</h1>
                            <AddNote/>                            
                       </div>
                </section>
            </section>
</section>
}

export default ViewLead;