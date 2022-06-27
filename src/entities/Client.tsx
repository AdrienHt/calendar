import {ValidResource, ValidResourceInstance} from "@devexpress/dx-react-scheduler";

export interface Client {
    id: number;
    name: string;
}

export function formatClientsToResource(clients: Client[]): ValidResource {
    return {
        allowMultiple: false,
        isMain: false,
        fieldName: 'client_id',
        title: 'Clients',
        instances: formatToValidResourceInstance(clients)
    };
}

function formatToValidResourceInstance(clients: Client[]): Array<ValidResourceInstance> {
    return clients.map((client: Client) => ({
        title: 'Clients',
        fieldName: 'client_id',
        isMain: false,
        allowMultiple: false,
        color: '',
        id: client.id,
        text: client.name,
    }));
}