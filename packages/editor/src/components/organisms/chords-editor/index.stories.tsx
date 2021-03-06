import React from 'react';

import ChordEditor from '.';
import { SlideType } from "@bit/zhuiks.lcbot.core.types";
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords";
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
        <ChordEditor slide={mockSlideAr} rtl />
    </MockRTLdiv>
)
