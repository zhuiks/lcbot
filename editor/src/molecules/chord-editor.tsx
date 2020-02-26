import React from "react";
import { SlideInput } from "../__generated__/globalTypes";
import SongSlide from "@bit/zhuiks.lcbot.song-slide";

interface ChordEditorProps {
    slide: SlideInput
}

const ChordEditor: React.FC<ChordEditorProps> = ({ slide }) => (
    <SongSlide slide={slide} />
)
export default ChordEditor;