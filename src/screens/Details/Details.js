import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Content, Card } from "native-base";
import { connect } from 'react-redux';


import MainContainer from '../../components/MainContainer/MainContainer';
import MainActivityIndicator from '../../components/MainActivityIndicator/MainActivityIndicator';
import DetailsCardItem from '../../components/DetailsCardItem/DetailsCardItem';

 class DetailsScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: 'white', // change the text color of the title (remembered across pushes)
    navBarBackgroundColor: 'black', // change the background color of the nav bar (remembered across pushes)
    navBarButtonColor: 'white', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
    navBarTitleTextCentered: true, // default: false. centers the title.
    navBarTopPadding: 24 // Optional, set navBar top padding in dp. Useful when StatusBar.translucent=true on Android Lollipop and above.
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: {
        planet: props.item,
        residents: [],
        films: []
      }
    }
  }

  componentDidMount() {
    this.fetchRelevantData();
  }

  fetchRelevantData = () => {
    const promiseArray = [];
    const residents = this.state.data.planet.residents;
    const films = this.state.data.planet.films;
    const urls = residents.concat(films);
    urls.map(url => {      
      promiseArray.push(this.fetchData(url));
    });

    Promise.all(promiseArray).then((data) => {
      this.updateDataState(data);
      this.toggleIsLoadingState();
    }).catch(error => console.log('Error:', error));
  }

  fetchData = (url) => { 

    const { callapi } = this.props;

        return (
          callapi(url)
        )

  }

  toggleIsLoadingState = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        isLoading: !previousState.isLoading
      }
    });
  }

  updateDataState = (data) => {
    const residents = data.filter((item) => {
      return item.url.includes('people');
    });
    const films = data.filter((item) => {
      return item.url.includes('films');
    });

    this.setState(previousState => {
      return {
        data: {
          ...previousState.data,
          residents: residents,
          films: films
        }
      }
    });
  }

  render() {
    console.log('State:', this.state);
    let content = null;

    if (this.state.isLoading) {
      content = (
        <MainActivityIndicator />
      );
    } else {
      content = (
        <Card>
          <DetailsCardItem
            cardItemContentType='planet'
            cardItemHeaderText='Planet Details'
            cardItemContent={this.state.data.planet}
          />
          <DetailsCardItem
            cardItemContentType='person'
            cardItemHeaderText={`Residents(${this.state.data.residents.length})`}
            cardItemContent={this.state.data.residents}
          />
          <DetailsCardItem
            cardItemContentType='film'
            cardItemHeaderText={`Films(${this.state.data.films.length})`}
            cardItemContent={this.state.data.films}
          />
        </Card>
      );
    }

    return (
      <MainContainer>
        <Content padder contentContainerStyle={this.state.isLoading ? styles.content : {}}>
          {content}
        </Content>
      </MainContainer>
    );
  }
}


/* PropTypes Declaration */
DetailsScreen.propTypes = {
  callapi: PropTypes.func,

};

/* Default PropTypes Declaration */
DetailsScreen.defaultProps = {
  callapi: null,
};

export { DetailsScreen as DetailsScreenObject };

export default connect(mapStateToProps, {
  callapi: Actions.callapi,
})(DetailsScreen);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 90
  }
});
