import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";
import LabelProps = AppointmentForm.LabelProps;

export function Label(props: LabelProps) {
    if (props.text && ["More Information"].includes(props.text)) {
        return null;
    }

    if (props.text === "Details") {
        props = {...props, text: "Create a new event"};
    }

    return <AppointmentForm.Label {...props}/>
}