import React from 'react';
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


function App() {

  return (
    <div className='app'>
      <h1>Demo</h1>
      <MultiSelect
        globalShiftList={globalShiftList} />
    </div>
  );
}

export default App;
