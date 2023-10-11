import React, { useState, useEffect, useRef, useCallback } from 'react';

import Header from './components/Header.jsx';
import MenuBar from './components/MenuBar.jsx';
import StencilPanel from './components/StencilPanel.jsx';
import Canvas from './components/Canvas.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import DataSinkPanel from './components/DataSinkPanel.jsx'


const DnDFlow = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  
  return (
    <div class="flex flex-col">
      <Header />
      <MenuBar />
      <div class="flex grow flex-row min-h-full">
        <StencilPanel />
        <Canvas onNodeSelected={setSelectedNode} selectedNode={selectedNode} />
        <div class="flex grow flex-col min-h-full">
          <SettingsPanel selectedNode={selectedNode} updateSelectedNode={setSelectedNode}/>
          <DataSinkPanel selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  );
};

export default DnDFlow;