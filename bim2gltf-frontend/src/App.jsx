import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <MainWindow />
      <Footer />
    </>
  )
}

function MainWindow(){
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Waiting for file");
  const [output, setOutput] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (file) {
      setStatus("Converting...");
      // Call the API to convert the file
      fetch('https://localhost:7105/api/conversion', {
        method: 'POST',
        body: file,
      })
        .then(response => response.json())
        .then(data => {
          setOutput(data.output);
          setStatus("Conversion complete");
        })
        .catch(error => {
          console.error('Error:', error);
          setStatus("Error during conversion");
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>
      <p>{status}</p>
      {output && <a href={output}>Download Output</a>}
    </div>
  );
}


function Header(){
  return (
    <header>Bim2Gltf Converter</header>
  )
}

function Footer(){
  return (
    <footer>
      <a href="https://github.com/johnelim/BIM2GLTF">Powered by: Xbim, SharpGLTF and GeometryGym</a>
      </footer>
  )
}

export default App
