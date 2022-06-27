import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import {Grid} from "@mui/material";
import React from "react";
import BasicLayoutProps = AppointmentForm.BasicLayoutProps;

export function BasicLayout(layout: BasicLayoutProps) {
    return (
        <AppointmentForm.BasicLayout {...layout}>
            <Grid>
                <ul>
                    <li><AppointmentForm.Label
                        text={'Event start at: ' + layout.appointmentData.startDate.toLocaleString()}
                        type="ordinaryLabel"/></li>
                    <li><AppointmentForm.Label
                        text={'Finish at: ' + (layout.appointmentData && layout.appointmentData.endDate ? layout.appointmentData.endDate.toLocaleString() : '')}
                        type="ordinaryLabel"/></li>
                </ul>
            </Grid>
        </AppointmentForm.BasicLayout>
    );
};
