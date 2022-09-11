type LispSymbol = string
type LispList = Array<LispList | LispAtom>
type LispNumber = number

type LispAtom = LispNumber | LispSymbol

class LispInterpreter {

    tokenize(program: string): string[] {
        return program.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);
    }

    readFromTokens(tokens: string[]): LispList | LispAtom {
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

    parse(program: string) {
        return this.readFromTokens(this.tokenize(program));
    }

    atom(token: unknown): LispAtom {
        const number = Number(token);
        if (isNaN(number)) {
            return token as LispSymbol;
        } else {
            return number;
        }
    }

    eval(expression: LispList, environment = globalEnvironment) {
        if(typeof expression === "string") {
            const env = environment.findEnvironment(expression);
            return env[expression];
        }
    }
}