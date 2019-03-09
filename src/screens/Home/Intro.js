import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo';
import { NavigationEvents } from 'react-navigation';

import CategoryEntry from './CategoryEntry';
import styles from './Styles';

const { width } = Dimensions.get('window');

const category1 = require('../../../assets/images/Home/cate1.jpg');
const category2 = require('../../../assets/images/Home/cate2.jpg');
const category3 = require('../../../assets/images/Home/cate3.jpg');
const category4 = require('../../../assets/images/Home/cate4.jpg');

const imageArray = [
  [category1, '운동'],
  [category2, '생활패턴'],
  [category3, '공부'],
  [category4, '식습관'],
];

class Intro extends Component {
  state = {
    isPlay: true,
  };

  handleWillFocus = () => {
    this.setState({ isPlay: true });
  };

  handleWillBlur = () => {
    this.setState({ isPlay: false });
  };

  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={this.handleWillFocus}
          onWillBlur={this.handleWillBlur}
        />
        <View style={styles.imgContainer}>
          <View style={{ position: 'relative' }}>
            <Video
              source={require('../../../assets/video/Flint.mp4')}
              rate={1.0}
              isMuted={true}
              isLooping
              shouldPlay={this.state.isPlay}
              resizeMode="cover"
              style={{ flex: 1, height: 300 }}
            />
            <View style={{ position: 'absolute', width, height: 300 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Fontrust',
                    fontSize: 55,
                    color: 'white',
                  }}
                >
                  Change Your Life
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.challengeContainer}>
          <View
            style={{
              width,
              backgroundColor: 'white',
              marginLeft: 6,
              marginTop: 6,
              marginBottom: 6,
              height: width * 0.7,
            }}
          >
            <FlatList
              data={imageArray}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => (
                <CategoryEntry
                  img={imageArray[item.index][0]}
                  title={imageArray[item.index][1]}
                  goToScreen={goToScreen}
                />
              )}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Intro;
