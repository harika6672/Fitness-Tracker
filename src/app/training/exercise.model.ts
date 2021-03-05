export interface Excersice{
    id:string;
    name:string;
    calories:number;
    duration: number;
    state?:'completed'|'cancelled'|null;
    date?:Date;
}