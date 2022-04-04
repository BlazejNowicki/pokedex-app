import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import DetailsView from './containers/DetailsView';
import ListView from './containers/ListView';

function App() {
  return (
    <div className="App bg-secondary">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListView />}></Route>
          <Route path='/details/:id' element={<DetailsView />}></Route>
          {/* TODO: Redirect to /  */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
