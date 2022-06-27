import Paper from '@mui/material/Paper';
import React from "react";
import {SnackbarProvider} from "notistack";
import CustomScheduler from "./components/CustomScheduler";

function App() {
    return (
        <Paper>
            <SnackbarProvider maxSnack={5}>
                <CustomScheduler/>
            </SnackbarProvider>
        </Paper>
    );
}

export default App;
