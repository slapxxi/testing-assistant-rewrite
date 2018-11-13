// @flow
import glamorous from 'glamorous-native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { colors } from '../lib/constants';
import Button from './Button';

function Results({ results, onPress }) {
  return (
    <Container>
      <RatingContainer rating={results.rating}>
        <Rating>{results.rating}%</Rating>
      </RatingContainer>
      {results.rating < 100 ? <IncorrectResults results={results} /> : null}
      <Footer>
        <Button text="Меню" onPress={onPress} />
      </Footer>
    </Container>
  );
}

function IncorrectResults({ results }) {
  const data = mapResultsToWrongAnswers(results);
  return (
    <Summary>
      <FlatList
        data={data}
        keyExtractor={({ question }) => question}
        renderItem={({ item }) => <Answer answer={item} />}
        contentContainerStyle={{ padding: 25 }}
      />
    </Summary>
  );
}

function Answer({ answer }) {
  return (
    <ResultContainer>
      <ResultText
        style={{
          alignSelf: 'center',
          fontWeight: '600',
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {answer.question}
      </ResultText>
      {renderAnswers('Правильные ответы:', answer.correct, colors.green)}
      {renderAnswers('Неправильные ответы:', answer.incorrect, colors.red)}
      {renderAnswers('Правильные, но не выбранные ответы:', answer.missed)}
      {renderAnswers('Остальные варианты:', answer.remaining)}
    </ResultContainer>
  );
}

function renderAnswers(title, answers, color = colors.grey) {
  if (answers.length === 0) {
    return null;
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <ResultText>{title}</ResultText>
      {answers.map((a) => (
        <ResultText
          key={a}
          style={{
            fontSize: 14,
            marginVertical: 10,
            marginLeft: 10,
            fontWeight: '500',
            color,
          }}
        >
          {a}
        </ResultText>
      ))}
    </View>
  );
}

function mapResultsToWrongAnswers({ answers }) {
  return answers.filter((r) => r.rating < 100);
}

const Container = glamorous.view({
  flex: 1,
  alignItems: 'stretch',
  justifyContent: 'center',
  backgroundColor: '#f7f7f7',
});

const Summary = glamorous.view({
  flex: 1,
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

const RatingContainer = glamorous.view(({ rating }) => ({
  flex: rating < 100 ? 0.35 : 1,
  marginTop: 20,
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ResultContainer = glamorous.view({
  borderWidth: 1,
  borderColor: '#F0F0F3',
  backgroundColor: 'white',
  marginVertical: 10,
  borderRadius: 5,
  padding: 15,
});

const ResultText = glamorous.text({
  fontSize: 16,
  fontWeight: '400',
});

const Rating = glamorous.text({
  fontSize: 50,
  fontWeight: 'bold',
});

const Footer = glamorous.view({
  alignSelf: 'stretch',
  padding: 10,
});

export default Results;
