/* eslint-disable */
import React, { useEffect } from "react";
import { Form, notification } from "antd";
import { useMemo, useState } from "react";
import Address from "components/Address/Address";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import ContractMethods from "./ContractMethods";
import ContractResolver from "./ContractResolver";



// Chakra imports
import {
  Flex, Text
} from "@chakra-ui/react";
// Custom components
import Card from "../../components/Card/Card.js";
import Blockie from "../Blockie";
import ContractBuyABI from 'contracts/LicencseToken.json';
import OriginalContract from "./OriginalContract";
import SuggestConnectWallet from "components/Animations/SuggestConnectWallet";

export default function Contract() {
  const { Moralis, chainId, isAuthenticated, account } = useMoralis();
  const [responses, setResponses] = useState({});
  const [contract, setContract] = useState();

  const [address, setAddress] = useState();


  const styles = {
    title: {
      fontSize: "30px",
      fontWeight: "600",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: "450px",
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  useEffect(() => {
    setAddress((isAuthenticated && account));
  }, [account, isAuthenticated]);

  if (!address) {
    return (
      <Flex
        direction="column"
        pt={{ base: "120px", md: "75px" }}
        alignContent="center"
        alignItems="center"
      ><Card
        style={styles.card}
        title={
          <div style={styles.header}>
            <Blockie scale={5} avatar currentWallet style />
            <Address size="6" copyable />
          </div>
        }
      >
          <div
            style={{
              width: "auto",
              height: "300px",
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Text>Please Connect Wallet</Text>
            {/* <SuggestConnectWallet /> */}
          </div>

        </Card>
      </Flex>
    );
  }
  else {
    return (
      <Flex
        direction="column"
        pt={{ base: "120px", md: "75px" }}
        alignContent="center"
        alignItems="center"
      >
        <OriginalContract />

      </Flex>
    );
  }
}
