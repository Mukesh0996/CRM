import React, { useRef, useState } from 'react';
import styles from './Filter.module.css';

const Filter = ({ leadsCols, filter }) => {

    const [showFilter, setShowFilter] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [showFilterMethods, setShowFilterMethod] = useState(false);
    const [filterByMethod, setFilterByMethod] = useState("");
    const filterRef = useRef();
    const filterMethods = ["is", "contains"];

    const createFilterCriteria = (key) => {
        setShowFilter(prevState => !prevState);
        setFilterValue(key.toLowerCase().split(" ").join("_"))
    }

    const filterHandler = () => {
        const { name, value} = filterRef.current;
        filter({name, value, filterByMethod});
    }

    const filterMethodsElements = filterMethods.map( (method, index) => <li onClick={() => { setFilterByMethod(method) }} key={index}>{method}</li> );
    
    return (
        <section className={styles.filterSection}>
            <p>Filter leads By:</p>
            { leadsCols.map((col, index) => <div key={index} className={styles.filter}> <div  className={styles.filterOptions}>
                <input type="checkbox" onClick={() => { createFilterCriteria(col.label) }} />
                <p className={styles.lighter}>{col.label}</p>
            </div>
                { showFilter && filterValue === col.label.toLowerCase().split(" ").join("_") && <div onClick={() => { setShowFilterMethod(prevState => !prevState) }} className={styles.filterCriteria}>
                    { filterByMethod || filterMethods[0] } {showFilterMethods && <ul className={styles.filterMethods}> { filterMethodsElements } </ul>}
                </div> }
                { showFilter && filterValue === col.label.toLowerCase().split(" ").join("_") && <div className={styles.filterInput}> 
                    <input ref={filterRef} style={{ minWidth: "4rem" }} name={filterValue} type="text"  /> 
                    <button onClick={filterHandler}>Filter</button> 
                    </div> }
            </div>
            )}
        </section>
    );

}

export default Filter;