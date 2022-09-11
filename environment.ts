class LispEnvironment extends Map {
    public paramDefinitions: LispSymbol[];
    public argsValues: LispAtom[];
    public outerEnvironment: LispEnvironment;

    constructor(paramDefinitions?: LispSymbol[], 
        argsValues?: LispAtom[], 
        outerEnvironment?: LispEnvironment) {
        super();
        this.set("+", (a: number, b: number) => a + b);
        // TODO: set params and args
    }

    findEnvironment(variableName: LispSymbol): LispEnvironment {
        if (this.get(variableName) !== undefined) {
            return this
        } else {
            return this.outerEnvironment.findEnvironment(variableName);
        }
    }
}