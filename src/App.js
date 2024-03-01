import React, { useState } from "react";
import axios from "axios";

function App() {
  const [auctionNo, setAuctionNo] = useState(0);
  const [subscriberName, setSubscriberName] = useState("");
  const [auctionDate, setAuctionDate] = useState("");
  const [poolOfFundsFromCollection, setPoolOfFundsFromCollection] = useState(0);
  const [prizedAmount, setPrizedAmount] = useState(0);

  console.log("auctionDate", auctionDate);

  const handleCalculate = () => {
    // Prepare the data in the specified JSON format
    const requestData = {
      AuctionNo: auctionNo,
      SubscriberName: subscriberName,
      AuctionDate: auctionDate,
      PoolOfFundsFromCollection: poolOfFundsFromCollection,
      PrizedAmount: prizedAmount,
    };

    // Trigger the API POST request with user inputs
    axios
      .post("https://be-chitfund-1.onrender.com/addAuction", requestData)
      .then((response) => {
        console.log("Auction data added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding auction data:", error);
      });
  };

  return (
    <div>
      <h2>Auction Data Input</h2>
      <div>
        <label>Auction No:</label>
        <input
          type="number"
          value={auctionNo}
          onChange={(e) => setAuctionNo(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Subscriber Name:</label>
        <input
          type="text"
          value={subscriberName}
          onChange={(e) => setSubscriberName(e.target.value)}
        />
      </div>
      <div>
        <label>Auction Date:</label>
        <input
          type="date"
          value={auctionDate}
          onChange={(e) => setAuctionDate(e.target.value)}
        />
      </div>
      <div>
        <label>Pool of Funds from Collection:</label>
        <input
          type="number"
          value={poolOfFundsFromCollection}
          onChange={(e) =>
            setPoolOfFundsFromCollection(parseInt(e.target.value))
          }
        />
      </div>
      <div>
        <label>Prized Amount:</label>
        <input
          type="number"
          value={prizedAmount}
          onChange={(e) => setPrizedAmount(parseInt(e.target.value))}
        />
      </div>
      <button onClick={handleCalculate}>Submit</button>
    </div>
  );
}

export default App;
