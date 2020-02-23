import React from 'react';
import Card from 'react-bootstrap/Card';
import { SlideInput } from '../../__generated__/globalTypes';
import SongText from '@bit/zhuiks.lcbot.song-text';

interface OrdererProps {
    slides: SlideInput[] | undefined;
}

const Orderer: React.FC<OrdererProps> = ({ slides }) => {

    return <SongText slides={slides} />
    // return (
    //     <>
    //         {slides && slides.map((slide: SlideInput, n: number) => (
    //             <Card key={n} bg={slide.type==="VERSE" ? "primary" : "secondary"} text="white" className="mb-3">
    //                 <Card.Header>{slide.name}</Card.Header>
    //                 <Card.Body>
    //                     {slide.lines && slide.lines.map((line: string, i: number) => (
    //                         <p key={i} className="mb-0">{line}</p>
    //                     ))}
    //                 </Card.Body>
    //             </Card>
    //         ))}
    //     </>
    // );
}

export default Orderer;