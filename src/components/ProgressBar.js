// @flow
import React from 'react';
import glamorous from 'glamorous-native';
import { colors } from '../lib/constants';

type Props = { current: number, total: number };

function ProgressBar({ current, total }: Props) {
  const progress = Math.ceil(current / total * 100);
  return (
    <Container>
      <Line size={progress} />
    </Container>
  );
}

const Container = glamorous.view({
  backgroundColor: colors.lightgrey,
  marginTop: 10,
  width: '100%',
  height: 2,
});

const Line = glamorous.view(({ size }) => ({
  alignSelf: 'flex-start',
  height: 2,
  width: `${size}%`,
  backgroundColor: colors.blue,
}));

export default ProgressBar;
