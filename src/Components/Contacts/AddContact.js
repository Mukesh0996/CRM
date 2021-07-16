import useForm from '../../Hooks/useForm';
import LoadingPage from '../../Pages/loadingPage';
import { getContactsFields } from '../../Store/Contacts/contacts-actions';
import FormActions from '../FormActions/FormActions';
import Input from '../Input/Input';
import styles from './AddContact.module.css';

const AddContact = () => {

    const {isLoading, httpError, information, address, inputHandler} = useForm(getContactsFields, false);
  
    const saveHandler = (event) => {
        event.preventDefault();
    };


    return <form className={styles.form} autoComplete="none">
               { isLoading && <LoadingPage/>}
            <FormActions module="Contact" saveHandler={saveHandler}/>
            <div className={styles.formfields}>
            <h3>Contact Information</h3>
            <div className={styles.inp}>
                {
                   Object.values( information || [] ).map(obj=><Input key={obj.id} label={obj.label} type={obj.type} name={obj.name} value={obj.value} handleChange={inputHandler} section={obj.section}/>)
                }
            </div>
            <h3>Address Information</h3>
                
            </div>
           </form>

}

export default AddContact;