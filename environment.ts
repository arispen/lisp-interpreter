import { LispSymbol, LispAtom, LispNumber, LispList } from "./interpreter";


export class LispEnvironment extends Map {
    public outerEnvironment: LispEnvironment;

    constructor(paramDefinitions?: LispSymbol[],
        argsValues?: LispAtom[],
        outerEnvironment?: LispEnvironment) {
        super();
        this.addStandardEnv();
        if (outerEnvironment) {
            this.outerEnvironment = outerEnvironment;
        }
        if (paramDefinitions && paramDefinitions?.length > 0
            && argsValues && argsValues.length === paramDefinitions.length) {
            this.addArgsToEnv(paramDefinitions, argsValues)
        }
    }

    private addArgsToEnv(
        paramDefinitions: LispSymbol[],
        argsValues: LispAtom[]) {
        for (let index = 0; index < paramDefinitions.length; index++) {
            const param = paramDefinitions[index];
            const arg = argsValues[index];
            this.set(param, arg);
        }
    }

    private addStandardEnv() {
        this.set("+", (a: LispNumber, b: LispNumber) => a + b);
        this.set("-", (a: LispNumber, b: LispNumber) => a - b);
        this.set("/", (a: LispNumber, b: LispNumber) => a / b);
        this.set("*", (a: LispNumber, b: LispNumber) => a * b);
        this.set("=", (a: LispNumber, b: LispNumber) => a === b);
        this.set("<", (a: LispNumber, b: LispNumber) => a < b);
        this.set(">", (a: LispNumber, b: LispNumber) => a > b);
        this.set("<=", (a: LispNumber, b: LispNumber) => a <= b);
        this.set(">=", (a: LispNumber, b: LispNumber) => a >= b);
        this.set("cons", (a: LispAtom | LispList, b: LispAtom | LispList) => [a, b]);
        this.set("car", (a: LispList) => a[0]);
        this.set("cdr", (a: LispList) => a.slice(1));
    }

    public findEnvironment(variableName: LispSymbol): LispEnvironment {
        if (this.get(variableName) !== undefined) {
            return this
        } else if (this.outerEnvironment) {
            return this.outerEnvironment.findEnvironment(variableName);
        } else {
            throw new Error(`variable ${variableName} is not defined`);
        }
    }
}