import Chart from './Chart';
import styles from './Dashboard.module.css';
import React from 'react';


const Dashboard = ({maxValue, chartData, name}) => {

   
    return <div className={styles.dashboard}>
                <h1 className={styles.dashboard_heading}>{name}</h1>
                <Chart dataPoints={chartData} maxValue={maxValue}/>
    </div>

}


export default React.memo(Dashboard, (prevProps, nextProps) => {
   if(prevProps !== nextProps) {
    return false
   }
   return true;
});