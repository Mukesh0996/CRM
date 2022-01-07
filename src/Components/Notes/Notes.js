import styles from './Notes.module.css';
import React from "react";
import AddNote from './AddNote';

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

    return <React.Fragment>
    { props.notes.length>0 && <div className={styles.notes}></div> }
    <AddNote RecId={props.RecId} orgId={props.orgId}/>
    </React.Fragment>

}

export default Notes;