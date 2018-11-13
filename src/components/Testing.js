import glamorous from 'glamorous-native';
import { differenceBy, find, intersectionBy } from 'lodash';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, Option, ProgressBar, Results } from '.';
import beginTesting from '../beginTesting';
import calculateSuccessRate from '../lib/calculateSuccessRate';
import matchAvailableToCorrect from '../lib/matchAvailableToCorrect';
import completeTesting from '../services/completeTesting';
import fetchNextQuestion from '../services/fetchNextQuestion';
import leaveTesting from '../services/leaveTesting';
import { findOptions } from '../store/selectors';

class Testing extends Component {
  state = {
    question: '',
    availableOptions: [],
    correctOptions: [],
    checkedOptions: [],
    questionCount: 0,
    complete: false,
    results: {},
    totalQuestionCount: 0,
    isLoading: true,
    rating: 0,
  };

  intervalID = null;

  async componentDidMount() {
    const { question, availableOptions, questionCount } = await beginTesting(
      this.props.type,
    );
    const correctOptions = findOptions(this.props.databases[this.props.type], question);
    const rating = calculateSuccessRate(correctOptions, [], []);
    this.setState({
      question,
      availableOptions,
      totalQuestionCount: questionCount,
      questionCount,
      correctOptions,
      checkedOptions: correctOptions,
      isLoading: false,
      rating,
    });
  }

  componentWillUnmount() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  handleNextQuestion = async () => {
    this.setState({ isLoading: true });
    let matchingOptions = matchAvailableToCorrect(
      this.state.availableOptions,
      this.state.checkedOptions,
    );
    if (matchingOptions.length === 0) {
      matchingOptions = this.state.availableOptions;
    }
    if (this.state.questionCount === 1) {
      if (this.intervalID) {
        clearInterval(this.intervalID);
      }
      const { results } = await completeTesting(matchingOptions);
      this.setState({
        results,
        isLoading: false,
        complete: true,
      });
      return;
    }
    const { question, availableOptions, questionCount } = await fetchNextQuestion(
      matchingOptions,
    );
    const correctOptions = findOptions(this.props.databases[this.props.type], question);
    this.setState({
      question,
      availableOptions,
      questionCount,
      correctOptions,
      checkedOptions: correctOptions,
      isLoading: false,
      rating: this.calculateRating(correctOptions, correctOptions),
    });
  };

  handlePress = (option) => {
    let result;
    const { checkedOptions } = this.state;
    if (find(checkedOptions, (o) => o.text === option.text)) {
      result = checkedOptions.filter((o) => o.text !== option.text);
    } else {
      result = [...checkedOptions, option];
    }
    const rating = this.calculateRating(this.state.correctOptions, result);
    this.setState({ checkedOptions: result, rating });
  };

  handleEnableAuto = async () => {
    this.intervalID = setInterval(async () => {
      await this.handleNextQuestion();
    }, 1100);
  };

  handleFinish = async () => {
    await leaveTesting();
    this.props.onFinish();
  };

  calculateRating = (correctOptions, checkedOptions) => {
    const correct = intersectionBy(correctOptions, checkedOptions, 'text');
    const missed = differenceBy(correctOptions, checkedOptions, 'text');
    const incorrect = differenceBy(checkedOptions, correctOptions, 'text');
    return calculateSuccessRate(correct, missed, incorrect);
  };

  render() {
    const {
      question,
      complete,
      results,
      questionCount,
      totalQuestionCount,
      availableOptions,
      isLoading,
      rating,
      checkedOptions: options,
    } = this.state;
    const disableButton = isLoading || rating < 85;
    return complete ? (
      <Results results={results} onPress={this.handleFinish} />
    ) : (
      <Container>
        <Header>
          <Heading>
            {this.props.payload.mode === 'real' ? 'Экзамен' : 'Тренировка'}{' '}
          </Heading>
          {this.state.totalQuestionCount === 0 ? null : (
            <Details>
              &quot;
              {this.props.type}
              &quot; - {questionCount} из {totalQuestionCount}
            </Details>
          )}
          <ProgressBar
            current={totalQuestionCount - questionCount}
            total={totalQuestionCount}
          />
        </Header>
        {this.state.isLoading ? (
          <IndicatorContainer>
            <ActivityIndicator />
          </IndicatorContainer>
        ) : (
          <Content
            data={availableOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Option
                key={item.id}
                option={item}
                valid={hasOption(options, item)}
                onPress={this.handlePress}
              />
            )}
            ListHeaderComponent={() => <Heading>{question}</Heading>}
          />
        )}
        <Footer>
          <RatingContainer>
            <Rating>{this.state.rating}%</Rating>
          </RatingContainer>
          <Button
            disable={disableButton}
            text="Далее"
            onLongPress={this.handleEnableAuto}
            onPress={this.handleNextQuestion}
            style={{ flex: 1 }}
          />
        </Footer>
      </Container>
    );
  }
}

function hasOption(options, option) {
  return options.find((o) => option.text === o.text);
}

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#F7F7F7',
  justifyContent: 'center',
});

const Header = glamorous.view({
  paddingTop: 30,
  alignItems: 'center',
  justifyContent: 'center',
});

const Details = glamorous.text({
  color: '#a0a0a0',
});

const IndicatorContainer = glamorous.view({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = glamorous(FlatList)({
  flex: 1,
});

const Footer = glamorous.view({
  flexDirection: 'row',
  width: '100%',
  padding: 10,
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Heading = glamorous.text({
  padding: 10,
  fontSize: 20,
  fontWeight: 'bold',
});

const RatingContainer = glamorous.view({
  flex: 0.2,
  alignItems: 'center',
});

const Rating = glamorous.text({});

const enhance = connect(({ databases }) => ({ databases }));

export default enhance(Testing);
