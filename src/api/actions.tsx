import axios, {AxiosResponse} from "axios";
import {Appointment, formatAppointmentModelToApi} from "../entities/Appointment";
import {AppointmentModel} from "@devexpress/dx-react-scheduler";
import {StaffMember} from "../entities/StaffMembers";
import {Client} from "../entities/Client";
import {httpClient} from "./client";

export function getAllEntities(callback: (clients: AxiosResponse, staffMembers: AxiosResponse, appointments: AxiosResponse) => void) {
    return axios.all([
            httpClient.get(`/clients`),
            httpClient.get(`/staff-members`),
            httpClient.get(`/appointments`)
        ]
    ).then(axios.spread(callback));
}

export function postAppointment(appointment: AppointmentModel): Promise<AxiosResponse<Appointment>> {
    return httpClient.post('/appointments', formatAppointmentModelToApi(appointment as AppointmentModel));
}

export function postStaffMember(staffMember: StaffMember): Promise<AxiosResponse<StaffMember>> {
    return httpClient.post('/appointments', {first_name: staffMember.first_name, last_name: staffMember.last_name});
}

export function postClient(client: Client): Promise<AxiosResponse<Client>> {
    return httpClient.post('/appointments', {first_name: client.name});
}
