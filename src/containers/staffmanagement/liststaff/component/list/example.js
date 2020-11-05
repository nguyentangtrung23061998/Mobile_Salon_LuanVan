import React, {useState} from 'react';
import list from './examples/list';

const componentMap = {
  list,
};

export default function App({data, onSelectEmployee}) {
  const [mode, setMode] = useState('list');
  const Component = componentMap[mode];

  return <Component data={data} onSelectEmployee={onSelectEmployee} />;
}
