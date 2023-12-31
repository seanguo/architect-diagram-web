import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useOnSelectionChange,
  addEdge,
} from 'reactflow';

// CSS
import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';

// Mock data
import initialNodes from '../data/nodes.js';
import initialEdges from '../data/edges.js';

// Arch pattern template
import patterns from '../templates/patterns.js'

// Customized components
import ControlPanel from './ControlPanel.jsx';
import DownloadButton from './DownloadButton.jsx'
import CustomNode from './CustomNode.jsx';
import ContextMenu from './ContextMenu.jsx';

// Websocket support
import useWebSocket from 'react-use-websocket';

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `arc_node_${id++}`;
const currentId = () => `arc_node_${id-1}`;

export default ({onNodeSelected, selectedNode}) => {
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
    onMessage: (event) => {
      console.log(event)
      let data = JSON.parse(event.data);
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.source === data.id) {
            edge.animated = false;
          }

          return edge;
        })
      );
      var appended = false;
      setNodes((nds) =>
        nds.map((node) => {
          console.log("processing " + node);
          if (node.id === data.id && !appended) {
            appended = true;
            console.log("appending messages for " + node.id);
            // it's important that you create a new object here
            // in order to notify react flow about the change
            node.data = {
              ...node.data,
              status: data.content.content,
              messages: [...node.data.messages, data.content.content]
              // receivedItems: data.receivedMsg
            };
            console.log("node messages: " + node.data.messages);
          }

          return node;
        })
      );
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const sendCommand = useCallback((params) => {
    sendJsonMessage({
      timestamp: new Date(),
      content:   {
        "type": params.type,
        "source": params.source,
        "target": params.target,
        "params": params.params
      },
      type: 0,
    });
  });
  const connectNode = useCallback((params) => {
    sendJsonMessage({
      timestamp: new Date(),
      id:        "connect1",
      content:   {
        "type": "connect",
        "source": params.source,
        "target": params.target,
        "params": {
          
        }
      },
      type: 0,
    });
    setEdges((eds) => addEdge(params, eds))
  });
  const onConnect = useCallback((params) => {
    connectNode(params);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeExecute = useCallback(
    (nodeId, nodeType) => {
      // event.preventDefault();
      console.log("Node executed: " + nodeId);
      if (nodeType == 'kafka_consumer') {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              console.log("clearing messages for " + nodeId);
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                ...node.data,
                messages: []
                // receivedItems: data.receivedMsg
              };
            }
            return node;
          })
        );
      } else if (nodeType.endsWith('producer')) {
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.source === nodeId) {
              edge.animated = true;
            }

            return edge;
          })
        );
        sendJsonMessage({
          timestamp: new Date(),
          id:        "execute1",
          content:   {
            "type": "execute",
            "target": nodeId,
            "params": {
              
            }
          },
          type: 0,
        });
      }
    }, []
  );

  const createNode = useCallback(
    (type, position) => {
      const nodeId = getId();
      const newNode = {
        id: nodeId,
        type: 'custom',
        position,
        data: { 
          label: `${type} node`,
          name: `${type} node`,
          type: type,
          onClick: () => onNodeExecute(nodeId, type),
          messages:[],
          customSettings: {}
        },
      };
      if (type == 'kafka_consumer') {
        newNode.data.customSettings['consumerGroup'] = "arc_consumer_group";
        newNode.data.customSettings['topic'] = "arc_diagrams";
      } else if (type == 'kafka_producer') {
        newNode.data.customSettings['topic'] = "arc_diagrams";
      }

      setNodes((nds) => nds.concat(newNode));
      sendJsonMessage({
        timestamp: new Date(),
        id:        "test from react",
        content:   {
          "type": "create",
          "target": newNode.id,
          "params": {
            "nodeType": type
          }
        },
        type: 0,
      });
    }
  );
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

      createNode(type, position);
    },
    [reactFlowInstance]
  );

  
  const loadTemplate = useCallback(
    (name) => {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      var x = reactFlowBounds.left - 100;
      var y = reactFlowBounds.top - 80;
      
      patterns.forEach(p => {
        console.log("finding " + name);
        if (name != p.name) {
          return;
        }
        console.log("loading template: " + p.name);
        p.commands.forEach(c => {
          var cmd = c.command;
          var params = cmd.split(" ");
          if (params[0] == 'create') {
            console.log("create node of type " + params[1]);
            const position = reactFlowInstance.project({
              x: params.length > 2 ? params[2] : x,
              y: params.length > 3 ? params[3] : y,
            });
            createNode(params[1], position);
            y = y + 100;
          } else if (params[0] == 'connect') {
            console.log("connecting node " + params[1] + " to " + params[2]);
            connectNode({
              source: params[1],
              target: params[2]
            })
          }
        });
      });
      
    },
    [reactFlowInstance]
  )

  const onControllCommand = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Command executed: " + event);
      const type = 'custom';
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: reactFlowBounds.left,
        y: reactFlowBounds.top,
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
    }, [reactFlowInstance]
  );

  const onSelectionChange = useCallback(({ nodes, edges }) => {
    console.log('changed selection', nodes, edges);
    onNodeSelected(nodes[0]);
  });

  const onNodeClick = useCallback((event, node) => {
    console.log('node clicked', event, node);
    onNodeSelected(node);
  });
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (!selectedNode) {
          return node;
        }
        if (node.id === selectedNode.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            name: selectedNode.data.name,
          };
          if (node.data.customSettings != selectedNode.data.customSettings) {
            sendCommand({
              type: "update",
              target: node.id,
              params: selectedNode.data.customSettings
            });
            node.data = {
              ...node.data,
              customSettings: {
                ...node.data.customSettings,
                ...selectedNode.data.customSettings
              }
            };
          }
        }

        return node;
      })
    );
  }, [selectedNode, setNodes]);

  const [menu, setMenu] = useState(null);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = reactFlowWrapper.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY-30,
        left: event.clientX < pane.width - 200 && event.clientX -300,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu, reactFlowInstance]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

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
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              // onSelectionChange={onSelectionChange}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onNodeContextMenu={onNodeContextMenu}
              nodeTypes={nodeTypes}
              // fitView
              className="bg-teal-50"
              attributionPosition="bottom-left"
            >
              <Controls />
              <MiniMap />
              <DownloadButton />
              {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlow>
          </div>
          
        </ReactFlowProvider>
        <ControlPanel onCommand={loadTemplate} patterns={patterns}/>
      </div>
  );
}