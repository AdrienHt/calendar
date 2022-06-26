import Paper from '@mui/material/Paper';
import {
    AppointmentModel,
    ChangeSet,
    EditingState,
    IntegratedEditing,
    SelectOption,
    ViewState
} from '@devexpress/dx-react-scheduler';
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    MonthView,
    Scheduler,
    Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import React, {FC, useEffect, useState} from "react";
import BasicLayoutProps = AppointmentForm.BasicLayoutProps;
import TextEditorProps = AppointmentForm.TextEditorProps;
import BooleanEditorProps = AppointmentForm.BooleanEditorProps;
import LabelProps = AppointmentForm.LabelProps;

class Appointment {
    constructor(partial: Partial<Appointment>) {
        Object.assign(this, partial);
    }

    public title: string = '';
}

const appointments: Array<AppointmentModel> = [{
    startDate: '2022-06-25T10:00',
    endDate: '2022-06-25T11:15',
    title: 'Meeting',
    type: 'private',
}, {
    startDate: '2022-06-25T07:30',
    endDate: '2022-06-25T09:00',
    title: 'Go to a gym',
    type: 'work',
}];

const staffMembers: Array<SelectOption> = [
    {
        id: 1,
        text: "Adrien Herbert",
    },
    {
        id: 2,
        text: "Casey Neistat",
    }
];

const client: Array<SelectOption> = [
    {
        id: 1,
        text: "Bonne gueule",
    },
    {
        id: 2,
        text: "Asphalte",
    }
];

const TextEditor = (props: TextEditorProps) => {
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props: BooleanEditorProps) => {
    //todo find a cleaner way to remove basic elements
    if (props.label && ["All Day", "Repeat"].includes(props.label)) {
        return null;
    }

    return <AppointmentForm.BooleanEditor {...props}/>
}

const Label = (props: LabelProps) => {
    if (props.text && ["More Information"].includes(props.text)) {
        return null;
    }

    if (props.text === "Details") {
        props = {...props, text: "Create a new event"};
    }

    return <AppointmentForm.Label {...props}/>
}


function App() {
    const [data, setData] = useState(appointments);
    const [addedAppointment, setAddedAppointment] = useState<Partial<AppointmentModel>>({});

    const basicLayout = (layout: BasicLayoutProps) => {
        console.log('render basic layout')
        useEffect(
            () => focus
        )

        return (
            <AppointmentForm.BasicLayout {...layout}>
                <AppointmentForm.Label text="Staff Members" type="titleLabel"/>
                <AppointmentForm.Select
                    availableOptions={staffMembers}
                    value={addedAppointment['staff_member_id']}
                    type={'outlinedSelect'}
                    onValueChange={(nextValue: string | number) => layout.onFieldChange({'staff_member_id': nextValue})}
                />
                <AppointmentForm.Label text="Client" type="titleLabel"/>
                <AppointmentForm.Select
                    availableOptions={client}
                    value={addedAppointment['client_id']}
                    type={'filledSelect'}
                    onValueChange={(nextValue: string | number) => layout.onFieldChange({'client_id': nextValue})}
                />
            </AppointmentForm.BasicLayout>
        );
    };

    function commitChanges(changes: ChangeSet) {
        console.log(changes);
        setData(data);
    }

    function onAddedAppointmentChange(partialAddedAppointment: Partial<AppointmentModel>) {
        console.log('partialAddedAppointment')
        console.log(partialAddedAppointment)
        setAddedAppointment(partialAddedAppointment);
    }

    console.log('addedAppointment')
    console.log(addedAppointment)
    console.log('render app')
    return (
        <Paper>
            <Scheduler data={appointments}>
                <ViewState/>
                <Toolbar/>
                <DateNavigator/>
                <MonthView/>
                <EditingState
                    onCommitChanges={commitChanges}
                    addedAppointment={addedAppointment}
                    onAddedAppointmentChange={onAddedAppointmentChange}
                />
                <IntegratedEditing/>
                <Appointments/>
                <AppointmentTooltip showOpenButton={false}/>
                <AppointmentForm
                    basicLayoutComponent={basicLayout}
                    textEditorComponent={TextEditor}
                    booleanEditorComponent={BooleanEditor}
                    labelComponent={Label}
                />
            </Scheduler>
        </Paper>
    );
}

export default App;
