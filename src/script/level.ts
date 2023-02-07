import Brick from './brick'

export default class Level {
    structure: Array<Array<String>>;

    constructor(context: CanvasRenderingContext2D,array: Array<Array<String>>) {
        this.structure = array
        console.log(context)
    }
}