import styles from './contactsContainer.module.css';
import Filter from "../Filter/Filter"

const ContactsContainer = ({contacts, contactCols, filteredContacts}) => {
   
    return (
        <section className={styles.contactsContainer}>
            <Filter module="contacts" leadsCols={contactCols}/>
            <section className={styles.contactsRecords}>
            </section>
        </section>
    );

}

export default ContactsContainer;