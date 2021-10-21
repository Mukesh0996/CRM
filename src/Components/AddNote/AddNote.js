import { useCallback } from 'react';
import useHttp from '../../Hooks/httpHook';
import TopBarLoading from '../../Pages/LoadingTopBar';
import styles from './AddNote.module.css';

const AddNote = (props) => {

    const {sendRequest, isLoading} = useHttp(props.addNoteHandler, true)

    //function to convert decial values to hexadecial
    const deimalToHexConvertor = (val) => {
        const hexValue = (Number(val)).toString(16);
        return hexValue.length === 1 ? "0" + hexValue : hexValue;
    }

    const RGBParser = (rgbCodes) => {
        const [r, g, b] = rgbCodes;
        return "#" + deimalToHexConvertor(r) + deimalToHexConvertor(g) + deimalToHexConvertor(b);

    }

    const fontColorChangeHandler = (event) => {
        let command, value;
        const colorStyle = event.currentTarget.getAttribute("style").split(": ")[1]; // input -> background-color: rgb(255, 102, 254); output -> rgb(255, 102, 254);
        command = event.currentTarget.getAttribute("data-icon");
        const rgbDecimalCodes = colorStyle.substring(4, colorStyle.length - 2).split(", "); //255, 102, 254); -> [255,102, 254]
        value = RGBParser(rgbDecimalCodes);
        document.execCommand(command, false, value);
        if(colorStyle) {
            const root = document.querySelector(":root");
            root.style.setProperty("--pesudo-background", value);
        }

    }

    const clickHandler = useCallback((event) => {
        let command, value;
        command = event.currentTarget.getAttribute("data-icon");
        value = event.currentTarget.getAttribute("data-value");
        document.execCommand(command, false, value);
    }, []);

    const toggleHandler = (event) => {
        const element = document.getElementById(`${event.currentTarget.getAttribute("id")}_options`);
        if (element.classList.contains(styles.hide)) {

            element.classList.remove(styles.hide);
            setTimeout(() => {
                element.classList.add(styles.show);
            }, 300);

        } else if (element.classList.contains(styles.show)) {

            element.classList.remove(styles.show);
            setTimeout(() => {
                element.classList.add(styles.hide);
            }, 300);

        }
    }

    const mouseDownHandler = (e) => e.preventDefault();
    let note;
    const saveNoteHandler = () => {
         note = document.getElementsByClassName(styles.note)[0].innerHTML;
         sendRequest({ orgId: props.orgId, leadId: props.leadId, note})
    }


    return (
        <div className={styles.AddNoteDiv}>
            { isLoading && <TopBarLoading/> }
            
            <div className={styles.richTextOptions}>
                <i className="fas fa-bold" data-icon="bold" data-value="" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                <i className="fas fa-italic" data-icon="italic" data-value="" onClick={clickHandler} onMouseDown={mouseDownHandler}></i>
                <div id="alignment" className={styles.alignment} onClick={toggleHandler} onMouseDown={mouseDownHandler}>
                    <i className="fas fa-align-justify"></i>
                    <div id="alignment_options" className={`${styles.alignmentOptions} ${styles.hide}`}>
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
                <div id="color" className={styles.color} onClick={toggleHandler} onMouseDown={mouseDownHandler}>
                    <span className={styles.colorDemo}>A</span>
                    <div id="color_options" className={`${styles.color_options} ${styles.hide}`}>
                        <ul>
                            <li style={{ backgroundColor: "rgb(255, 255, 255)" }} data-icon="foreColor"  onClick={clickHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 238, 255)" }} data-icon="foreColor"  onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 204, 255)" }} data-icon="foreColor"  onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(229, 204, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 204, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 204, 238)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 204, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 229, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 255, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 255, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 255, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 204, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 204, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 153, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 153, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 153, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 153, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 204, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 255, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 255, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 255, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: " rgb(192, 192, 192)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 204, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 102, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(178, 102, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 102, 254)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 102, 178)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 102, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 178, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(254, 255, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 255, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 254, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 153, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(57, 156, 253)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: " rgb(51, 51, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 51, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 51, 254)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 51, 152)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 51, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 153, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(254, 255, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(51, 255, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: " rgb(51, 254, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 102, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(51, 153, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 0, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(119, 0, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 0, 238)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 0, 119)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(255, 127, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(254, 255, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 255, 0))" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 254, 255)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(68, 68, 68)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 101, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 0, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 0, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 102, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(203, 204, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 204, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 203, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(51, 51, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(68, 68, 68)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 101, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 0, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 0, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(204, 102, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(203, 204, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 204, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 203, 204)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(51, 51, 51)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 0, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(75, 0, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 0, 152)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 0, 76)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(153, 76, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(152, 153, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 153, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 152, 153)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 51, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 0, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(51, 0, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 0, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 0, 50)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 0, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 51, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(102, 102, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 102, 0)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                            <li style={{ backgroundColor: "rgb(0, 102, 102)" }} data-icon="foreColor" onClick={fontColorChangeHandler} onMouseDown={mouseDownHandler}></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.noteDiv}>
                <div className={styles.note} placeholder="Enter a note.." contentEditable={true} placeholder="Add a note..."></div>
                <button className={styles.submitBtn} onMouseDown={mouseDownHandler} onClick={saveNoteHandler}>Add Note.</button>
            </div>
            { note } 
        </div>
    )

}

export default AddNote;