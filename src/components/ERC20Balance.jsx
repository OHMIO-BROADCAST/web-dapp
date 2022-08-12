import { useState, useEffect } from 'react';
import Blockie from "../components/Blockie";

import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "../helpers/formatters";
// Chakra imports
import {
  Flex, Text
} from "@chakra-ui/react";
import Card from "../components/Card/Card.js";
import Address from "./Address/Address";
import SuggestConnectWallet from './Animations/SuggestConnectWallet';

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis, account, isAuthenticated, } = useMoralis();

  const [address, setAddress] = useState();

  useEffect(() => {
    setAddress((isAuthenticated && account));
  }, [account, isAuthenticated]);

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "https://etherscan.io/images/main/empty-token.png"}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Token Address (not Wallet Token)",
      dataIndex: "token_address",
      key: "token_address",
      render: (address) => {
        // getEllipsisTxt(address, 5);
        return <Address address={getEllipsisTxt(address, 5)} copyable={true} />
      },
    },
  ];

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
    cardOffline: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: "450px",
      fontSize: "16px",
      fontWeight: "500",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: "auto",
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  if (!address) {
    return (
      <Flex
        direction="column"
        pt={{ base: "120px", md: "75px" }}
        alignContent="center"
        alignItems="center"
      ><Card
        style={styles.cardOffline}
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
            <Text>Please connect Wallet</Text>
            <SuggestConnectWallet />
          </div>

        </Card>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      pt={{ base: "120px", md: "75px" }}
      alignContent="center"
      alignItems="center"
    >
      <Card
        style={styles.card}
        title={
          <div style={styles.header}>
            <h1>💰Token Balances</h1>

          </div>
        }
      >
        <div style={{ width: "65vw", padding: "15px" }}>
          <Skeleton loading={!assets}>
            <Table
              dataSource={assets}
              columns={columns}
              rowKey={(record) => {
                return record.token_address;
              }}
            />
          </Skeleton>
        </div>
      </Card>
    </Flex>
  );
}
export default ERC20Balance;
