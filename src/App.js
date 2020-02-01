import React, { Component } from 'react';
import './App.css';
import MultiSelect from './MultiSelect';

const globalShiftList = [
	{
		start: '0000',
		end: '2359'
	},
	{
		start: '0600',
		end: '1800'
	},
	{
		start: '0000',
		end: '1200'
	},
	{
		start: '0600',
		end: '1200'
	},
	{
		start: '1800',
		end: '2359'
	},
	{
		start: '0000',
		end: '0600'
	},
	{
		start: '1200',
		end: '2359'
	},
	{
		start: '1200',
		end: '1800'
	}
];


class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			allShifts: globalShiftList,
			available: globalShiftList,
			unavailable: [],
			selected: [],
		}
	}

	selectShift = (option) => {
    if(!option.available) {
      console.log('shift not available');
      return;
    }

		const newSelected = [...this.state.selected, option];

    const { all, validFormatted, notAvailableFormatted } = this.getAvailableShifts(newSelected, globalShiftList);

    this.setState({
      allShifts: all,
      available: validFormatted,
      unavailable: notAvailableFormatted,
      selected: newSelected.sort((a, b) => {
        return a.start - b.start;
      }),
    });

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

    return { all, validFormatted, notAvailableFormatted };

	};

	reset = () => {
    const { all, validFormatted, notAvailableFormatted } = this.getAvailableShifts([], globalShiftList);
    this.setState({
      allShifts: all,
      available: validFormatted,
      unavailable: notAvailableFormatted,
      selected: [],
		});
	}

	UNSAFE_componentWillMount() {
    this.reset();
  }

	render() {
		return (
			<div className='app'>
				<h1>Demo</h1>
				<MultiSelect
					selected={this.state.selected}
					available={this.state.available}
					unavailable={this.state.unavailable}
					allShifts={this.state.allShifts}
					onReset={this.reset}
					onSelectShift={this.selectShift} />
			</div>
		);
	}
}

export default App;
