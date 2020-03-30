import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';

import PageHeader from './page-header';

export default {
  title: 'Page Atoms/Header',
  component: PageHeader,
  decorators: [StoryRouter()],
};

export const Default = () => <PageHeader>This is Page Title</PageHeader>

export const WithLink = () => <PageHeader link="/test">This is Linked Page Title</PageHeader>

export const Editable = () => {
  const [text, setText] = useState('Edit Me!');
  return (
    <PageHeader
      onChange={(newText) => {
        setText(newText);
      }}
      helperText="Inline edit is cool!"
    >
      {text}
    </PageHeader>
  )
}
