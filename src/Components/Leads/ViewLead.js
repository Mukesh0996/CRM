import {  faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../Hooks/httpHook';
import { getSingleLeadRecord } from '../../Store/Leads/leads-actions';
import styles from './ViewLead.module.css';

const ViewLead = () => {

    const params = useParams();
    const {orgId, leadId} = params;
    const [lead, setLead] = useState({});
    const {sendRequest : fetchLeadRecord , isLoading, error} = useHttp(getSingleLeadRecord, false);

    useEffect(() => {
        fetchLeadRecord({orgId, leadId}, (leadRecord) => {
                setLead(leadRecord);
        });
        
    }, []);
    const navigateBackHandler = () => {

    }


return <section className={styles.singleRecord}>
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
                <section className={styles.leftPane}>Hello</section>
                <section className={styles.rightPane}>
                       <div className={styles.full}></div>
                </section>
            </section>
</section>
}

export default ViewLead;