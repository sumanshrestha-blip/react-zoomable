import { ZoomableContainer } from "./components/zoomable-container";
import { ZoomableContent } from "./components/zoomable-content";

function App() {
  return (
    <>
      <div className="max-w-md min-h-100 h-100 border p-4 mx-auto">
        <ZoomableContainer>
          <ZoomableContent>Chimtaptak ddum dum</ZoomableContent>
        </ZoomableContainer>
      </div>
    </>
  );
}

export default App;
