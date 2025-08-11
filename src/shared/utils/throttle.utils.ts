export function throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): T {
    let lastCall = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return function(this: any, ...args: any[]) {
      const now = Date.now();
  
      const invoke = () => {
        lastCall = now;
        func.apply(this, args);
      };
  
      if (now - lastCall >= limit) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        invoke();
      } else if (!timeout) {
        timeout = setTimeout(invoke, limit - (now - lastCall));
      }
    } as T;
  }
  