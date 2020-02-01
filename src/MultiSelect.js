import React from 'react';

const MultiSelect = (props) => {

  return (
    <div>
      <div>
          <h3>{props.selected.length ? 'Your shifts' : 'You have no shifts selected'}</h3>
          <div className='inner'>
            {props.selected.map((shift, n) => (
              <p className='shift' key={n}>{shift.start} - {shift.end}</p>
            ))}
          </div>
        <h3>{props.available.length ? 'Please select an available shift' : 'No available shifts left'}</h3>
        <div className='inner'>
          {props.allShifts.map((option, i) => (
            <p onClick={() => props.onSelectShift(option)}
              className={!option.available ? 'shift disabled' : 'shift'}
              key={i}>
                {option.start} - {option.end}
            </p>
          ))}
        </div>
        <p className='inner shift reset' onClick={() => props.onReset()}>RESET</p>
      </div>
    </div>
  );
}

export default MultiSelect;
