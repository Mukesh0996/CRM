import {  faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../Hooks/httpHook';
import LoadingTopBar from '../../Pages/LoadingTopBar';
import { getSingleLeadRecord } from '../../Store/Leads/leads-actions';
import styles from './ViewLead.module.css';

const ViewLead = () => {

    const params = useParams();
    const {orgId, leadId} = params;
    const [lead, setLead] = useState([]);
    const {sendRequest : fetchLeadRecord , isLoading, error} = useHttp(getSingleLeadRecord, false);

    useEffect(() => {
        fetchLeadRecord({orgId, leadId}, (leadRecord) => {
            setLead(leadRecord.record)
        });
        
    }, []);
    const navigateBackHandler = () => {

    }
    let displayRecord;
    if(lead) {
        displayRecord =  Object.keys(lead).map((leadR, index) => {
                    return <div className={styles.field} key={index}> 
                                <div className={styles.label}>{ leadR }</div> 
                                <div className={styles.value}>{ lead[leadR] || "-" }</div> 
                            </div>
                })
       
    }
    const deimalToHexConvertor = (val) => {
        const hexValue = (Number(val)).toString(16);
        console.log(hexValue);
       return hexValue.length === 1 ? "0" + hexValue : hexValue;
    }

    const RGBParser = (rgbCodes) => {
        const [r,g,b] = rgbCodes;
       return "#" + deimalToHexConvertor(r) + deimalToHexConvertor(g) + deimalToHexConvertor(b);

    }

    const fontColorChangeHandler = (event) => {
        const colorStyle = event.currentTarget.getAttribute("style").split(": ")[1];
        let command, value;
        command = event.currentTarget.getAttribute("data-icon");
        const rgbDecimalCodes = colorStyle.substring(4, colorStyle.length - 2 ).split(", ");
        value = RGBParser(rgbDecimalCodes);
        document.execCommand(command,false, value);
    }

    const clickHandler = useCallback((event) => {
        let command, value;
        command = event.currentTarget.getAttribute("data-icon");
        value = event.currentTarget.getAttribute("data-value");
        document.execCommand(command,false, value);
    }, []);

    const toggleHandler = (event) => {
        const element = document.getElementById(`${event.currentTarget.getAttribute("id")}_options`);
        if(element.classList.contains(styles.hide)) {

            element.classList.remove(styles.hide);
            setTimeout(()=> {
                element.classList.add(styles.show);
            },300);
           
        } else if (element.classList.contains(styles.show)) {

            element.classList.remove(styles.show);
            setTimeout(()=> {
                element.classList.add(styles.hide);
            },300);

        }
    }

    const mouseDownHandler = (e) => e.preventDefault();

return <section className={styles.singleRecord}>
            { isLoading && <LoadingTopBar/> }
            <section className={styles["singleRecord-actions"]}>
                <div className={styles.back}>
                    <FontAwesomeIcon icon={faBackward} onClick={navigateBackHandler}/>
                    <p>{ "" || lead.last_name}</p>
                </div>
                <div className={styles.action}>
                    <button className={styles.convert}>Convert</button>
                    <button className={styles.edit}>Edit</button>
                    <button className={styles.clone}>Clone</button>
                    <button className={styles.delete}>Delete</button>
                </div>
            </section>
            <section className={styles.values}>
                <section className={styles.rightPane}>
                       <div className={styles.full}>
                            <h1 className={styles.leadInfo}>Lead Information:</h1>
                            <div className={styles.full}>  {displayRecord}</div>     
                       </div>
                       <div className={styles.notes}>
                            <h1>Notes:</h1>
                            <div className={styles.richTextOptions}>
                                <i className="fas fa-bold" data-icon="bold" data-value="" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                                <i className="fas fa-italic" data-icon="italic" data-value="" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                                <div id="alignment" className={styles.alignment} onClick={toggleHandler} onMouseDown={mouseDownHandler}>
                                    <i className="fas fa-align-justify"></i>
                                    <div id="alignment_options" className={ `${styles.alignmentOptions} ${styles.hide}` }>
                                        <i className="fas fa-align-left" data-value="" data-icon="justifyLeft" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                                        <i className="fas fa-align-justify" data-value="" data-icon="justifyFull" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                                        <i className="fas fa-align-right" data-value="" data-icon="justifyRight" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                                    </div>
                                </div>
                                <div id="list-style" className={`${styles["list-style"]}`} onClick={toggleHandler} onMouseDown={mouseDownHandler}>
                                    <i className="fas fa-list-ul"></i>
                                    <div id="list-style_options" className={`${styles["list-style_options"]} ${styles.hide}`}>
                                        <div data-value="" data-icon="insertunorderedlist" onClick={clickHandler} onMouseDown={mouseDownHandler}><i className="fas fa-list-ul"></i><span className={styles.listStyleValue}>Unordered List</span></div>
                                        <div data-value="" data-icon="insertorderedlist" onClick={clickHandler} onMouseDown={mouseDownHandler}> <i className="fas fa-list-ol"></i><span className={styles.listStyleValue}>Ordered List</span></div>
                                    </div>
                                </div>
                                <div id="color" className={styles.color}>
                                    <span className={styles.colorDemo}>A</span>
                                    <div className={styles.color_options}>
                                        <ul>
                                            <li data-icon="foreColor" style={{backgroundColor:  "rgb(255, 255, 255)"}} onClick={clickHandler} onMouseDown={mouseDownHandler}></li>
                                            <li data-icon="foreColor" style={{backgroundColor:  "rgb(204, 238, 255)"}} onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li data-icon="foreColor" style={{backgroundColor:  "rgb(204, 204, 255)"}} onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(229, 204, 255)"}} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 204, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 204, 238)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 204, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 229, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 255, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 255, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 255, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 204, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 204, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 153, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 153, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 153, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 153, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 204, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 255, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 255, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 255, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  " rgb(192, 192, 192)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 204, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 102, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(178, 102, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 102, 254)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 102, 178)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 102, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 178, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(254, 255, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 255, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 254, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 153, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(57, 156, 253)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  " rgb(51, 51, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 51, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 51, 254)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 51, 152)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 51, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 153, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(254, 255, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(51, 255, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  " rgb(51, 254, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 102, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(51, 153, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 0, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(119, 0, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 0, 238)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 0, 119)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(255, 127, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(254, 255, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 255, 0))"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 254, 255)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(68, 68, 68)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 101, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 0, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 0, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 102, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(203, 204, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 204, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 203, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(51, 51, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(68, 68, 68)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 101, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 0, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 0, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(204, 102, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(203, 204, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 204, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 203, 204)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(51, 51, 51)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 0, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(75, 0, 153)"}} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 0, 152)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 0, 76)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(153, 76, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(152, 153, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 153, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 152, 153)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 51, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 0, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(51, 0, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 0, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 0, 50)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 0, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 51, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(102, 102, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  "rgb(0, 102, 0)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                            <li style={{backgroundColor:  " rgb(0, 102, 102)"}}  data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.noteDiv}>
                                <div className={styles.note} placeholder="Enter a note.." contentEditable={true} placeholder="Add a note..."></div>
                                <button className={styles.submitBtn} onMouseDown={mouseDownHandler}>Add Note.</button>
                            </div>
                            
                       </div>
                </section>
            </section>
</section>
}

export default ViewLead;