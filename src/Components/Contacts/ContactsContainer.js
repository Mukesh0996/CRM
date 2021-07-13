import styles from './contactsContainer.module.css';
import Filter from "../Filter/Filter"

const ContactsContainer = () => {

    return (
        <section className={styles.contactsContainer}>
            <Filter module="contacts" leadsCols={[]}/>
            <section className={styles.contactsRecords}>
            </section>
        </section>
    );

}

export default ContactsContainer;