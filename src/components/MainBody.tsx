import MetaMaskSDK from "@metamask/sdk";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const OPERATION_STATE = {
  CONNECT_NOW: "connect-now",
  ADDRESS_LIST: "address-list",
  SHOW_BALANCE: "show-balance",
  INSTALL_META_MASK: "install-meta-mask",
};

const MainBody = () => {
  const [currentState, setCurrentState] = useState("connect-now");
  const [allAddress, setAllAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mainBalance, setMainBalance] = useState("");
  const MMSDK = new MetaMaskSDK();
  const ethereum: any = MMSDK.getProvider();

  useEffect(() => {
    if (!selectedAddress) return;
    const fetchData = async () => {
      try {
        const rowBalance: any = await ethereum.request({
          method: "eth_getBalance",
          params: [selectedAddress, "latest"],
        });
        const balance = ethers.formatEther(rowBalance);
        setMainBalance(balance);
        setCurrentState(OPERATION_STATE.SHOW_BALANCE);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedAddress]);

  const connectByMetaMask = async () => {
    if (ethereum) {
      console.log(ethereum);
      try {
        const addressList: any = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAllAddress(addressList);
        setCurrentState(OPERATION_STATE.ADDRESS_LIST);
      } catch (error) {
        // console.log(error);
      }
    } else {
      setCurrentState(OPERATION_STATE.INSTALL_META_MASK);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <section className="hero">
        <div className="container">
          {[OPERATION_STATE.CONNECT_NOW].includes(currentState) && (
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">Ethereum</h1>
                <p className="hero-paragraph">
                  Connect to your Ethereum wallet and get updated.
                </p>
                <div className="hero-cta">
                  <button
                    className="button button-primary"
                    onClick={connectByMetaMask}
                  >
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          )}
          {[OPERATION_STATE.INSTALL_META_MASK].includes(currentState) && (
            <div className="hero-inner">
              <div className="hero-copy">
                <div className="hero-copy">
                  <img src="images/error_icon.svg" alt="error-icon" />
                  <h3 className="hero-title">Meta Mask Not Found</h3>
                </div>
                <p className="hero-paragraph">
                  Please install Meta Mask for connect to you wallet
                </p>
                <div className="hero-cta">
                  <a
                    className="button button-primary"
                    href="https://metamask.io/download/"
                  >
                    Install Now
                  </a>
                </div>
              </div>
            </div>
          )}
          {[OPERATION_STATE.ADDRESS_LIST].includes(currentState) && (
            <section className="pricing section">
              <div className="container-sm">
                <div className="pricing-inner section-inner">
                  <div className="pricing-tables-wrap">
                    <div className="pricing-table">
                      <div className="pricing-table-inner is-revealing">
                        <div className="pricing-table-main">
                          <div className="pricing-table-features-title text-xs pt-24 pb-24">
                            Select An Address
                          </div>
                          <ul className="pricing-table-features list-reset text-xs">
                            {allAddress.map((address) => (
                              <li>
                                {" "}
                                <button
                                  onClick={() => setSelectedAddress(address)}
                                >
                                  {address}
                                </button>{" "}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {[OPERATION_STATE.SHOW_BALANCE].includes(currentState) && (
            <section className="pricing section">
              <div className="container-sm">
                <div className="pricing-inner section-inner">
                  <div className="pricing-tables-wrap">
                    <div className="pricing-table">
                      <div className="pricing-table-inner is-revealing">
                        <div className="pricing-table-main">
                          <button
                            className="button button-primary"
                            onClick={() => {
                              setCurrentState("address-list");
                              setSelectedAddress("N/A");
                            }}
                          >
                            Back
                          </button>
                          <div className="pricing-table-features-title text-lg pt-24 pb-24">
                            Ethereum
                          </div>
                          <ul className="pricing-table-features list-reset text-lg">
                            Address <br /> {selectedAddress}
                          </ul>
                          <hr />
                          <ul className="pricing-table-features list-reset text-lg">
                            Balance <br /> {mainBalance}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainBody;
