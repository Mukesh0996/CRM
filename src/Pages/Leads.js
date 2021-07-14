import { useContext } from "react";
import { useEffect } from "react"
import { useSelector } from "react-redux";
import ModuleActions from "../Components/Leads/LeadsActions";
import LeadsContainer from "../Components/Leads/LeadsContainer";
import useHttp from "../Hooks/httpHook";
import AuthContext from "../Store/Auth/AuthContext";
import { getAllLeads, getFilterColumns } from "../Store/Leads/leads-actions";

const LeadsModule = () => {
    const ctx = useContext(AuthContext);

    const { sendRequest: getLeads, isLoading, error: getLeadsError } = useHttp(getAllLeads, true);
    const {sendRequest: fetchFilerColumns, isLoading: FilterLoading, error: filterError} = useHttp(getFilterColumns, true);

    useEffect(() => {
       getLeads(ctx.orgId);
       fetchFilerColumns(ctx.orgId);
      
    },[ctx.orgId]);

   
    const { filterColumns, leads, columns } = useSelector(state => state.leads);


    return <div> 
                <ModuleActions path="add-lead" module="Leads"/>
                <LeadsContainer filterCols={filterColumns} leadCols={ columns || [] } leads={ leads|| [] } isLoading={isLoading && FilterLoading} filterError={filterError} getLeadsError={getLeadsError}/>
            </div>
}

export default LeadsModule;