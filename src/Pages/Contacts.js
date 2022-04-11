import { Fragment, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import ContactsContainer from "../Components/Contacts/ContactsContainer";
import ModuleActions from "../Components/Leads/LeadsActions";
import useHttp from "../Hooks/httpHook";
import AuthContext from "../Store/Auth/AuthContext";
import { getAllContacts, getContactsFilterColumns } from "../Store/Contacts/contacts-actions";


const ContactsModule = () => {

    const ctx = useContext(AuthContext);
    const {sendRequest : getContactRecords, isLoading: contactsLoading, error: contactsError} = useHttp(getAllContacts, true);
    const {sendRequest: getContactFilterColumns, isLoading, error} = useHttp(getContactsFilterColumns, true);
   
    const { contacts, filteredContacts, filterColumns} = useSelector(state => state.contacts);
    
    useEffect(()=> {
        getContactRecords(ctx.orgId);
        getContactFilterColumns(ctx.orgId);
    }, [])
    return <Fragment>
                    <ModuleActions module="Contacts" path="add-contact"/>
                    <ContactsContainer contactCols={filterColumns} contacts={contacts} filteredContacts={filteredContacts}/>
         </Fragment>

}

export default ContactsModule;