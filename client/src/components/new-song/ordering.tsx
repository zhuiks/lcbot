import React from 'react';
import Card from 'react-bootstrap/Card';
import { slideType } from '../../utils/text-breaker';

interface OrdererProps {
    slides: slideType[] | undefined;
}

const Orderer: React.FC<OrdererProps> = ({ slides }) => {

    return (
        <>
            {slides && slides.map((slide: slideType, n: number) => (
                <Card key={n} bg={slide.type==="VERSE" ? "primary" : "secondary"} text="white" className="mb-3">
                    <Card.Header>{slide.name}</Card.Header>
                    <Card.Body>
                        {slide.text.map((line: string, i: number) => (
                            <p key={i} className="mb-0">{line}</p>
                        ))}
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default Orderer;