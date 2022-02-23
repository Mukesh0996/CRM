import styles from './ChartBar.module.css';


const Chartbar = ({value, label, maxValue}) => {


    let minValue = "0%";

    if(value > 0) {
        minValue = (Math.round(value/maxValue)*100) + "%";
    }
    

    const elemStyle = {
        height: minValue
    }
   

    return <div className={styles.chart}>
            <div className={styles.chartBarvalue}>{value}</div>
            <div className={styles.chartBar}>
                <div style={elemStyle}  className={styles.chartBar_fill}></div>
            </div>
            <div className={styles.chartBar_label}>{label.substring(0, 3)}</div>
    </div>
}

export default Chartbar;