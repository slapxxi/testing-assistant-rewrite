import { FontAwesome } from '@expo/vector-icons';
import glamorous from 'glamorous-native';
import React, { Component } from 'react';
import { Modal, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../lib/constants';
import { saveUserData } from '../store/user/actions';
import Button from './Button';

class UserData extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      login: user.login,
      password: user.password,
      occupation: user.occupation,
      cardNumber: user.cardNumber,
    };
  }

  handleChangeCardNumber = (cardNumber) => {
    this.setState({ cardNumber });
  };

  handleChangeLogin = (login) => {
    this.setState({ login });
  };

  handleChangePassword = (password) => {
    this.setState({ password });
  };

  handleSelectOccupation = (value) => {
    this.setState({ occupation: value });
  };

  handleSubmit = () => {
    const userData = {
      login: this.state.login,
      password: this.state.password,
      cardNumber: this.state.cardNumber,
      occupation: this.state.occupation,
    };
    this.props.saveUserData(userData);
    this.props.onSubmit(userData);
  };

  handleClose = () => {
    const userData = {
      login: this.state.login,
      password: this.state.password,
      cardNumber: this.state.cardNumber,
      occupation: this.state.occupation,
    };
    this.props.saveUserData(userData);
    this.props.onClose();
  };

  render() {
    const { visible, onSubmit } = this.props;
    return (
      <Modal
        style={{ flex: 1 }}
        visible={visible}
        animationType="slide"
        onRequestClose={this.handleClose}
      >
        <ModalContainer>
          <Header>
            <Heading>Экзамен</Heading>
            <TouchableOpacity onPress={this.handleClose}>
              <FontAwesome
                name="times-circle"
                size={18}
                color={colors.grey}
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
          </Header>
          <ModalContent>
            <Label>Номер Карты</Label>
            <Input
              value={this.state.cardNumber}
              placeholder="Номер Карты"
              onChangeText={this.handleChangeCardNumber}
              keyboardType="numeric"
              returnKeyType="done"
            />
            <Label>Логин</Label>
            <Input
              value={this.state.login}
              returnKeyType="done"
              onChangeText={this.handleChangeLogin}
            />
            <Label>Пароль</Label>
            <Input
              value={this.state.password}
              keyboardType="numeric"
              returnKeyType="done"
              onChangeText={this.handleChangePassword}
              style={{ padding: 10 }}
            />
            <Picker
              onValueChange={this.handleSelectOccupation}
              selectedValue={this.state.occupation}
              style={{
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'center',
              }}
            >
              <Picker.Item label="Админ" value="Администратор" />
              <Picker.Item label="Бармен" value="Бармен" />
              <Picker.Item label="Официант" value="Официант" />
              <Picker.Item label="Старший Официант" value="Старший Официант" />
            </Picker>
          </ModalContent>
          <Footer>
            <Button
              text="Начать Экзамен"
              onPress={() =>
                onSubmit({
                  login: this.state.login,
                  password: this.state.password,
                  cardNumber: this.state.cardNumber,
                  occupation: this.state.occupation,
                })
              }
              style={{ flex: 1 }}
            />
          </Footer>
        </ModalContainer>
      </Modal>
    );
  }
}

const Header = glamorous.view({
  flexDirection: 'row',
  paddingTop: 30,
  alignItems: 'center',
  justifyContent: 'space-around',
});

const Heading = glamorous.text({
  flex: 1,
  padding: 10,
  fontSize: 20,
  fontWeight: 'bold',
});

const ModalContainer = glamorous.view({
  flex: 1,
});

const ModalContent = glamorous.view({
  flex: 1,
  padding: 10,
});

const Label = glamorous.text({
  fontWeight: '600',
  marginVertical: 15,
});

const Input = glamorous.textinput({
  height: 40,
  padding: 10,
  borderWidth: 1,
  borderColor: colors.lightgrey,
});

const Footer = glamorous.view({
  flexDirection: 'row',
  width: '100%',
  padding: 10,
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const enhance = connect(
  ({ user }) => ({ user }),
  { saveUserData },
);

export default enhance(UserData);
