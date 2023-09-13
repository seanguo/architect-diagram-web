import React, { useState, useEffect, useRef, useCallback } from 'react';


import StencilPanel from './components/StencilPanel.jsx';
import Canvas from './components/Canvas.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'


const DnDFlow = () => {

  return (
    <div class="flex flex-row min-h-full h-auto h-max">
      <StencilPanel />
      <Canvas />
      <SettingsPanel />
    </div>
  );
};

export default DnDFlow;