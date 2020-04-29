import React from 'react';
import styled from 'styled-components';

import { MockRTLdiv } from './chord-span.stories';
import WidthCalculator from './width-calculator';
import { action } from '@storybook/addon-actions';

const ChordsLine = styled.div`
    position: relative;
    display: flex;
`;

const mockContent = "Я вільний!";
const mockContentAr = "رغم عيوبي وكل ضع";

export default {
    title: 'Chords/WidthCalculator',
    component: WidthCalculator,
    excludeStories: /^mock.*/i,
};

export const Default: React.FC = () => (
    <ChordsLine>
        <WidthCalculator text={mockContent} onComplete={action('Width calculated')} />
    </ChordsLine>
)
export const Arabic: React.FC = () => (
    <MockRTLdiv>
        <ChordsLine>
            <WidthCalculator text={mockContentAr} onComplete={action('Width calculated')} />
        </ChordsLine>
    </MockRTLdiv>
);
