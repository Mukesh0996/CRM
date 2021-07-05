import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import LeadActions from '../Components/Leads/LeadsActions';
import LeadsContainer from "../Components/Leads/LeadsContainer";
import useHttp from "../Hooks/httpHook";
import { getAllLeads } from "../Store/Leads/leads-actions";

const LeadsModule = () => {
    
   const {sendRequest, isLoading, error } = useHttp(getAllLeads, true);

   useEffect(() => {
    sendRequest();
   },[])

   const leads = useSelector(state => state.leads.leads);
   console.log(leads);

    return <Fragment> 
                <LeadActions/>
                <LeadsContainer/>
            </Fragment>
}

export default LeadsModule;