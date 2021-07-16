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
    const { filterColumns, leads, columns } = useSelector(state => state.leads);

    useEffect(() => {
       getLeads(ctx.orgId);
       fetchFilerColumns(ctx.orgId);
      
    },[ctx.orgId]);

    if(getLeadsError.isValid || filterError.isValid) {
        return <div style={{height:"93vh", backgroundColor:"white", color:"red", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center"}}>
        { getLeadsError && filterError && <p>{getLeadsError.message}</p>}
        <button>Please Re-Login</button>
        </div>
    }

    return <div> 
                <ModuleActions path="add-lead" module="Leads"/>
                <LeadsContainer filterCols={filterColumns} leadCols={ columns || [] } leads={ leads|| [] } isLoading={isLoading && FilterLoading} filterError={filterError} getLeadsError={getLeadsError}/>
            </div>
}

export default LeadsModule;