import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

 function Wheel(props) {

  const { wheel, handleClockWiseClick, handleCounterClockWiseClick } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`cog ${index === wheel ? ' active' : ''}`}
            style={{
              '--i': index,
            }}
          >
            {index === wheel && 'B'}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockWiseClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockWiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  wheel: state.wheel
});

const mapDispatchToProps = dispatch => ({
  handleClockWiseClick: () => {
    dispatch(moveClockwise());
  },
  handleCounterClockWiseClick: () => {
    dispatch(moveCounterClockwise());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Wheel)