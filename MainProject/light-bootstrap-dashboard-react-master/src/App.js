import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Dashboard from "views/Dashboard";
import routes from "routes.js";
import {createStore} from 'redux';
// createStore : state값을 저장시키는 역활
import {Provider} from 'react-redux';
import sidebarImage from "assets/img/sidebar-3.jpg";
function reducer(currentState,action){
    if(currentState === undefined){
      return{
        alertCount:0,
      };
    }
    if(action.type =='alertCount'){
      currentState.alertCount++;
    }
    return {...currentState};
  }
  
const store = createStore(reducer);
function App(){
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);
    const location = useLocation();
    const mainPanel = React.useRef(null);


    // const getRoutes = (routes) => {
    //   console.log('get routes',routes)
    //   return routes.map((prop, key) => {
    //     if (prop.layout === "/admin") {
    //       return (
    //         <Route
    //           path={prop.layout + prop.path}
    //           render={(props) => <prop.component {...props} />}
    //           key={key}
    //         />
    //       );
    //     } else {
    //       return null;
    //     }
    //   });
    // };


    React.useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
      if (
        window.innerWidth < 993 &&
        document.documentElement.className.indexOf("nav-open") !== -1
      ) {
        document.documentElement.classList.toggle("nav-open");
        var element = document.getElementById("bodyClick");
        element.parentNode.removeChild(element);
      }
    }, [location]);
    return (
      <>
       <Provider store={store}>
        <div className="wrapper">
          {/* <Sidebar color={color} image={hasImage ? image : ""} routes={routes} /> */}
          <div className="main-panel" ref={mainPanel}>
            {/* <AdminNavbar /> */}
            <div className="content">
                <Dashboard/>
              {/* <Switch>{getRoutes(routes)}</Switch> */}
            </div>
            <Footer />
          </div>
        </div>
        {/* <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color) => setColor(color)}
          image={image}
          setImage={(image) => setImage(image)}
        /> */}
        </Provider>
      </>

    );
}

export default App;