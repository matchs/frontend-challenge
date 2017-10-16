import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '../index';

storiesOf('SearchBar', module)
    .add('regular', () => <SearchBar onSearchInput={(v) => console.log('>>>>', v)} />)
    .add('disabled', () => <SearchBar disabled={true} />);