export default ({selectedNode, updateSelectedNode}) => {
    if (!selectedNode) {
      return (
        <div  class='w-72 bg-white border-2 border-stone-400'></div>
      )
    }
    return (
      <div  class='w-72 bg-white border-2 border-stone-400'>
        <div className="description">Attributes editor</div>
        <div>
          <label>Name:</label>
          <input placeholder={selectedNode.data.name} onChange={(evt) => {
            let node = {
              ...selectedNode,
              "data": {
                ...selectedNode.data,
                name: evt.target.value,
              }
            }
            updateSelectedNode(node);
          }} />
        </div>
      </div>
    );
  };