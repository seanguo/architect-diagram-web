import React, { useState, useEffect} from 'react';


export default ({selectedNode, updateSelectedNode}) => {
    if (!selectedNode) {
      return (
        <div  class='w-72 bg-white border-2 border-stone-400 flex-1 h-full'>
          <div className="font-semibold">Attributes editor</div>
        </div>
      )
    }
    return (
      <div  class='w-72 bg-white border-2 border-stone-400 p-2 flex-1'>
        <div className="font-semibold">Attributes editor</div>
        <div>
          <label>ID:</label>
          <input value={selectedNode.id}/>

          <label>Name:</label>
          <input class="border-2 border-stone-400" value={selectedNode.data.name} onChange={(evt) => {
            updateNodeDataField(updateSelectedNode, selectedNode, "name", evt.target.value);
          }} />

          <CustomSettings selectedNode={selectedNode} updateSelectedNode={updateSelectedNode} />
        </div>
      </div>
    );
  };

  function CustomSettings({selectedNode, updateSelectedNode}) {
    const [inputValue, setInputValue] = useState(selectedNode.data.consumerGroup)

    useEffect(() => {
      const timer = setTimeout(() => {
        updateNodeDataField(updateSelectedNode, selectedNode, "consumerGroup", inputValue);
      }, 500)

      return () => clearTimeout(timer)
    }, [inputValue])

    if (selectedNode.data.type == 'kafka_consumer') {
      return (
        <>
          <label>Consumer Group:</label>
          <input class="border-2 border-stone-400" value={inputValue} onChange={(evt) => {
            setInputValue(evt.target.value);
          }} />
        </>
      )
    } else {
      return null;
    }
  }

  function updateNodeDataField(updateNodeFunc, selectedNode, field, value) {
    let node = {
      ...selectedNode,
      "data": {
        ...selectedNode.data,
        [field]: value,
      }
    }
    updateNodeFunc(node);
  }