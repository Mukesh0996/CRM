import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';
import styles from './Header.module.css';

const Header = () => {

    const { orgId } = useContext(AuthContext);


    return <header className={styles["main-header"]}>
                <div className={styles.brand}>CRM</div>
                <nav className={styles.navigation}>
                    <ul className={styles.items}>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/home/org/${orgId}`}>Home</NavLink></li>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/leads/org/${orgId}`}>Leads</NavLink></li>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/contacts/org/${orgId}`}>Contacts</NavLink></li>
                    </ul>
                </nav>
            </header>
}

export default Header;