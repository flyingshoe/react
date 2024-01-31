import { Suspense, useEffect, useRef } from "react";
import { mount } from "stockApp/App";

export default function StockApp() {
  const svelteRef = useRef();
  useEffect(() => {
    mount(svelteRef.current);
  }, []);
  return (
    <Suspense fallback={<h1>LOADING...</h1>}>
      <div ref={svelteRef} />
    </Suspense>
  );
}
