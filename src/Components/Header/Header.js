import React,{ useContext } from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../Store/Auth/AuthContext';
import styles from './Header.module.css';

const Header = () => {

    const { orgId } = useContext(AuthContext);


    return <header className={styles["main-header"]}>
                <div className={styles.brand}>CRM</div>
                <nav className={styles.navigation}>
                    <ul className={styles.items}>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/org/${orgId}/home`}>Home</NavLink></li>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/org/${orgId}/leads`}>Leads</NavLink></li>
                        <li className={styles.item}><NavLink activeClassName={styles.active}  to={`/org/${orgId}/contacts`}>Contacts</NavLink></li>
                    </ul>
                </nav>
            </header>
}

export default React.memo(Header);