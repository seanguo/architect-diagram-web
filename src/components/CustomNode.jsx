import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import NodeIcon from './NodeIcon';

function CustomNode({ data, selected }) {
  return (
    <div>
    <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      
      <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col">
          <NodeIcon nodeType={data.type} />
          <CustomNodeButton nodeType={data.type} onClick={() => data.onClick(data.type)}/>
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.type}</div>
          <CustomNodeStatus nodeType={data.type} status={data.status} messages={data.messages}/>
        </div>
       
      </div>
      {/* <CustomNodeProgress nodeType={data.type} receivedItems={data.receivedItems} /> */}
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
    </div>
  );
}

// function CustomNodeIcon({ nodeType}) {
//   var iconSrc
//   if (nodeType.startsWith('kafka')) {
//     iconSrc = kafka_server
//   } else if (nodeType.startsWith('rabbit')) {
//     iconSrc = rabbit_producer
//   }
//   return (
//     <img className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100" src={iconSrc} />
//   )
// }

function CustomNodeButton({ nodeType, onClick }) {
  if (nodeType.endsWith('producer')) {
    return (
      <button class="rounded border-1 border-stone-400 bg-teal-500/50 hover:bg-teal-600/50 shadow-xl text-white my-1" onClick={onClick}>
          Send
      </button>
    )
  } else if (nodeType.endsWith('consumer') || nodeType == 'rest_server') {
    return (
      <button class="rounded border-1 border-stone-400 bg-teal-500/50 hover:bg-teal-600/50 shadow-xl text-white my-1" onClick={onClick}>
            Clear
      </button>
    )
  } else {
    return null;
  }
}

// function CustomNodeProgress({ nodeType, receivedItems }) {
//   if (nodeType == 'kafka_consumer') {
//     var items = []
//     if(receivedItems) {
//       for (var item of receivedItems) {
//         items.push(item);
//       }
//     }
//     return (
//       <div class="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
//           {items}
//       </div>
//     )
//   } else {
//     return null;
//   }
// }

function CustomNodeStatus({ nodeType, status, messages }) {
  if (nodeType.endsWith('server')) {
    return (
      <div className="animate-pulse text-gray-00">
            {status}
       </div>
    )
  } else if (nodeType.endsWith('consumer')) {
    const listItems = messages.map(msg => <li>{msg}</li>);
    return (
      <div className="animate-pulse text-gray-00">
            <ul>{listItems}</ul>
       </div>
    )
  } else {
    return (
      <div className="text-gray-800">
            {status}
       </div>
    );
  }
}

export default memo(CustomNode);
