import React, { useState } from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Grid, Chip, Paper, Button } from '@material-ui/core';
import Loading from '../atoms/loading';
import AppError from '../molecules/error';
import { IChordSlide, ChordSlide } from '@bit/zhuiks.lcbot.core.chords';

import PageHeader from '../atoms/page-header';
import { useUpdateSong } from '../molecules/submit';
import Slide from '../molecules/slide';
import SubmitResult from './submit-result';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Editable from '../atoms/editable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
      position: "relative",
      borderBottom: "2px dotted "+theme.palette.background.default,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    chip: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    rootBottom: {
      padding: theme.spacing(2),
      borderTop: "2px dotted "+theme.palette.background.default,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    button: {

    }
  }));

interface SaveFormProps {
  songData: {
    id: string,
    title?: string | null,
    text?: (string | null)[],
    slides?: IChordSlide[],
    links?: (string | null)[] | null
  };
}

const FormEdit: React.FC<SaveFormProps> = ({ songData }) => {

  const chordSlides = songData.slides ? 
    songData.slides.map(slide => new ChordSlide(slide)) : [];

  const [songSlides, setSlides] = useState<ChordSlide[]>(chordSlides);
  const [songTitle, setTitle] = useState<string>(songData.title || '');

  const { updateSong, mutationResult } = useUpdateSong();
  const classes = useStyles();

  const submitForm = () => {
    updateSong({
      songId: songData.id,
      title: songTitle,
      slides: songSlides,
      links: []
    });
  }

  if (mutationResult.loading) return <Loading />;
  return (
    <>
      {mutationResult.error &&
        <AppError err={mutationResult.error} />}
      {mutationResult.data ? (
        <SubmitResult data={mutationResult.data.updateSong} />
      ) : (
          <Grid 
          container 
          component="form"
          spacing={1}
          direction="column"
          wrap="nowrap"
            >
            <Grid item>
              <Paper className={classes.root} elevation={2}>
                <Chip className={classes.chip} size="small" icon={<VpnKeyIcon />} label={songData.id} />
                <Editable
                  variant="h3"
                  helperText="Song title"
                  onChange={setTitle}
                >
                  {songTitle}
                </Editable>
              </Paper>
            </Grid>
            {songSlides.map((slide, i) => (
              <Grid item key={i}>
                <Slide slide={slide} />
              </Grid>
            ))}
            <Grid item>
              <Paper className={classes.rootBottom} elevation={2}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={submitForm}
                >
                  Save
                    </Button>
              </Paper>
            </Grid>
          </Grid>
        )
      }
    </>
  )
};

export default FormEdit;