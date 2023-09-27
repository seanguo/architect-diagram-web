export default () => {
    return (
        <div class="flex h-12 border-2 border-stone-400 p-2 font-semibold underline hover:decoration-dashed">
            <button class="border-1 border-stone-400 basis-1/12 mx-2 h-6 hover:bg-teal-500">Undo</button> |
            <button class="border-1 border-stone-400 basis-1/12 mx-2 h-6 hover:bg-teal-500">Redo</button> |
            <button class="border-1 border-stone-400 basis-1/12 mx-2 h-6 hover:bg-teal-500">^</button>
        </div>
    );
}