import React from "react";
import {useSnackbar} from "notistack";

interface ErrorProps {
    errors: string[] | undefined;
}

// export function ErrorPanel(props: ErrorProps) {
//     const { enqueueSnackbar } = useSnackbar();
//
//     if (!props.errors) {
//         return null;
//     }
//
//     return (<Grid container alignItems="center" justifyContent="center" direction="column">
//         <ul>
//             {props.errors.map((error: string, index: number) => (
//                 <>
//                     <Grid key={index} item xs={12} color={'red'}>
//                         <Snackbar autoHideDuration={6000}>
//                             <Alert severity="warning" sx={{width: '100%'}}>
//                                 {'error'}
//                             </Alert>
//                         </Snackbar>
//                     </Grid>
//                 </>
//             ))}
//         </ul>
//     </Grid>);
// }

export function ErrorPanel(props: ErrorProps) {
    const {enqueueSnackbar} = useSnackbar();

    if (props.errors) {
        props.errors.map(
            (value: string) => {
                enqueueSnackbar(value, {variant: 'error'})
            }
        );
    }

    return null
}
