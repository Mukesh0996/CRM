import Chart from './Chart';
import styles from './Dashboard.module.css';

const Dashboard = ({maxValue, chartData, name}) => {

   
    return <div className={styles.dashboard}>
                <h1 className={styles.dashboard_heading}>{name}</h1>
                <Chart dataPoints={chartData} maxValue={maxValue}/>
    </div>

}


export default Dashboard;