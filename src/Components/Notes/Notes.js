import styles from './Notes.module.css';
import React, { useEffect } from "react";

const Notes = (props) => {

    let notesDiv = document.getElementsByClassName(styles.notes)[0];
    props.notes.forEach(note => { 
        if(!!notesDiv) {
            let  elem = document.createElement("div");
            elem.className = styles.note;
            elem.innerHTML = note.content;
            notesDiv.appendChild(elem);

        }
    });

    return <div className={styles.notes}>
                
            </div>

}

export default Notes;