export default class Level {
    structure: Array<Array<string>>;
    colorMap: any

    constructor(array: Array<Array<string>>) {
        this.structure = array
        this.colorMap = {
            R: 'element_red_rectangle_glossy',
            G: 'element_green_rectangle_glossy',
            Y: 'element_yellow_rectangle_glossy',
            P: 'element_purple_rectangle_glossy',
            S: 'element_silver_rectangle_glossy',
            B: 'element_blue_rectangle_glossy'
        }
    }
}