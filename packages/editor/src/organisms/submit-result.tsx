import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import SongRow from '../components/song-row';
import ButtonAdd from '../atoms/button-add';

const SubmitResult: React.FC<any> = ({ data }: any) => (
  <>
    <Alert severity={data.success ? "success" : "error"} variant="filled">
      <AlertTitle>{data.success ? "Success" : "Error"}</AlertTitle>
      {data.message}
    </Alert>
    <Grid container>
      <Grid item>
        <SongRow song={data.song} />
      </Grid>
    </Grid>
    <ButtonAdd />
  </>
);

export default SubmitResult;
