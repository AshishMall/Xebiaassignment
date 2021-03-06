import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';


import { startSearchScreen } from '../../../index';
import MainContainer from '../../components/MainContainer/MainContainer';
import MainActivityIndicator from '../../components/MainActivityIndicator/MainActivityIndicator';
import alert from  '../../utilities/alert';
import backgroundImage from '../../assets/loginBackground.jpg';

class LoginScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      controls: {
        username: {
          value: ''
        },
        password: {
          value: ''
        }
      }
    };

    if (this.props.loggedOut) {
      const title = 'Logged Out';
      const message = 'You have been successfully logged out!';
      alert(title, message);
    }
  }

  loginHandler = () => {
    this.authenticate().then(authenticated => {
      this.toggleIsLoadingState();
      if (authenticated) {
        startSearchScreen(this.state.controls.username.value.toLowerCase());
      } else {
        const title = 'Unable to sign in';
        const message = 'The username or password that you typed is incorrect'
        alert(title, message);
      }
    }).catch((error) => {
      console.log('Error:', error);
      this.toggleIsLoadingState();
    });
  }

  authenticate = () => {
    this.toggleIsLoadingState();
    let authenticated = false;
    let username = this.state.controls.username.value;
    let password = this.state.controls.password.value;
    const { callapi } = this.props;
    let url = `https://swapi.co/api/people/?search=${username}`;
    let data =  callapi(url)
    let name = data.results[0].name;
    let birthYear = data.results[0].birth_year;
    authenticated = username.toLowerCase() === name.toLowerCase() && password === birthYear;

 
  }

  toggleIsLoadingState = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        isLoading: !previousState.isLoading
      }
    });
  }

  updateInputState = (key, value) => {
    this.setState(previousState => {
      return {
        controls: {
          ...previousState.controls,
          [key]: {
            ...previousState.controls[key],
            value: value
          }
        }
      }
    });
  }

  render() {
    let content = null;

    if (this.state.isLoading) {
      content = (
        <MainActivityIndicator />
      );
    } else {
      content = (
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                style={styles.input}
                value={this.state.controls.username.value}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.updateInputState('username', text)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                style={styles.input}
                value={this.state.controls.password.value}
                secureTextEntry
                onChangeText={(text) => this.updateInputState('password', text)}
              />
            </Item>
          </Form>
          <View style={styles.buttonContainer}>
            <Button transparent light onPress={this.loginHandler}>
              <Text>Sign In</Text>
            </Button>
          </View>
        </View>
      );
    }

    return (
      <MainContainer imageBackgroundSource={backgroundImage}>
        <Content contentContainerStyle={styles.content}>
          {content}
        </Content>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    color : "white"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
/* PropTypes Declaration */
LoginScreen.propTypes = {
  callapi: PropTypes.func,

};

/* Default PropTypes Declaration */
LoginScreen.defaultProps = {
  callapi: null,
};

export { LoginScreen as LoginScreenObject };

export default connect(mapStateToProps, {
  callapi: Actions.callapi,
})(LoginScreen);
