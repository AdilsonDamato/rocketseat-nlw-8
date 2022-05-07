import { Widget } from "./components/Widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <ToastContainer limit={2} />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl md:text-8xl font-bold">Feedback Widget</h1>
        <p className="text-2xl md:text-4xl">Next Level Week #8</p>
      </div>

      <Widget />
    </>
  );
}
