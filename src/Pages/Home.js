import {  useContext, useEffect } from "react"
import { useSelector } from "react-redux";
import Dashboard from "../Components/Dasboard/Dashboard";
import useHttp from "../Hooks/httpHook";
import AuthContext from "../Store/Auth/AuthContext";
import { getCurrentYearLeadsChartData } from "../Store/Home/home-actions";
import styles from './Home.module.css';

const Home = () => {

    const ctx = useContext(AuthContext);
    const {sendRequest: getLeadChartData, isLoading, error} = useHttp(getCurrentYearLeadsChartData, true);
    const leadChartData = useSelector(state => state.home.currentYearLeads);
   
    useEffect(() => {
        getLeadChartData(ctx.orgId);
    },[])

return (<div className={styles.home}> 
            <Dashboard chartData={leadChartData.chartDataPoints} maxValue={leadChartData.maxValue} name={leadChartData.name}/>
            </div>);

}

export default Home;