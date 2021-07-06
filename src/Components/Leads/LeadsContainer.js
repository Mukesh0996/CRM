
import React from 'react';
import LoadingPage from '../../Pages/loadingPage';
import Record from '../Record/Record';
import styles from './LeadsContainer.module.css';

const LeadsContainer = ({leadkeys, leads, isLoading}) => {
    let columns = <React.Fragment> 
                        <div style={{minWidth:"3rem", position:"fixed", backgroundColor:"#fff", borderRadius: "10px 0 0 0"}} className={styles.column}>
                            <input type="checkbox"/>
                        </div> 
                        { leadkeys.map((key, index) => <div key={index} className={styles.column}>{key.label}</div>) } 
                    </React.Fragment>;

    return  <section className={styles.leadsContainer}>
                    {isLoading && <LoadingPage/>}
                <section className={styles.leadsfilter}>
                    <p>Filter Leads by:</p>
                </section>
                <section className={styles.leadsrecords}>
                    <div className={styles["lead-columns"]}>
                        { columns }
                    </div>
                   { leads.map(lead => <Record lead={lead} key={lead.id}/>) }
                </section>
            </section>
}

export default LeadsContainer