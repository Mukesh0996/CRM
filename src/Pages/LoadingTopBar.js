import React from 'react';
import ReactDOM from 'react-dom';
import styles from './LoadingTopBar.module.css';
const LoadingTopBar = () => {


    return <div className={styles.top}>
                <div></div>
                <div></div>
                <div></div>
            </div>

}

const TopBarLoading = () => {

    return(
        <React.Fragment>
            { ReactDOM.createPortal(<LoadingTopBar/>, document.getElementById("crmLoading")) }
        </React.Fragment>
    )
}

export default TopBarLoading;