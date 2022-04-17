import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBarLoading from '../../Pages/LoadingTopBar';
import { leadActions } from '../../Store/Leads/leads-slice';
import { filterConfigObj } from '../../Utils/filter';
import Filter from '../Filter/Filter';
import Record from '../Record/Record';
import styles from './LeadsContainer.module.css';


const LeadsContainer = ({ leadCols, isLoading, filterCols }) => {
    const dispatch = useDispatch();
    const { leads, filterApplied, filteredLeads } = useSelector((state) => state.leads);
    
    const filterMethodNames = filterConfigObj.map(filter => filter.filterName);

    const filterLeads = ({ name, value, filterByMethod }) => {

      const filterMethod = filterConfigObj.find(filterConfig => filterConfig.filterName === filterByMethod).filterMethod;
      const filteredRecs = filterMethod({name, value}, leads);

      if(filteredRecs) {
        dispatch(leadActions.addFilteredLeads({
            filteredLeads: filteredRecs
        }));
      }
    }

    let columns = <>
        <div style={{ minWidth: "2rem", position: "relative", backgroundColor: "#fff", borderRadius: "10px 0 0 0" }} className={styles.column}>
            <input type="checkbox" />
        </div>
        { leadCols.map((col, index) => <div key={index} className={styles.column}>{col.label}</div>) }
    </>;

    return (<>
                <section className={styles.leadsContainer}>
            { isLoading && <TopBarLoading /> }
            <Filter leadsCols={filterCols} filter={filterLeads} module="leads" filterMethodNames={filterMethodNames} />
            <section className={styles.leadsrecords}>
                <div className={styles["lead-columns"]}>{columns}</div>
                {filterApplied && filteredLeads.length === 0 && <div style={{ height: "100%", backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}><p>No Leads present for the specified criteria. Please refresh the page.</p></div>}
                {!!leads && filteredLeads.length === 0 && !filterApplied && leads.map(lead => <Record lead={lead} key={lead.id} />)}
                {filterApplied && filteredLeads.length !== 0 && filteredLeads.map(lead => <Record key={lead.id} lead={lead} key={lead.id} />)}
            </section>
            
        </section>
        </>
    );
}

export default LeadsContainer;