import HomePage from "./pages/HomePage";

function App() {
  return (
    <div
      //
      className="flex justify-center"
      style={{ background: "linear-gradient(45deg, #3498db, #e74c3c)" }}
    >
      {/* <div className="w-screen">
        <HomePage />
      </div> */}
      {/* <div className="w-screen max-w-[50%]"> */}
      <div className="w-screen md:w-full lg:max-w-[50%]">
        <HomePage />
      </div>
    </div>
    
  );
}

export default App;
