import React from 'react';
import { connect } from 'react-redux';


function Message(props) {
  return <div id="message">{props.infoMessage}</div>;
}

const mapStateToProps = state => ({
  infoMessage: state.infoMessage,
});

export default connect(mapStateToProps)(Message);
