import React from "react";
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import chordsBlockRenderer from "./chords-block";
import useSlide from "./slide-reducer";
import { SlideActionType } from './slide-reducer';
import { keyBinding } from "./key-binding";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
import ChordsToolbar from "./chords-toolbar";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            border: "2px solid " + theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
        },
        button: {
            marginTop: theme.spacing(1),
        },
    }));


export interface ChordEditorProps {
    slide: ChordSlide;
    onSave?: (s: ChordSlide) => void;
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide: initialSlide, onSave }) => {
    const classes = useStyles();
    const [state, dispatch] = useSlide(initialSlide, onSave);
    const onEditorChange = (newState: EditorState) => {
        console.log(`onChange: ${newState.getLastChangeType()}`)
        dispatch({ type: 'SELECTION_CHANGE', editorState: newState })
    }
    console.log('rerendering Chord Editor');

    const onKeyCommand = (command: SlideActionType, es: EditorState) => {

        console.log(command);
        if (/^[A-Z]{3}_CHORD_\S+$/.test(command) || command === 'SLIDE_UPDATE') {
            dispatch({ type: command, editorState: es });
        }

        const handled: DraftHandleValue = "handled";
        return handled;
    }

    return (
        <>
            <div className={classes.root}>
                <Editor
                    editorState={state.editorState}
                    onChange={onEditorChange}
                    onBlur={() => dispatch({ type: 'FOCUS_LOST' })}
                    blockRendererFn={chordsBlockRenderer}
                    // handleBeforeInput={onCharInput}
                    handleKeyCommand={onKeyCommand}
                    keyBindingFn={keyBinding}
                />
                {state.toolbarShown &&
                    <ChordsToolbar
                        currentLine={state.line}
                        dispatch={dispatch}
                    />
                }
            </div>
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={() => dispatch({ type: 'SLIDE_UPDATE' })}
            >
                Update
                </Button>
        </>
    )
}

export default ChordEditor;