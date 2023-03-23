export default class Level {
    structure: Array<Array<string>>;
    colorMap: any

    constructor(context: CanvasRenderingContext2D,array: Array<Array<string>>) {
        this.structure = array
        this.colorMap = {
            R: 'red',
            O: 'orange',
            G: 'green',
            Y: 'yellow',
            // '': 'transparent'
        }
        console.log(context)
    }
}