import React, { Component } from 'react';

class MultiSelect extends Component {

  constructor(props) {
    super(props)

    this.state = {
      available: [],
      unavailable: [],
      selected: [],
      allShifts: [],
    }
  }

  selectShift(option) {

    if(!option.available) {
      console.log('shift not available');
      return;
    }

    const newSelected = [...this.state.selected, option];

    const { all, validFormatted, notAvailableFormatted } = this.getAvailableShifts(newSelected, this.props.globalShiftList);

    this.setState({
      allShifts: all,
      available: validFormatted,
      unavailable: notAvailableFormatted,
      selected: newSelected.sort((a, b) => {
        return a.start - b.start;
      }),
    });

  }

  UNSAFE_componentWillMount() {
    this.reset();
  }

  getAvailableShifts = (userShifts, globalShiftList) => {

    const invalid = [];

    userShifts.forEach((uShift) => {
      const uStart = parseInt(uShift.start);
      const uEnd = parseInt(uShift.end);
      globalShiftList.forEach((gShift) => {
        const gStart = parseInt(gShift.start);
        const gEnd = parseInt(gShift.end);

        if (invalid.includes(gShift)) return;

        if (gStart >= uStart && gEnd <= uEnd) {
          invalid.push(gShift);
        }

        if (gEnd > uStart && gEnd <= uEnd) {
          invalid.push(gShift);
        }

        if (gStart < uStart && gEnd > uStart) {
          invalid.push(gShift);
        }

        if (gStart >= uStart && gStart < uEnd) {
          invalid.push(gShift);
        }

      });
    });

    const valid = globalShiftList.filter((shift) => !invalid.includes(shift));
    const notAvailable = globalShiftList.filter((shift) => invalid.includes(shift));

    const validFormatted = valid.map((shift) => ({
      available: true,
      ...shift,
    }));

    const notAvailableFormatted = notAvailable.map((shift) => ({
      available: false,
      ...shift,
    }));

    const all = [...validFormatted, ...notAvailableFormatted].sort((a, b) => {
      return a.start - b.start;
    });

    return {all, validFormatted, notAvailableFormatted};

  };

  reset() {
    console.log('reset');
    const { all, validFormatted, notAvailableFormatted } = this.getAvailableShifts([], this.props.globalShiftList);
    this.setState({
      allShifts: all,
      available: validFormatted,
      unavailable: notAvailableFormatted,
      selected: [],
    });
  }

  render() {
    return (
      <div>
          <h3>{this.state.selected.length ? 'Your shifts' : 'You have no shifts selected'}</h3>
          <div className='inner'>
            {this.state.selected.map((shift, n) => (
              <p className='shift' key={n}>{shift.start} - {shift.end}</p>
            ))}
          </div>
        <h3>{this.state.available.length ? 'Please select an available shift' : 'No available shifts left'}</h3>
        <div className='inner'>
          {this.state.allShifts.map((option, i) => (
            <p onClick={() => this.selectShift(option)}
              className={!option.available ? 'shift disabled' : 'shift'}
              key={i}>
                {option.start} - {option.end}
            </p>
          ))}
        </div>
        <p className='inner shift reset' onClick={() => this.reset()}>RESET</p>
      </div>
    );
  }
};


export default MultiSelect;
