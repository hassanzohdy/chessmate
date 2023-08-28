import { counterAtom } from "apps/front-office/home/atoms/counter-atom";

export default function UpdateCounterButton() {
  const updateCount = () => {
    counterAtom.update(count => count + 1);
  };

  return <button onClick={updateCount}>Update Counter</button>;
}
