  import './App.css';
  import {useEffect} from "react";
  import {useTelegram} from "./hooks/useTelegram";
  import Header from "./сomponents/Header/Header";
  import {Route,Routes} from "react-router-dom";
  import ProductList from "./сomponents/ProductList/ProductList";
  import Form from "./сomponents/Form/Form";
  function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
      tg.ready();
    }, []);
    const onClose = () =>{
      tg.close()
    }
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<ProductList />}/>
          <Route path={'form'} element={<Form />}/>
        </Routes>
      </div>
    );
  }

  export default App;
