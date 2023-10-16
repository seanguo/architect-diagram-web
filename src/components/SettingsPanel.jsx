import React, { useState, useEffect} from 'react';


export default ({selectedNode, updateSelectedNode}) => {
    if (!selectedNode) {
      return (
        // <table class="w-72 bg-stone-100 border-2 border-t-0 border-stone-400 flex-1 h-full table-auto ">
        //   <thead>
        //     <tr>
        //       <th>Name</th>
        //       <th>Value</th>
        //     </tr>
        //   </thead>
        // </table>
        <div  class='w-72 bg-stone-100 border-2 border-stone-400 flex-1 h-full'>
          <div className="font-semibold">Click a node to edit</div>
        </div>
      )
    }
    return (
      <table class="w-72 bg-stone-100 border-2 border-t-0 border-stone-400 flex-1 h-full table-auto border-separate border-spacing-1">
          <thead>
            <tr>
              <th class="border border-slate-300 h-6">Name</th>
              <th class="border border-slate-300 h-6">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-slate-300 h-6 text-base">ID:</td>
              <td class="border border-slate-300 h-6 text-base">{selectedNode.id}</td>
            </tr>
            <tr>
              <td class="border border-slate-300 h-6 text-base">Name:</td>
              <td class="border border-slate-300 h-6 text-base"><input value={selectedNode.data.name} onChange={(evt) => {
            updateNodeDataField(updateSelectedNode, selectedNode, "name", evt.target.value);
          }} /></td>
            </tr>
            <tr>
              <td class="border border-slate-300 h-6">Position:</td>
              <td class="border border-slate-300 h-6">
                X:<input class="inline w-12" value={selectedNode.position.x}/>
                Y:<input class="inline w-12" value={selectedNode.position.y}/></td>
            </tr>
            <CustomSettings selectedNode={selectedNode} updateSelectedNode={updateSelectedNode} />
            <tr>

            </tr>
          </tbody>
        </table>

      // <div  class='w-72 bg-stone-100 border-2 border-t-0 border-stone-400 p-2 flex-1 flex-row'>
      //   <div className="font-semibold">Attributes editor</div>
      //   <div>
      //     <label>ID:</label>
      //     <input value={selectedNode.id}/>
      //     <br/>
      //     <label>Name:</label>
      //     <input class="border-2 border-stone-400" value={selectedNode.data.name} onChange={(evt) => {
      //       updateNodeDataField(updateSelectedNode, selectedNode, "name", evt.target.value);
      //     }} />
      //     <br/>
      //     <label>Position:</label>
      //     <input class="inline w-12" value={selectedNode.position.x}/>
      //     <input class="inline w-12" value={selectedNode.position.y}/>
      //     <br/>
      //     <CustomSettings selectedNode={selectedNode} updateSelectedNode={updateSelectedNode} />
      //   </div>
      // </div>
    );
  };

  function CustomSettings({selectedNode, updateSelectedNode}) {
    const [inputValue, setInputValue] = useState(selectedNode.data.customSettings)

    useEffect(() => {
      const timer = setTimeout(() => {
        updateNodeDataField(updateSelectedNode, selectedNode, 'customSettings', inputValue);
      }, 500)

      return () => clearTimeout(timer)
    }, [inputValue])

    if (selectedNode.data.type == 'kafka_consumer') {
      return (
        <>
          <CustomSettingItem inputValue={inputValue} setInputValue={setInputValue} label='Topic' itemKey='topic' />
          <CustomSettingItem inputValue={inputValue} setInputValue={setInputValue} label='Consumer Group' itemKey='consumerGroup'/>
        </>
      )
    } else if (selectedNode.data.type == 'kafka_producer') {
      return (
        <>
          <CustomSettingItem inputValue={inputValue} setInputValue={setInputValue} label='Topic' itemKey='topic'/>
        </>
      )
    } else {
      return null;
    }
  }

  function CustomSettingItem({inputValue, setInputValue, label, itemKey}) {
    return (
      <>
        <tr>
              <td class="border border-slate-300 h-6">{label}:</td>
              <td class="border border-slate-300 h-6">
                <input class="border-2 border-stone-400" value={inputValue[itemKey]} onChange={(evt) => {
          setInputValue({[itemKey]: evt.target.value});}} />
             </td>
        </tr>
      </>
    )
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