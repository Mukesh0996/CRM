import { useParams } from 'react-router';
import styles from './ViewLead.module.css';

const ViewLead = () => {

    const params = useParams();
    const {orgId, leadId} = params;
    console.log(orgId, leadId);

return <p>Viewing lead record</p>
}

export default ViewLead;