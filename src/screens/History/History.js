import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';
import sendRequest from '../../modules/sendRequest';
import HistoryEntry from './HistoryEntry';
import styles from './style';

class History extends Component {
  state = {
    completeList: [],
    isLoading: false,
    isSignIn: null,
  };

  handleWillFocus = async () => {
    try {
      const { id } = JSON.parse(await AsyncStorage.getItem('userInfo'));
      const { data } = await sendRequest('get', `/api/history/completeList/${id}`);
      this.setState({
        isLoading: true,
        isSignIn: true,
        completeList: data || [],
      });
    } catch (err) {
      this.setState({ isSignIn: false, isLoading: true });
    }
  };

  goTo = screen => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  renderToSignInPage = () => {
    const { switchScreen } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => switchScreen('SignIn')}>
          <Text style={{ fontWeight: '500', textDecorationLine: 'underline' }}>
            Flint 회원이신가요?
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderInCondition = () => {
    const { isLoading, isSignIn, completeList } = this.state;
    const { switchScreen } = this.props;
    if (isLoading) {
      if (isSignIn) {
        return completeList.length !== 0 ? (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <FlatList
                data={completeList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemData => (
                  <HistoryEntry data={itemData.item} handlePress={switchScreen} />
                )}
              />
            </View>
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> 아직 완료된 도전이 없습니다. </Text>
          </View>
        );
      }
      return this.renderToSignInPage();
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={this.handleWillFocus} />
      {this.renderInCondition()}
    </View>
  );
}

History.propTypes = {
  switchScreen: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default History;
