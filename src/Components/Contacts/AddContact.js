import { useContext } from 'react';
import useForm from '../../Hooks/useForm';
import LoadingPage from '../../Pages/loadingPage';
import AuthContext from '../../Store/Auth/AuthContext';
import { getContactsFields } from '../../Store/Contacts/contacts-actions';
import FormActions from '../FormActions/FormActions';
import Input from '../Input/Input';
import styles from './AddContact.module.css';

const AddContact = () => {

    const {isLoading, information, address, inputHandler} = useForm(getContactsFields, false);
    let shippingInputFields, billingInputFields;
    const {orgId} = useContext(AuthContext);
    if(address) {
        //shipping fields
        shippingInputFields = Object.values(address.shipping).map(obj => <Input kwy={obj.id} label={obj.label} type={obj.type} name={obj.name} value={obj.value} handleChange={inputHandler} section={obj.section}/>)


        //billing fields
        billingInputFields = Object.values(address.billing).map(obj => <Input kwy={obj.id} label={obj.label} type={obj.type} name={obj.name} value={obj.value} handleChange={inputHandler} section={obj.section}/>)
    }
    
    const saveHandler = (event) => {

        event.preventDefault();
        let contactRecordObj = {orgId};
        Object.values(information).map(contactInfo => contactRecordObj = { ...contactRecordObj, [contactInfo.name] : contactInfo.value });
        Object.values(address.billing).map(contactBillingInfo => contactRecordObj = { ...contactRecordObj, [contactBillingInfo.name] : contactBillingInfo.value });
        Object.values(address.shipping).map(contactShippingInfo => contactRecordObj = { ...contactRecordObj, [contactShippingInfo.name] : contactShippingInfo.value });
        console.log(contactRecordObj);
    };


    return <form className={styles.addContactForm} autoComplete="none" onSubmit={saveHandler}>
               { isLoading && <LoadingPage/>}
                <FormActions module="Contact" saveHandler={saveHandler}/>
                <div className={styles.formfields}>
                    <h3 className={styles.formSection}>Contact Information</h3>
                    <div className={styles.inp}>
                        {
                            Object.values( information || [] ).map(obj=><Input key={obj.id} label={obj.label} type={obj.type} name={obj.name} value={obj.value} handleChange={inputHandler} section={obj.section}/>)
                        }
                    </div>
                    <h3 className={styles.formSection}>Address Information</h3>
                        <div className={styles.inp}>
                            <button style={{display:"flex", alignItems:"flex-end"}}>Copy Address</button>
                            <div className={styles.address}>
                                <div>
                                    { shippingInputFields }
                                </div>
                                <div>
                                    { billingInputFields }
                                </div>
                            </div>
                        </div>
                        <h3 className={styles.formSection}>Description Information</h3>
                        <div  className={styles.inp}>
                            <textarea type="text" name="description"></textarea>
                        </div>
                </div> 
           </form>

}

export default AddContact;