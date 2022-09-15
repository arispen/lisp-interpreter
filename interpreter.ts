import { LispEnvironment } from "./environment"

export type LispSymbol = string;
export type LispNumber = number;
export type LispAtom = LispNumber | LispSymbol;
export type LispList = Array<LispList | LispAtom>;
export type LispExpression = LispAtom | LispList;

export class LispInterpreter {

    private globalEnvironment: LispEnvironment;

    constructor() {
        this.globalEnvironment = new LispEnvironment()
    }

    private tokenize(program: string): string[] {
        return program.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);
    }

    private readFromTokens(tokens: string[]): LispExpression {
        let syntax: LispList | LispAtom = [];
        if (tokens.length === 0) {
            console.error("Unexpected EOF while reading");
        }
        const token = tokens.shift();
        if (token === '(') {
            const expression: LispList = [];
            while (tokens[0] !== ')') {
                expression.push(this.readFromTokens(tokens) as LispAtom);
            }
            tokens.shift();
            syntax = expression;
        }
        else {
            if (token === ')') {
                console.error("Unexpected )");
            } else {
                syntax = this.atom(token);
            }
        }
        return syntax;
    }

    public parse(program: string): LispExpression {
        return this.readFromTokens(this.tokenize(program));
    }

    private atom(token: unknown): LispAtom {
        const number = Number(token);
        if (isNaN(number)) {
            return token as LispSymbol;
        } else {
            return number;
        }
    }

    public evaluate(expression: LispExpression, environment?: LispEnvironment): number | Function | void {
        environment = environment || this.globalEnvironment;
        if (typeof expression === "string") {
            const env = environment.findEnvironment(expression);
            return env.get(expression);
        } else if (typeof expression === "number") {
            return expression;
        } else if (expression[0] === "if") {
            const [_, test, conseq, alt] = expression;
            const exp = test ? conseq : alt;
            return this.evaluate(exp);
        } else if (expression[0] === "define") {
            const [_, varName, exp] = expression;
            environment.set(varName, this.evaluate(exp, environment));
        } else if (expression[0] === "set!") {
            const [_, varName, exp] = expression;
            const variable = environment.findEnvironment(varName as LispSymbol).get(varName);
            environment.set(variable, this.evaluate(exp, environment));
        } else if (expression[0] === "lambda") {
            const [_, params, exp] = expression;
            return (...args: LispAtom[]) => {
                return this.evaluate(exp, new LispEnvironment(params as string[], args, environment));
            };
        } else if (expression[0] === "begin"){
            let result;
            for (let index = 1; index < expression.length; index++) {
                result = this.evaluate(expression[index], environment);
            }
            return result;
        } else {
            const expressions: Function[] = [];

            for (let index = 0; index < expression.length; index++) {
                expressions[index] = this.evaluate(expression[index], environment) as Function;
            }

            const procedure: Function = expressions.shift() as Function;
            return procedure.apply(environment, expressions);
        }
    }
}