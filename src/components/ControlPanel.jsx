export default ({onCommand}) => {
    return (
        <div class="flex flex-col h-48 border-2 border-stone-400">
            <div class="mx-2 my-1">Type the command to execute</div>
            <div class="flex-row">
                <input class='border-2 border-stone-400 mx-2 my-2 w-96' placeholder="command" onChange={(evt) => {}}/>
                <button onClick={onCommand} class="rounded border-1 border-stone-400 bg-teal-500/50 hover:bg-teal-600/50 shadow-xl text-white">
                    Execute
                </button>
            </div>
        </div>
        
    );
}