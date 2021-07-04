import { Fragment } from "react"
import LeadActions from '../Components/Leads/LeadsActions';
import LeadsContainer from "../Components/Leads/LeadsContainer";

const LeadsModule = () => {

    return <Fragment> 
                <LeadActions/>
                <LeadsContainer/>
            </Fragment>
}

export default LeadsModule;