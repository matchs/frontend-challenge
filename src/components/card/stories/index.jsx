import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../index';

storiesOf('Card', module)
  .add('large', () => <Card
    title="Harry Potter and The Goblet of Fire" 
    score={7.5}
    year={2005}
    size="large"
    description="Harry starts his fourth year at Hogwarts, competes in the treacherous Triwizard Tournament and faces the evil Lord Voldemort. Ron and Hermione help Harry manage the pressure – but Voldemort lurks, awaiting his chance to destroy Harry and all that he stands for."
/>)
.add('small', () => <Card
    title="Harry Potter and The Goblet of Fire" 
    score={7.5}
    year={2005}
    size="snall"
    description="Harry starts his fourth year at Hogwarts, competes in the treacherous Triwizard Tournament and faces the evil Lord Voldemort. Ron and Hermione help Harry manage the pressure – but Voldemort lurks, awaiting his chance to destroy Harry and all that he stands for."
/>);