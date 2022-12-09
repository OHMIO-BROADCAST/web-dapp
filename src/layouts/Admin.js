// Chakra imports
import {
  Portal,
  useDisclosure,
  Stack,
  Box,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
} from "components/Icons/Icons";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "../assets/img/admin-background-violeta.png";

import LogoDark from '../assets/img/LogoTIPSparaDark.png';
import LogoLight from '../assets/img/LogoTIPSparaLight.png';
import { useMoralis } from "react-moralis";

import BackgroundDashboard from "components/Animations/Background/BackgroundDashboard";


export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.category === "robots") {
        return getRoutes(prop.views);
      }
      if (prop.category === "distributor") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode



  const { Moralis, isAuthenticated, isInitialized, account } = useMoralis();

  const [address, setAddress] = useState();

  const currentUser = Moralis.User.current();

  useEffect(() => {
    setAddress((isAuthenticated && account));
  }, [account, isAuthenticated]);


  if (isAuthenticated) {

    return (
      <Box>
        <Box
          style={{ height: '100px' }}
          w='100%'
          position='absolute'
          top='0'
        >
          <BackgroundDashboard />
        </Box>
        <Sidebar
          routes={routes}
          logo={
            <Stack direction='row' spacing='10px' align='center' justify='center'>
              {colorMode === "dark" ? (
                <Image src={LogoDark} style={{ width: '10rem', height: 'auto' }} />
              ) : (
                <Image src={LogoLight} style={{ width: '10rem', height: 'auto' }} />
              )}

            </Stack>
          }
          display='none'
          {...rest}
        />
        <MainPanel
          w={{
            base: "100%",
            xl: "calc(100% - 275px)",
          }}>
          <Portal>
            <AdminNavbar
              onOpen={onOpen}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              {...rest}
            />
          </Portal>

          {getRoute() ? (
            <PanelContent>
              <PanelContainer>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from='/admin' to='/admin/dashboard' />
                </Switch>
              </PanelContainer>
            </PanelContent>
          ) : null}

          <Footer />
          <Portal>
            <FixedPlugin
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              onOpen={onOpen}
            />
          </Portal>
          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => {
              setFixed(value);
            }}
          />
        </MainPanel>
      </Box>
    );
  }
  else {
    return (<Redirect from='/admin' to='/auth/signin' />)
  }



}
