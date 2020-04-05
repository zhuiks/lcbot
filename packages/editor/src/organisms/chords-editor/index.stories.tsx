import React from 'react';
import { action } from '@storybook/addon-actions';

import ChordEditor from './';
import { SlideType, ChordSlide } from "@bit/zhuiks.lcbot.core";
import { MockRTLdiv } from './chord-span.stories';

const mockSlide = new ChordSlide({
    type: SlideType.CHORUS,
    lines: [
        "Усі діла Твої звеличують Тебе",
        "Усе для Тебе і Тобою все живе!",
        "Усі ми створені в Тобі знайти усе",
        "Боже в Тобі усе!",
    ],
});

const mockSlideAr = new ChordSlide({
    type: SlideType.CHORUS,
    lines: [
        "جايلك بتوبة عند رجليك",
        "مشتاق لحضنك لمسة ايديك",
        "تيجي تغير تشفي تحرر",
        "تديني قوة وانت تزيد",
    ],
});

export default {
    title: 'Chords/The Editor',
    component: ChordEditor,
};


export const Default: React.FC = () => <ChordEditor slide={mockSlide} />

export const Arabic: React.FC = () => (
    <MockRTLdiv>
        <ChordEditor slide={mockSlideAr} />
    </MockRTLdiv>
)
