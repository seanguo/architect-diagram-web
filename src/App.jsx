import React, { useState, useEffect, useRef, useCallback } from 'react';

import Header from './components/Header.jsx';
import MenuBar from './components/MenuBar.jsx';
import StencilPanel from './components/StencilPanel.jsx';
import Canvas from './components/Canvas.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'


const DnDFlow = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  
  return (
    <div class="flex flex-col">
      <Header />
      <MenuBar />
      <div class="flex grow flex-row min-h-full h-auto h-max">
        <StencilPanel />
        <Canvas onNodeSelected={setSelectedNode} selectedNode={selectedNode} />
        <SettingsPanel selectedNode={selectedNode} updateSelectedNode={setSelectedNode}/>
      </div>
    </div>
  );
};

export default DnDFlow;