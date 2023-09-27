import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div class='flex-none w-72 bg-white border-2 border-stone-400 px-2'>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 my-1 cursor-grab" onDragStart={(event) => onDragStart(event, 'kafka_producer')} draggable>
        Kafka Producer Node
      </div>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 my-1 cursor-grab" onDragStart={(event) => onDragStart(event, 'kafka_server')} draggable>
        Kafka Server Node
      </div>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 my-1 cursor-grab" onDragStart={(event) => onDragStart(event, 'kafka_consumer')} draggable>
        Kafka Consumer Node
      </div>
    </div>
  );
};