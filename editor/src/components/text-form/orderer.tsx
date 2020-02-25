import React from 'react';
import Card from 'react-bootstrap/Card';
import { SlideInput } from '../../__generated__/globalTypes';
import SongSlide from '@bit/zhuiks.lcbot.song-slide';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface OrdererProps {
    slides: SlideInput[];
}

const Orderer: React.FC<OrdererProps> = ({ slides }) => {

    return (
        <Row className="justify-content-center">
            <Col sm={6} style={{ direction: 'rtl', textAlign: 'right' }}>
                {slides.map((slide, i) => (
                    <SongSlide key={i} slide={slide} />
                ))}
            </Col>
        </Row>
    )
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