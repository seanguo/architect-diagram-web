export default () => {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div  class='w-72 bg-white text-red-300'>
        <div className="description">Attributes editor</div>
        
      </div>
    );
  };