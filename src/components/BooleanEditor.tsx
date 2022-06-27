import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import BooleanEditorProps = AppointmentForm.BooleanEditorProps;

export function BooleanEditor(props: BooleanEditorProps) {
    //todo find a cleaner way
    if (props.label && ["All Day", "Repeat"].includes(props.label)) {
        return null;
    }

    return <AppointmentForm.BooleanEditor {...props}/>
}
