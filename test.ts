import { LispInterpreter } from "./interpreter"

let lispInterpreter: LispInterpreter;

describe("lisp interpreter tests", () => {

    beforeEach(() => {
        lispInterpreter = new LispInterpreter();
    });
    it("should evaluate (+ 1 2) into 3", () => {
        const code = "(+ 1 2)";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(3);
    });
    it("should evaluate (+ (* 3 5) (- 10 6)) into 19", () => {
        const code = "(+ (* 3 5) (- 10 6))";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(19);
    });
    it("should evaluate (car (cons 1 (cons 2 (cons 3)))) into 1", () => {
        const code = "(car (cons 1 (cons 2 (cons 3))))";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(1);
    });
    it("should evaluate  into ", () => {
        const code = "(if (< 10 20) 10 20)";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(10);
    });
    it("should evaluate (if (< 10 20) 10 20) into 10", () => {
        const code = "(if (< 10 20) 10 20)";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(10);
    });
    it("should evaluate (begin (define r 3) (* 3.14 (* r r))) into 28.26", () => {
        const code = "(begin (define r 3) (* 3.14 (* r r)))";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(28.26);
    });
    it("should evaluate (begin (define twice (lambda (x) (* 2 x))) (twice 13)) into 26", () => {
        const code = "(begin (define twice (lambda (x) (* 2 x))) (twice 13))";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(26);
    });
    it("should evaluate  into 28.26", () => {
        const code = "(begin (define r 3) (set! r 6) (* 3.14 (* r r)))";
        const parsed = lispInterpreter.parse(code);
        const evaluated = lispInterpreter.evaluate(parsed);
        expect(evaluated).toEqual(113.04);
    });
})