import React, { useRef, useState } from 'react';
import styles from './Filter.module.css';

const Filter = ({ leadsCols, filter, module }) => {
   
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
    const hideFilter = () => {
        if(showFilterMethods) {
            setShowFilterMethod(false);
        }
    }

    const filterMethodsElements = filterMethods.map( (method, index) => <li onClick={() => { setFilterByMethod(method) }} key={index}>{method}</li> );
    
    return (
        <section className={styles.filterSection} onClick={hideFilter}>
            <p>Filter {module} By:</p>
            { leadsCols.map((col, index) => <div key={index} className="filterby"> <div  className={styles.filterOptions}>
                <input type="checkbox" onClick={() => { createFilterCriteria(col.label) }} />
                <p className={styles.lighter}>{col.label}</p>
            </div>
                { showFilter && filterValue === col.label.toLowerCase().split(" ").join("_") && <div onClick={() => { setShowFilterMethod(prevState => !prevState) }} className={styles.filterCriteria}>
                    { filterByMethod || <span style={{fontWeight:"lighter"}}>Select Filter</span> } 
                    { showFilterMethods && <ul className={styles.filterMethods}> { filterMethodsElements } </ul>}
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