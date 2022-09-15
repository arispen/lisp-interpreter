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
