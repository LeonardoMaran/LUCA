import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import {Font} from 'expo'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { NativeRouter, Route, Link } from "react-router-native";
import {rootReducer} from './src/constants/RootReducer';
import Nav from './src/navs/Nav';
import GraphContainer from './src/graph/GraphContainer';
import TaskContainer from './src/tasks/TaskContainer';
import ScrapBookContainer from './src/scrapbook/ScrapBookContainer';
import backDrop from './assets/background.png';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount(){
    await Font.loadAsync({
      'quicksand': require('./assets/fonts/Quicksand-Regular.ttf')
    })

    this.setState({fontLoaded: true});
  }


  render() {

    const store = createStore(rootReducer);

    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        fontFamily: 'quicksand',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
      },
      body: {
        flex: 9,
        borderWidth: 1,
        borderColor: 'black'
      },
      navBar: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      backDrop: {
        flex: 1,
        zIndex: -15,
      }
    });

    return (
      <NativeRouter>
        <Provider store={store}>
          {
            this.state.fontLoaded ? (
              <View style={styles.container}>
                <ImageBackground source={backDrop} style={{width: '100%', height: '100%'}}>
                  <View style={styles.body}>
                    <Route exact path="/" component={GraphContainer} />
                    <Route path="/tasks" component={TaskContainer} />
                    <Route path="/scrapbook" component={ScrapBookContainer} />
                  </View>
                  <View style={styles.navBar}>
                    <Link to="/">
                      <Nav/>
                    </Link>
                    <Link to="/tasks">
                      <Nav/>
                    </Link>
                    <Link to="/scrapbook">
                      <Nav/>
                    </Link>
                  </View>
                </ImageBackground>
              </View>
            ) : null
          }
        </Provider>
      </NativeRouter>
    );
  }
}
