import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import TextEditorProps = AppointmentForm.TextEditorProps;

export function TextEditor(props: TextEditorProps) {
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props} />;
};
