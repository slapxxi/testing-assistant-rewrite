import { FontAwesome } from '@expo/vector-icons';
import glamorous from 'glamorous-native';
import React from 'react';
import { colors } from '../lib/constants';

function Option({ option, valid, onPress }) {
  return (
    <Container activeOpacity={0.9} valid={valid} onPress={() => onPress(option)}>
      {valid ? (
        <FontAwesome
          name="check-square-o"
          color={colors.cyan}
          size={18}
          style={{ marginTop: 4 }}
        />
      ) : (
        <FontAwesome
          name="square-o"
          color={colors.lightgrey}
          size={18}
          style={{ marginTop: 4 }}
        />
      )}
      <Text valid={valid}>{option.text}</Text>
    </Container>
  );
}

const Container = glamorous.touchableopacity(({ valid }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 15,
  marginVertical: 5,
  marginHorizontal: 10,
  borderWidth: 1,
  borderRadius: 5,
  backgroundColor: 'white',
  borderColor: valid ? colors.cyan : colors.lightgrey,
}));

const Text = glamorous.text(({ valid }) => ({
  flex: 1,
  marginLeft: 10,
  fontWeight: valid ? 'bold' : 'normal',
}));

export default Option;
