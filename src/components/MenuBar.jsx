import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default () => {
    const options = [
        'one', 'two', 'three'
      ];
    const defaultOption = options[0];
    // onChange={this._onSelect} 
    return (
        <div class="flex h-12 border-2 border-stone-400 bg-stone-100 p-2">
            <div class="border-1 border-stone-400 basis-1/12 mx-2 h-6 text-stone-500 text-2xl">ArchDiagrams</div> |
            {/* <Dropdown options={options} value={defaultOption} placeholder="Select an option" /> */}
            <MenuButton name='Undo' /> |
            <MenuButton name='Redo' /> |
            <MenuButton name='^' />
        </div>
    );
}

function MenuButton({name}) {
    return (
        <button class="font-semibold underline hover:decoration-dashed border-1 border-stone-400 basis-1/12 mx-2 h-6 hover:bg-teal-500">{name}</button>
    );
}