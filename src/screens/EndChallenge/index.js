import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Success from './Success';
import Failure from './Failure';

const baseUrl = 'http://13.209.19.196:3000';

class EndChallenge extends React.Component {
  recentChallenge = this.props.navigation.getParam('recentChallenge');

  updateChallengeStateRequest = async state => {
    // console.log(recentChallenge.id);
    await axios.put(
      `${baseUrl}/api/challenges/updateChallengeState/${this.recentChallenge.id}/${state}`,
    );
  };

  render() {
    const { navigation } = this.props;
    const progress = navigation.getParam('progress');
    const recentChallenge = navigation.getParam('recentChallenge');
    const handleExistEnd = navigation.getParam('handleExistEnd');

    return progress === 1 ? (
      <Success
        recentChallenge={recentChallenge}
        updateChallengeStateRequest={this.updateChallengeStateRequest}
        handleExistEnd={handleExistEnd}
        navigation={navigation}
      />
    ) : (
      <Failure
        recentChallenge={recentChallenge}
        handleExistEnd={handleExistEnd}
        updateChallengeStateRequest={this.updateChallengeStateRequest}
        navigation={navigation}
      />
    );
  }
}

EndChallenge.propTypes = {
  // recentChallenge: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  // }).isRequired,
  // progress: PropTypes.number.isRequired,
};

export default EndChallenge;
