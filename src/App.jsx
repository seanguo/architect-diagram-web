import React, { useState, useEffect, useRef, useCallback } from 'react';

import Header from './components/Header.jsx';
import MenuBar from './components/MenuBar.jsx';
import StencilPanel from './components/StencilPanel.jsx';
import Canvas from './components/Canvas.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import DataSinkPanel from './components/DataSinkPanel.jsx'

import Drawer from 'rc-drawer';


const DnDFlow = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(true);

  const onSettingsDrawerSwitch = () => {
    setSettingsDrawerOpen(!settingsDrawerOpen);
  }
  
  return (
    <div class="flex flex-col">
      {/* <Header /> */}
      <MenuBar />
      <div class="flex grow flex-row min-h-full h-auto h-max">
        <StencilPanel />
        <Canvas onNodeSelected={setSelectedNode} selectedNode={selectedNode} />
        {/* <Drawer
          width="250px"
          mask={false}
          open={settingsDrawerOpen}
          placement="right"
        > */}
          <div class="flex grow flex-col min-h-full">
            <SettingsPanel selectedNode={selectedNode} updateSelectedNode={setSelectedNode}/>
            <DataSinkPanel selectedNode={selectedNode} />
          </div>
        {/* </Drawer> */}
      </div>
    </div>
  );
};

export default DnDFlow;