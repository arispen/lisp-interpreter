# lisp-interpreter

### usage:
```typescript
import { LispInterpreter } from "./interpreter"

const lispInterpreter = new LispInterpreter();

const parsed = lispInterpreter.parse("(+ 1 2)");
const evaluated = lispInterpreter.evaluate(parsed);
console.log(evaluated);
```

### running tests:
```bash
npm t
```
[![Node.js CI](https://github.com/arispen/lisp-interpreter/actions/workflows/node.js.yml/badge.svg)](https://github.com/arispen/lisp-interpreter/actions/workflows/node.js.yml)
