import { useContext } from "react";
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux";
import ModuleActions from "../Components/Leads/LeadsActions";
import LeadsContainer from "../Components/Leads/LeadsContainer";
import useHttp from "../Hooks/httpHook";
import AuthContext from "../Store/Auth/AuthContext";
import { getAllLeads, getColumns } from "../Store/Leads/leads-actions";

const LeadsModule = () => {
    const ctx = useContext(AuthContext);

    const { sendRequest: getLeads, isLoading, error } = useHttp(getAllLeads, true);
    const {sendRequest : getLeadColumns, isLoading: loadingColumns} = useHttp(getColumns, true);

    useEffect(() => {
       getLeads(ctx.orgId);
       getLeadColumns(ctx.orgId);
      
    },[]);

    const leadColumns = useSelector(state => state.leads.columns);
    const leads = useSelector(state => state.leads.leads);

   
    return <div> 
                <ModuleActions path="add-lead" module="Leads"/>
                <LeadsContainer leadCols={ leadColumns || [] } leads={ leads|| [] } isLoading={isLoading || loadingColumns}/>
            </div>
}

export default LeadsModule;