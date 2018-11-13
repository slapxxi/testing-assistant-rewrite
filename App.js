import glamorous from 'glamorous-native';
import React, { Component } from 'react';
import { Alert, Picker } from 'react-native';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Button from './src/components/Button';
import Testing from './src/components/Testing';
import UserData from './src/components/UserData';
import leaveTesting from './src/services/leaveTesting';
import setupTesting from './src/services/setupTesting';
import configureStore from './src/store/configureStore';

class App extends Component {
  state = {
    began: false,
    testType: 'Ставка',
    testMode: 'training',
    payload: {},
  };

  handlePress = async () => {
    await setupTesting({
      mode: this.state.testMode,
    });
    this.setState({ began: true });
  };

  handleLongPress = () => {
    this.setState({ testMode: 'real' });
  };

  handleModalClose = async () => {
    await leaveTesting();
    this.setState({ testMode: 'training', payload: {} });
  };

  handleFinish = () => {
    this.setState({
      began: false,
      testMode: 'training',
      payload: {},
    });
  };

  handleSelectType = (testType) => {
    this.setState({ testType });
  };

  handleSubmit = async (userData) => {
    const response = await setupTesting({
      mode: this.state.testMode,
      ...userData,
    });
    if (response.status === 404) {
      await leaveTesting();
      Alert.alert('Указаны неверные данные!');
    } else {
      this.setState({
        began: true,
        payload: { mode: this.state.testMode, ...userData },
      });
    }
  };

  render() {
    return this.state.began ? (
      <Testing
        payload={this.state.payload}
        onFinish={this.handleFinish}
        type={this.state.testType}
      />
    ) : (
      <Container>
        <UserData
          visible={this.state.testMode === 'real'}
          onClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
        />
        <Header>
          <Heading>Тестирование</Heading>
        </Header>
        <Picker
          onValueChange={this.handleSelectType}
          selectedValue={this.state.testType}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
          }}
        >
          <Picker.Item label="Ставка" value="Ставка" />
          <Picker.Item label="Ставка+" value="Ставка+" />
          <Picker.Item label="Винная Карта" value="Винная Карта" />
          <Picker.Item label="Коктейльная Карта с ШБ" value="Коктейльная Карта с ШБ" />
          <Picker.Item
            label="Коктейльная Карта без ШБ"
            value="Коктейльная Карта без ШБ"
          />
          <Picker.Item label="Узбекское Меню" value="Узбекское Меню" />
          <Picker.Item
            label="Коктейльная Карта с ШБ (Официант)"
            value="Коктейльная Карта с ШБ (Официант)"
          />
          <Picker.Item
            label="Коктейльная Карта без ШБ (Официант)"
            value="Коктейльная Карта без ШБ (Официант)"
          />
        </Picker>
        <Footer>
          <Button
            text="Начать"
            onLongPress={this.handleLongPress}
            onPress={this.handlePress}
            style={{ flex: 1 }}
          />
        </Footer>
      </Container>
    );
  }
}

const Container = glamorous.view({
  flex: 1,
  backgroundColor: '#F7F7F7',
  justifyContent: 'center',
  alignItems: 'center',
});

const Header = glamorous.view({
  paddingTop: 30,
  alignItems: 'center',
  justifyContent: 'center',
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

const enhance = connect((state) => ({ state }));

const RootComponent = enhance(App);

function Root() {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
}

export default Root;
