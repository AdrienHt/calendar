import {
    AppointmentModel,
    ChangeSet,
    EditingState,
    IntegratedEditing,
    Resource,
    ViewState
} from '@devexpress/dx-react-scheduler';
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    MonthView,
    Resources,
    Scheduler,
    Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import React, {useEffect, useState} from "react";
import {BasicLayout} from "./BasicLayout";
import {AxiosError, AxiosResponse} from "axios";
import {formatStaffMembersToResource} from "../entities/StaffMembers";
import {formatClientsToResource} from "../entities/Client";
import {formatAppointmentToModel} from "../entities/Appointment";
import {TextEditor} from "./TextEditor";
import {BooleanEditor} from "./BooleanEditor";
import {Label} from "./Label";
import {getAllEntities, postAppointment} from "../api/actions";
import {useSnackbar} from "notistack";
import DateEditorProps = AppointmentForm.DateEditorProps;

function CustomScheduler() {
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const [resources, setResources] = useState<Resource[] | undefined>();
    const [errors, setErrors] = useState<string[]>();
    const {enqueueSnackbar} = useSnackbar();
    const defaultErrorMsg = 'An unknown error occurred, please try again'

    useEffect(() => retrieveEntities(), []);
    useEffect(() => displayErrors(), [errors]);

    function displayErrors() {
        if (errors) {
            errors.map(
                (value: string) => {
                    enqueueSnackbar(value, {variant: 'error'})
                }
            );
        }
    }

    function retrieveEntities() {
        getAllEntities((clients: AxiosResponse, staffMembers: AxiosResponse, appointments: AxiosResponse) => {
                setResources([
                    formatClientsToResource(clients.data),
                    formatStaffMembersToResource(staffMembers.data)
                ]);

                setAppointments(appointments.data.map(formatAppointmentToModel));
            }
        ).catch(() => {
            setErrors([defaultErrorMsg])
        });
    }

    async function createAppointment(appointment: AppointmentModel) {
        try {
            const response = await postAppointment(appointment)
            setAppointments(
                [
                    ...appointments,
                    ...[formatAppointmentToModel(response.data)]
                ]
            );
            setErrors([]);
        } catch (e: any | AxiosError) {
            if (e instanceof AxiosError) {
                if (e.response && e.response.status === 400) {
                    setErrors(e.response.data.message);

                    return;
                }
            }

            setErrors([defaultErrorMsg]);
        }
    }

    function commitChanges(changes: ChangeSet) {
        if (changes.added) {
            createAppointment(changes.added as AppointmentModel);
        }
    }

    return (
        <Scheduler data={appointments} firstDayOfWeek={1} locale={'en-Us'}>
            <ViewState/>
            <Toolbar/>
            <DateNavigator/>
            <MonthView/>
            <EditingState
                onCommitChanges={commitChanges}
            />
            <IntegratedEditing/>
            <Appointments/>
            <AppointmentTooltip showOpenButton={false}/>
            <AppointmentForm
                basicLayoutComponent={BasicLayout}
                textEditorComponent={TextEditor}
                booleanEditorComponent={BooleanEditor}
                labelComponent={Label}
                dateEditorComponent={
                    (props: DateEditorProps) => {
                        props = {...props, locale: 'fr-FR'};

                        return (<AppointmentForm.DateEditor {...props}/>)
                    }
                }
            />
            <Resources data={resources}/>
        </Scheduler>
    );
}

export default CustomScheduler;
