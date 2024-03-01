import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #121212;
  padding: 20px;
`;

const FormContainer = styled(animated.div)`
  background: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #e0e0e0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #bdbdbd;
`;

const Input = styled.input`
  padding: 10px;
  background: #333;
  color: #e0e0e0;
  border-radius: 5px;
  border: 1px solid #555;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const TableContainer = styled.div`
  color: #e0e0e0;
  overflow-x: auto;
  width: 100%;
  max-width: 800px; // Adjusted for better layout control
`;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 600px;
  width: 100%; // Ensure table uses available width
`;

const Th = styled.th`
  border: 1px solid #555;
  text-align: left;
  padding: 8px;
  background-color: #333;
`;

const Td = styled.td`
  border: 1px solid #555;
  text-align: left;
  padding: 8px;
`;

function App() {
  const [auctionNo, setAuctionNo] = useState(0);
  const [subscriberName, setSubscriberName] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [poolOfFundsFromCollection, setPoolOfFundsFromCollection] = useState(0);
  const [prizedAmount, setPrizedAmount] = useState(0);

  const [auctions, setAuctions] = useState([]);

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const clearFormFields = () => {
    setAuctionNo(0);
    setSubscriberName("");
    setAuctionDate("");
    setPoolOfFundsFromCollection(0);
    setPrizedAmount(0);
  };

  const handleCalculate = () => {
    const requestData = {
      AuctionNo: auctionNo,
      SubscriberName: subscriberName,
      AuctionDate: auctionDate,
      PoolOfFundsFromCollection: poolOfFundsFromCollection,
      PrizedAmount: prizedAmount,
    };

    axios
      .post("https://be-chitfund-1.onrender.com/addAuction", requestData)
      .then((response) => {
        toast.success("Entry added successfully");
        clearFormFields();
        fetchAuctions();
      })
      .catch((error) => {
        console.error("Error adding auction data:", error);
        toast.error("Error adding entry");
      });
  };

  const fetchAuctions = () => {
    axios
      .get("https://be-chitfund-1.onrender.com/auctions")
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching auctions data:", error);
      });
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <Container>
      <FormContainer style={props}>
        <Title>Auction Data Input</Title>
        <InputGroup>
          <Label>Auction No:</Label>
          <Input
            type="number"
            value={auctionNo}
            onChange={(e) => setAuctionNo(parseInt(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <Label>Subscriber Name:</Label>
          <Input
            type="text"
            value={subscriberName}
            onChange={(e) => setSubscriberName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Auction Date:</Label>
          <Input
            type="date"
            value={auctionDate}
            onChange={(e) => setAuctionDate(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Pool of Funds from Collection:</Label>
          <Input
            type="number"
            value={poolOfFundsFromCollection}
            onChange={(e) =>
              setPoolOfFundsFromCollection(parseInt(e.target.value))
            }
          />
        </InputGroup>
        <InputGroup>
          <Label>Prized Amount:</Label>
          <Input
            type="number"
            value={prizedAmount}
            onChange={(e) => setPrizedAmount(parseInt(e.target.value))}
          />
        </InputGroup>
        <Button onClick={handleCalculate}>Submit</Button>
      </FormContainer>
      <TableContainer>
        <Title>Auction List</Title>
        <Table>
          <thead>
            <tr>
              <Th>Auction No</Th>
              <Th>Auction Date</Th>
              <Th>Subscriber Name</Th>
              <Th>Pool of Funds</Th>
              <Th>Cumulative Balance Before Auction</Th>
              <Th>Winning Bid</Th>
              <Th>Prized Amount</Th>
              <Th>Foreman Commission</Th>
              <Th>Wallet Contribution</Th>
              <Th>Cumulative Balance After Auction</Th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction, index) => (
              <tr key={index}>
                <Td>{auction.AuctionNo}</Td>
                <Td>{auction.AuctionDate}</Td>
                <Td>{auction.SubscriberName}</Td>
                <Td>{auction.PoolOfFundsFromCollection}</Td>
                <Td>{auction.CummulativeBalanceBeforeAuction}</Td>
                <Td>{auction.WinningBid}</Td>
                <Td>{auction.PrizedAmount}</Td>
                <Td>{auction.ForemanCommission}</Td>
                <Td>{auction.WalletContribution}</Td>
                <Td>{auction.CummulativeBalanceAfterAuction}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default App;
