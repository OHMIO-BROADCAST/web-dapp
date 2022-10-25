// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Avatar,
  Box, Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Stack, Text, useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { useMoralis } from "react-moralis";


// Custom Icons
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import NativeBalance from "components/NativeBalance";
import { ItemContentProfile } from "components/Menu/ItemContentProfile";
import Swal from "sweetalert2";

export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { Moralis, isAuthenticated, account } = useMoralis();

  const { colorMode } = useColorMode();

  // Chakra Color Mode
  /*  let navbarIcon =
     (fixed && scrolled)
       ? useColorModeValue("gray.700", "gray.200")
       : useColorModeValue("white", "gray.200"); */

  let navbarIcon = useColorModeValue("white", "gray.200");

  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto", }}
      alignItems='center'
      flexDirection='row'>
      {/* <SearchBar me='18px' /> */}
      {/* <SettingsIcon
        cursor='pointer'
        ms={{ base: "16px", xl: "0px" }}
        me='16px'
        onClick={props.onOpen}
        color={navbarIcon}
        w='18px'
        h='18px'
      /> */}

      <Chains />
      {/*  <TokenPrice
        address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
        chain="eth"
        image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
        size="40px"
      /> */}
      {/* <NativeBalance /> */}

      <Account me='16px' />
      <Menu>
        <MenuButton marginLeft={'1rem'}>
          <BellIcon color={navbarIcon} w='18px' h='18px' />
        </MenuButton>
        <MenuList p='16px 8px' bg={menuBg}>
          <Flex flexDirection='column'>
            <MenuItem borderRadius='8px' mb='10px'>
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius='8px' mb='10px'>
              <ItemContent
                time='2 days ago'
                info='by Josh Henry'
                boldInfo='New Album'
                aName='Josh Henry'
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius='8px'>
              <ItemContent
                time='3 days ago'
                info='Payment succesfully completed!'
                boldInfo=''
                aName='Kara'
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton marginLeft={'1rem'}>
          <Avatar color={navbarIcon} w='2.3rem' h='2.3rem' me='0px' />
        </MenuButton>
        <MenuList p='16px 8px' bg={menuBg}>
          <Flex flexDirection='column'>
            <MenuItem borderRadius='8px' mb='10px'>
              <ItemContentProfile
                boldInfo='Profile'
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius='8px' mb='10px'>
              <ItemContentProfile
                boldInfo='Settings'
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius='8px'
              onClick={async () => {
                await Moralis.User.logOut()
                  .then(() => {
                    Swal.fire("Log Out Success", '', 'info')
                  });
                console.log('User Logout')
                window.location.reload()
              }}>
              <ItemContentProfile
                boldInfo='Log Out'
                aSrc={avatar3}

              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>


      <SidebarResponsive
        hamburgerColor={"white"}
        logo={
          <Stack direction='row' spacing='12px' align='center' justify='center'>
            {colorMode === "dark" ? (
              <ArgonLogoLight w='74px' h='27px' />
            ) : (
              <ArgonLogoDark w='74px' h='27px' />
            )}
          </Stack>
        }
        /* logo={
          <Stack direction='row' spacing='12px' align='center' justify='center'>
            {colorMode === "dark" ? (
              <ArgonLogoLight w='74px' h='27px' />
            ) : (
              <ArgonLogoDark w='74px' h='27px' />
            )}
            <Box
              w='1px'
              h='20px'
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w='82px' h='21px' />
            ) : (
              <ChakraLogoDark w='82px' h='21px' />
            )}
          </Stack>
        } */
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />


    </Flex >
  );
}