import { Fragment } from "react";
import ContactsContainer from "../Components/Contacts/ContactsContainer";
import ModuleActions from "../Components/Leads/LeadsActions";


const ContactsModule = () => {
    
    return <Fragment>
                    <ModuleActions module="Contacts" path="add-contact"/>
                    <ContactsContainer contactCols={[]} contacts={[]}/>
         </Fragment>

}

export default ContactsModule;