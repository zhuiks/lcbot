import React from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PageHeader from '../atoms/page-header';
/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */

interface StepProps extends StepWizardChildProps{
    children: any;
    title: string;
    isNewSong: boolean;
    submit: any;
}

const Step: React.FC<Partial<StepProps>> = ({
    children,
    title = 'New Song',
    isNewSong = true,
    totalSteps = 1,
    currentStep = 1,
    // firstStep,
    // goToStep,
    // lastStep,
    nextStep,
    previousStep,
    submit
}) => (
        <div>
            <PageHeader>{`${currentStep} (${totalSteps}): ${isNewSong?'Add':'Edit'} ${title}`}</PageHeader>
            {children}
            <Row className="mt-5">
                <Col sm={3}>
                    {currentStep > 1 &&
                        <Button variant="outline-secondary" onClick={previousStep} block>Go Back</Button>
                    }
                </Col>
                <Col sm={3} className="ml-auto">
                    {currentStep < totalSteps ?
                        <Button onClick={nextStep} block>Continue</Button>
                        :
                        <Button variant="success" onClick={submit} block>Save</Button>
                    }
                </Col>
            </Row>
            {/* <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Other Functions</h4>
            <div>Current Step: {currentStep}</div>
            <div>Total Steps: {totalSteps}</div>
            <button className='btn btn-block btn-default' onClick={firstStep}>First Step</button>
            <button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button>
            <button className='btn btn-block btn-default' onClick={() => goToStep(2)}>Go to Step 2</button>
        </div> */}
        </div>
    );

export default Step;