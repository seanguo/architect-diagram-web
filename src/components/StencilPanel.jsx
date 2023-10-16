import React from 'react';
import NodeIcon from './NodeIcon';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div class='flex-none w-72 bg-stone-100 border-2 border-t-0 border-stone-400 px-2'>
      <div className="description">Drag to start.</div>
      <DragableNode name="Kafka Producer" type="kafka_producer" onDragStart={onDragStart} />
      <DragableNode name="Kafka Server" type="kafka_server" onDragStart={onDragStart} />
      <DragableNode name="Kafka Consumer" type="kafka_consumer" onDragStart={onDragStart} />
      <DragableNode name="RabbitMQ Producer" type="rabbit_producer" onDragStart={onDragStart} />
      <DragableNode name="RabbitMQ Server" type="rabbit_server" onDragStart={onDragStart} />
      <DragableNode name="Rabbit Consumer" type="rabbit_consumer" onDragStart={onDragStart} />
      <DragableNode name="REST Producer" type="rest_producer" onDragStart={onDragStart} />
      <DragableNode name="REST Server" type="rest_server" onDragStart={onDragStart} />
    </div>
  );
};

function DragableNode({name, type, onDragStart}) {
  return (
    <div className="flex flex-row px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 my-1 cursor-grab" onDragStart={(event) => onDragStart(event, type)} draggable>
      <NodeIcon nodeType={type} />
      {name}
    </div>
  );
}