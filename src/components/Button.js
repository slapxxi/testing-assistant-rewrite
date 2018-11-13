// @flow
import glamorous from 'glamorous-native';
import React from 'react';
import { colors } from '../lib/constants';

function Button({ disable, text, onPress, onLongPress, style = {} }) {
  return (
    <Container
      activeOpacity={disable ? 1 : 0.3}
      disable={disable}
      onPress={onPress}
      onLongPress={onLongPress}
      style={style}
    >
      <Text>{text}</Text>
    </Container>
  );
}

const Container = glamorous.touchableopacity(({ disable }) => ({
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  backgroundColor: disable ? colors.lightgrey : colors.blue,
}));

const Text = glamorous.text({
  color: 'white',
});

export default Button;
