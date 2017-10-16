import React from 'react';
import { storiesOf } from '@storybook/react';

import CardList from '../index';
import Card from '../../index';

storiesOf('CardList', module)
  .add('default', () => <CardList>
    <Card
        title="Harry Potter and The Goblet of Fire" 
        score={7.5}
        year={2005}
        size="large"
        description="Harry starts his fourth year at Hogwarts, competes in the treacherous Triwizard Tournament and faces the evil Lord Voldemort. Ron and Hermione help Harry manage the pressure – but Voldemort lurks, awaiting his chance to destroy Harry and all that he stands for."
    />
    <Card
        title="Harry Potter and The Goblet of Fire" 
        score={7.5}
        year={2005}
        size="snall"
        description="Harry starts his fourth year at Hogwarts, competes in the treacherous Triwizard Tournament and faces the evil Lord Voldemort. Ron and Hermione help Harry manage the pressure – but Voldemort lurks, awaiting his chance to destroy Harry and all that he stands for."
    />
</CardList>);