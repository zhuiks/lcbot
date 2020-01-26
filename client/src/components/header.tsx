import React from 'react';
import styled from 'react-emotion';
import { size } from 'polished';

import { unit, colors } from '../styles';
import logo from '../assets/logo.png';
// const max = 25; // 25 letters in the alphabet
// const offset = 97; // letter A's charcode is 97


interface HeaderProps {
  image?: string | any;
  children?: any;
}

const Header: React.FC<HeaderProps> = ({ image, children = 'Lyrics & Chords' }) => {
  const avatar = image || logo;

  return (
    <Container>
      <Image round={!image} src={avatar} alt="Lyrics & Chords" />
      <div>
        <h2>{children}</h2>
        {/* <Subheading>{email}</Subheading> */}
      </div>
    </Container>
  );
}

export default Header;

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: unit * 4.5,
});

const Image = styled('img')(size(134), (props: { round: boolean }) => ({
  marginRight: unit * 2.5,
  borderRadius: props.round ? '50%' : '0%',
}));

const Subheading = styled('h5')({
  marginTop: unit / 2,
  color: colors.textSecondary,
});
