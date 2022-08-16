/* eslint-disable */

import { Card, Timeline, Typography } from "antd";
import React, { useMemo, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Blockie from "../components/Blockie";
import Address from "components/Address/Address";

// Chakra imports
import {
  Flex, Grid
} from "@chakra-ui/react";
import Maps from "./Maps/Maps";
import SuggestConnectWallet from "./Animations/SuggestConnectWallet";
import Item from "./OhmioBox/Item";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
  cardoffline: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis, isAuthenticated, account } = useMoralis();

  const isInchDex = useMemo(
    () => (Moralis.Plugins?.oneInch ? true : false),
    [Moralis.Plugins?.oneInch],
  );

  const [address, setAddress] = useState();

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
        style={styles.cardoffline}
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
            {/* <SuggestConnectWallet /> */}
          </div>

        </Card>
      </Flex>
    );
  }
  else {
    return (
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={10}
      >
        <Flex
          direction="column"
          pt={{ base: "120px", md: "75px" }}
          alignContent="center"
          alignItems="center"
        ><Card
          style={styles.card}
          title={
            <div style={styles.header}>
              <Text>TV Transmitters</Text>
            </div>
          }
        >
            <Item />
          </Card>
        </Flex>
        <Flex
          direction="column"
          pt={{ base: "120px", md: "75px" }}
          alignContent="center"
          alignItems="center"
        ><Card
          style={styles.card}
          title={
            <div style={styles.header}>
              <Text>Radio Transmitters</Text>
            </div>
          }
        >
            <Item />
          </Card>
        </Flex>
      </Grid>
    );
  }

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>To-Do List</Text>
          </>
        }
      >
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text delete style={styles.text}>
              Clone or fork{" "}
              <a
                href="https://github.com/ethereum-boilerplate/ethereum-boilerplate#-quick-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                ethereum-boilerplate
              </a>{" "}
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="💿">
            <Text delete style={styles.text}>
              Install all dependencies: <Text code>npm install</Text>
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🧰">
            <Text delete={isServerInfo} style={styles.text}>
              Sign up for a free account on{" "}
              <a
                href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moralis
              </a>
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="💾">
            <Text delete={isServerInfo} style={styles.text}>
              Create a Moralis Server (
              <a
                href="https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server"
                target="_blank"
                rel="noopener noreferrer"
              >
                How to start Moralis Server
              </a>
              )
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🔏">
            <Text delete={isServerInfo} style={styles.text}>
              Rename <Text code>.env.example</Text> to <Text code>.env</Text>{" "}
              and provide your <Text strong>appId</Text> and{" "}
              <Text strong>serverUrl</Text> from{" "}
              <a
                href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moralis
              </a>
              :
            </Text>
            <Text code delete={isServerInfo} style={{ display: "block" }}>
              REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
            </Text>
            <Text code delete={isServerInfo} style={{ display: "block" }}>
              REACT_APP_MORALIS_SERVER_URL =
              https://xxxxxx.grandmoralis.com:2053/server
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🔁">
            <Text delete={isServerInfo} style={styles.text}>
              Stop the app and start it again <Text code>npm run start</Text>
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="💿">
            <Text delete={isInchDex} style={styles.text}>
              Install{" "}
              <a
                href="https://moralis.io/plugins/1inch/?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                1inch Moralis Plugin
              </a>{" "}
              needed for the<Text code>{"<InchDex />"}</Text> component
              (optional)
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🚀">
            <Text style={styles.text}>BUIDL!!!</Text>
          </Timeline.Item>
        </Timeline>
      </Card>
      <div>
        <Card
          style={styles.card}
          title={
            <>
              💣 <Text strong>Starting Local Chain (optional)</Text>
            </>
          }
        >
          <Timeline mode="left" style={styles.timeline}>
            <Timeline.Item dot="💿">
              <Text style={styles.text}>
                Install{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.npmjs.com/package/truffle"
                >
                  Truffle
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.npmjs.com/package/ganache-cli"
                >
                  ganache-cli
                </a>{" "}
                <Text code>npm install -g ganache-cli truffle</Text>
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="⚙️">
              <Text style={styles.text}>
                Start you local devchain: <Text code>npm run devchain</Text> on
                a new terminal
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="📡">
              <Text style={styles.text}>
                Deploy test contract: <Text code>npm run deploy</Text> on a new
                terminal
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="✅" style={styles.text}>
              <Text>
                Open the 📄<Text strong> Contract</Text> tab
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>
        <Card
          style={{ marginTop: "10px", ...styles.card }}
          title={
            <>
              📡{" "}
              <Text strong> Connecting your Local Chain to the Moralis DB</Text>
            </>
          }
        >
          <Timeline mode="left" style={styles.timeline}>
            <Timeline.Item dot="💿">
              <Text style={styles.text}>
                Download{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/fatedier/frp/releases"
                >
                  frpc
                </a>{" "}
                and provide missing params in the <Text code>.env</Text> file
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="⚙️">
              <Text style={styles.text}>
                Connect your Moralis Database and Local Chain:{" "}
                <Text code>npm run connect</Text>
              </Text>
            </Timeline.Item>
            <Timeline.Item dot="💾">
              <Text style={styles.text}>
                Add contract events you want to watch:{" "}
                <Text code>npm run watch:events</Text>
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    </div>
  );
}
