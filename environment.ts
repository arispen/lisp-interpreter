class LispEnvironment extends Map {
    public outerEnvironment: LispEnvironment;

    constructor(paramDefinitions?: LispSymbol[],
        argsValues?: LispAtom[],
        outerEnvironment?: LispEnvironment) {
        super();
        if (outerEnvironment) {
            this.outerEnvironment = outerEnvironment;
        }
        this.set("+", (a: number, b: number) => a + b);
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

    public findEnvironment(variableName: LispSymbol): LispEnvironment {
        if (this.get(variableName) !== undefined) {
            return this
        } else {
            return this.outerEnvironment.findEnvironment(variableName);
        }
    }
}