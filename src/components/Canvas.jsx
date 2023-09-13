import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';

// CSS
import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';

// Mock data
import initialNodes from '../data/nodes.js';
import initialEdges from '../data/edges.js';

// Customized components
import ControlPanel from './ControlPanel.jsx';
import DownloadButton from './DownloadButton.jsx'
import CustomNode from '../CustomNode.jsx';

// Websocket support
import useWebSocket from 'react-use-websocket';

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `arc_node_${id++}`;

export default () => {
    const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const socketUrl = 'ws://127.0.0.1:8080/commands';
  // const socketUrl = 'wss://echo.websocket.org';

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    onError: (event) => console.log(event),
    onMessage: (event) => console.log(event),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { 
          label: `${type} node`,
          name: `${type} node`
        },
      };

      setNodes((nds) => nds.concat(newNode));
      sendJsonMessage({
        timestamp: new Date(),
        id:        "test from react",
        content:   "create pod",
        type: 0,
      });
    },
    [reactFlowInstance]
  );

  return (
      <div style={{ width: '100vw', height: '100vh' }} class="grow flex flex-col h-auto">
        <ReactFlowProvider>
          <div className='grow h-auto h-max' ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              className="bg-teal-50"
            >
              <Controls />
              <MiniMap />
              <DownloadButton />
            </ReactFlow>
          </div>
          
        </ReactFlowProvider>
        <ControlPanel />
      </div>
  );
}