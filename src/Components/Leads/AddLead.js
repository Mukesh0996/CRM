import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import useForm from '../../Hooks/Leads/useForm';
import styles from './AddLead.module.css';
import LoadingPage from '../../Pages/loadingPage';
import Input from '../Input/Input';
import useHttp from '../../Hooks/httpHook';
import AuthContext from '../../Store/Auth/AuthContext';
import { addLeadRecord, getLeadsFields } from '../../Store/Leads/leads-actions';


const AddLead = () => {
    //custom hooks
    const { inputHandler, address, information, isLoading } = useForm(getLeadsFields);
    const { sendRequest: addRecord, error } = useHttp( addLeadRecord, true);
    const [description, setDescription] = useState("");
    const ctx = useContext(AuthContext);
    let informationFields, addressFields;
    const history = useHistory();

    const onCancelHandler = (event) => {
        event.preventDefault();
        history.goBack(-1);
    }
    if(address) {
         addressFields = <React.Fragment>
                            <h3>Address Information</h3>
                            <div className={styles.inp}>
                            {Object.values(address).map(obj => <Input key={obj.id} label={obj.label} type={obj.type} name={obj.name} value={obj.value} section={obj.section} handleChange={inputHandler}/>) }         
                            </div>
                            </React.Fragment>
    }

    if(information) {
        informationFields =  <React.Fragment>
                                <h3>Lead Information</h3>
                                <div className={styles.inp}>
                                { Object.values(information).map(obj => <Input 
                                    key={obj.id} 
                                    label={obj.label} 
                                    type={obj.type} 
                                    name={obj.name} 
                                    value={obj.value} 
                                    section={obj.section} 
                                    handleChange={inputHandler}
                                    error={error}
                                    />) }       
                                </div>
                                </React.Fragment>
    }

    const saveHandler = (e) => {
        e.preventDefault();
        let leadObj = { description, orgId: ctx.orgId };

        Object.values(address).map(leadAddress =>  leadObj = { ...leadObj, [leadAddress.name] : leadAddress.value });
        Object.values(information).map(leadInfo => leadObj = { ...leadObj, [leadInfo.name]: leadInfo.value });
        addRecord(leadObj);
    }

    return (
            <form className={styles.form} autoComplete="none">
                {isLoading && <LoadingPage/>}
                <div className={styles.formActions}>
                    <h2>Create Lead</h2>
                    <div>
                        <button className={styles.alt} onClick={onCancelHandler}>Cancel</button>
                        <button className={styles.alt}>Save and New</button>
                        <button type="submit" className={styles.save} onClick={saveHandler}>Save</button>
                    </div> 
                </div>
                <div className={styles.formfields}>
                        {informationFields}
                        {addressFields}
                    <h3>Description Information</h3>
                    <div  className={styles.inp}>
                        <textarea type="text" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>       
            </form>
    )

}

export default AddLead;