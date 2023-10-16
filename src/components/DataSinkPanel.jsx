import React, { useState, useEffect} from 'react';


export default ({selectedNode}) => {
    var message;
    if (selectedNode && selectedNode.data.messages.length > 0) {
        message = selectedNode.data.messages[0];
    }
    return (
        <div  class='w-72 bg-stone-100 border-2 border-t-0 border-stone-400 flex-1 h-full'>
            <div className="font-semibold">Data Received:</div>
            <div className="text-gray-800">
                {message}
            </div>
        </div>
    )
}