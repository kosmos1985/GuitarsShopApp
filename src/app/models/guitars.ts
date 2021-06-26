export interface Guitars {
    sort(arg0: (a: Guitars, b: Guitars) => 0 | 1 | -1): any;

    name: string,
    price: number,
    img?: string,
    id?: number
}
