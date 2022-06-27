import {AppointmentModel} from "@devexpress/dx-react-scheduler";

export interface Appointment {
    client_id: number
    end_at: number
    name: string | undefined
    staff_member_id: number
    start_at: number
    updated_at: number
    created_at: number
    id: number
}

export function formatAppointmentToModel(appointment: Appointment): AppointmentModel {
    return {
        id: appointment.id,
        title: appointment.name,
        startDate: new Date(appointment.start_at * 1000),
        endDate: new Date(appointment.end_at * 1000),
        staff_member_id: appointment.staff_member_id,
        client_id: appointment.client_id
    }
}

export function formatAppointmentModelToApi(appointment: AppointmentModel): Partial<Appointment> {
    return {
        name: appointment.title,
        start_at: Date.parse(appointment.startDate as string) / 1000,
        end_at: Date.parse(appointment.endDate as string) / 1000,
        staff_member_id: appointment.staff_member_id,
        client_id: appointment.client_id
    }
}

