export interface FirstInterface {
    field1: string;
    field2: number;
    field3: boolean;
    field4: string[];
    field5: number;
}

// Interfața SecondInterface extinde FirstInterface și este deja exportată
export interface SecondInterface extends FirstInterface {
    field6: object;
    field7: string;
}