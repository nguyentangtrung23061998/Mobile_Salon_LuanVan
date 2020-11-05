import React from 'react';
import Basic from './examples/basic';

const componentMap = {
  Basic,
};

export default function App({
  data,
  rightImage,
  onDelete,
  onSelectService,
  onPressUpdate,
}) {
  const Component = componentMap.Basic;

  return (
    <Component
      data={data}
      rightImage={rightImage}
      onDelete={onDelete}
      onSelectService={onSelectService}
      onPressUpdate={onPressUpdate}
    />
  );
}
