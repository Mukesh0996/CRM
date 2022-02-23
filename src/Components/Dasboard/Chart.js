import styles from './Chart.module.css';
import Chartbar from './ChartBar';

const Chart = ({maxValue, dataPoints}) => {

   
    return <div className={styles.chart}>
            { !!dataPoints  && dataPoints.map((datapoint, index) => <Chartbar key={index} label={datapoint.label} maxValue={maxValue} value={datapoint.value}/>)}
    </div>

}

export default Chart;