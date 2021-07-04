import styles from './LeadsContainer.module.css'
const LeadsContainer = () => {


    return  <section className={styles.leadsContainer}>
                <section className={styles.leadsfilter}>
                    <p>Filter Leads by:</p>
                </section>
                <section className={styles.leadsrecords}>
                </section>
            </section>
}

export default LeadsContainer