import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBarLoading from '../../Pages/LoadingTopBar';
import { leadActions } from '../../Store/Leads/leads-slice';
import Filter from '../Filter/Filter';
import Record from '../Record/Record';
import styles from './LeadsContainer.module.css';


const LeadsContainer = ({ leadCols, isLoading, filterCols }) => {
    const dispatch = useDispatch();
    const { leads, filterApplied, filteredLeads } = useSelector((state) => state.leads);
    
    const is = ({ name, value }, leads) => {
        const leadRecs = leads.filter((lead) => lead[name] === value);
        dispatch(leadActions.addFilteredLeads({filteredLeads: leadRecs}));
    };

    const contains = () => { };

    const [filterMethods] = useState([is, contains]);
    const [filterString] = useState(["is", "contains"]);
    // 9840765219
    const filterLeads = (obj) => {
        const methodIndex = filterString.findIndex(filter => filter === obj.filterByMethod);
        const method = filterMethods[methodIndex];
        method(obj, leads)
    }

    let columns = <React.Fragment>
        <div style={{ minWidth: "2rem", position: "relative", backgroundColor: "#fff", borderRadius: "10px 0 0 0" }} className={styles.column}>
            <input type="checkbox" />
        </div>
        { leadCols.map((col, index) => <div key={index} className={styles.column}>{col.label}</div>) }
    </React.Fragment>;

    return (<Fragment>
                <section className={styles.leadsContainer}>
            { isLoading && <TopBarLoading /> }
            <Filter leadsCols={filterCols} filter={filterLeads} module="leads" />
            <section className={styles.leadsrecords}>
                <div className={styles["lead-columns"]}>{columns}</div>
                {filterApplied && filteredLeads.length === 0 && <div style={{ height: "100%", backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}><p>No Leads present for the specified criteria. Please refresh the page.</p></div>}
                {!!leads && filteredLeads.length === 0 && !filterApplied && leads.map(lead => <Record lead={lead} key={lead.id} />)}
                {filterApplied && filteredLeads.length !== 0 && filteredLeads.map(lead => <Record lead={lead} key={lead.id} />)}
            </section>
            
        </section>
        </Fragment>
    );
}

export default LeadsContainer;