import React, { useState} from 'react';
import Dropdown from 'react-dropdown';

export default ({onCommand, patterns}) => {
    const options = [];
    patterns.forEach(p => options.push(p.name));
    const defaultOption = options[0];
    const [selectedPattern, setSelectedPattern] = useState(defaultOption);

    return (
        <div class="flex flex-col h-48 border-2 border-x-0 border-stone-400 bg-stone-50">
            {/* <div class="mx-2 my-1">Type the command to execute</div>
            <div class="flex-row">
                <input class='border-2 border-stone-400 mx-2 my-2 w-96' placeholder="command" onChange={(evt) => {}}/>
                <button onClick={onCommand} class="rounded border-1 border-stone-400 bg-teal-500/50 hover:bg-teal-600/50 shadow-xl text-white">
                    Execute
                </button>
            </div> */}
            <div class="mx-2 my-1">Load a pre-defined pattern</div>
            <div class="flex-row">
                <Dropdown 
                    className='border-1 border-stone-400 mx-2 my-2 w-96'
                    onChange={(option) => setSelectedPattern(option.value)}
                    options={options}
                    value={defaultOption}
                    placeholder="Select an option"
                />
                <button 
                    onClick={() => onCommand(selectedPattern)} 
                    class="mx-2 p-2 rounded border-1 border-stone-400 bg-teal-500/50 hover:bg-teal-600/50 shadow-xl text-white">
                    Load
                </button>
            </div>
        </div>
        
    );
}