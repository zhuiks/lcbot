import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }));


interface StepActionProps {
    activeStep: number;
    totalSteps?: number;
    setStep: (step: number) => void;
    onNextStep: () => void;
}

const StepActions: React.FC<StepActionProps> = ({
    activeStep = 0,
    totalSteps = 1,
    setStep,
    onNextStep
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={() => setStep(activeStep - 1)}
                >
                    Back
                </Button>
                {activeStep === totalSteps - 1 ? (
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            onNextStep();
                        }}
                    >
                        Save
                    </Button>
                ) : (
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onNextStep();
                                setStep(activeStep + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
            </div>
        </div>
    );
}

export default StepActions;