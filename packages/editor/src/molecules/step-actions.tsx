import React from 'react';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const ActionsContainer = styled('div')(
    ({ theme }) => ({
        marginBottom: theme.spacing(2),
    }));

const ActionButton = styled(Button)(
    ({ theme }) => ({
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
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
}) => (
        <ActionsContainer>
            <div>
                <ActionButton
                    disabled={activeStep === 0}
                    onClick={() => setStep(activeStep - 1)}
                >
                    Back
        </ActionButton>
                {activeStep === totalSteps - 1 ? (
                    <ActionButton
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            onNextStep();
                        }}
                    >
                        Save
                    </ActionButton>
                ) : (
                        <ActionButton
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onNextStep();
                                setStep(activeStep + 1);
                            }}
                        >
                            Next
                        </ActionButton>
                    )}
            </div>
        </ActionsContainer>
    );

export default StepActions;