# lisp-interpreter

```typescript
import { LispInterpreter } from "./interpreter"

const lispInterpreter = new LispInterpreter();

const parsed = lispInterpreter.parse("(+ 1 2)");
const evaluated = lispInterpreter.evaluate(parsed);
console.log(evaluated);
```
