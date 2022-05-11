import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import { userAccountState } from 'recoil/userAccount';
import Page from 'Layouts/Page';
import LandingVideo from 'components/landing/LandingVideo';
import LandingSummary from 'components/landing/LandingSummary';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Home: NextPage = () => {
  const [userAccount, setUserAccount] = useRecoilState(userAccountState);

  const getUserInfo = async () => {
    try {
      const account = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (account) {
        setUserAccount(account[0]);
      }
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        getUserInfo();
      });
      getUserInfo();
    } else {
      alert('Install Metamask! https://metamask.io/download/');
    }
  }, []);

  return (
    <>
      <Page>
        <LandingVideo />
        <LandingSummary />
      </Page>
    </>
  );
};

export default Home;
