import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Home(props) {
    // Use it for transaction Data
    const [transactions, setTransactions] = useState([]);
    // Use for balance
    const [balance, setBalance] = useState();
    // Use for asset
    const [asset, setAsset] = useState();
    // Use it to fetch stock Data
    const [stockData, setStockData] = useState([]);
    // Use it to set the current state of the items typed
    const [stock, setStock] = useState({});
    // Use it to detect whether modal is open
    const [showModal, setShowModal] = useState(false);
    const [currentStockPrice, setCurrentStockPrice] = useState();

    useEffect(() => {
      const response = { status: 200 }
      if(response.status !== 200){
        redirectToLogin()
      };

     
    useEffect(() => {
      const result = getStockPrice();
      setCurrentStockPrice(result);
    }, [stock.stockCode])


    //   useEffect(() => {
    //     // eslint-disable-next-line no-unused-expressions
    //     (async () => {
    //       await getBalance();
    //     })
    //   }, [])

    // const getBalance = async () => {
    //   return axios.get('');
    // }

    // const getTransactions = async () => {
    //   return axios.get('');
    // }

  const redirectToLogin = () => {
      props.history.push('/');
  }

  const logoutHandler = () => {
      localStorage.removeItem('login_access_token');
      redirectToLogin();
  }

  const handleSubmitStock = () => {
    console.log('handleSubmitStock', stockData);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }


  // to get stock price
  const getStockPrice = () => {
    const hasStockCode = stockData.filter(i => i.stockCode === stock.stockCode);
    if (hasStockCode.length > 0) {
      return hasStockCode[0].price;
    }
    return null;
  }

  // const onPurchaseStock = () => {
  //   var today = new Date();
  //   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  //   const newTransaction = {
  //     date: date,   
  //     stockCode: stock.stockCode,
  //     price: stock.price,
  //     quantity: stock.qty,
  //     amount: stock.price * stock.qty,
  //     purchase: "Y",
  //     balance: balance - stock.qty * stock.price
  //   };

    // set Asset -> add asset into list of asset, else change the number of shares
    // setAsset = ([]);
    // Call endpoint for creating new transaction record in db
    // After previous call is completed, call endpoint to get updated list of transaction
    setTransactions([...transactions, newTransaction]);
    // Call endpont to get new balance
    setBalance(balance - newTransaction.amount);
    setShowModal(false);
  }

  const assetsHandler = () => {
    localStorage.removeItem('login_access_token');
    props.history.push('/assets');
  }

  const onSellStock = () => {
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const newTransaction = {
      date: date,
      stockCode: stock.stockCode,
      price: stock.price,
      quantity: stock.qty,
      amount: stock.price * stock.qty,
      purchase: "N",
      balance: balance - stock.qty * stock.price
    }

    // set Asset -> add asset into list of asset, else change the number of shares
    // setAsset = ([]);
    // Call endpoint for creating new transaction record in db
    // After previous call is completed, call endpoint to get updated list of transaction
    setTransactions([...transactions, newTransaction]);
    // Call endpont to get new balance
    setBalance(balance - newTransaction.amount);
    setShowModal(false);
  }

  const handleChange = (e) => {
    const {name , value} = e.target;
    setStock(prevState => ({
        ...prevState,
        [name] : value
    }))
  }

//   const payload = {
//     "email": state.email,
//     "password": state.password
// }

  // Post transaction
  //  axios.post('https://849rs099m3.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/add', transactions, payload, {
  //    headers: {
  //        'x-api-key': `Jkx76CEYnp3NaTpwSXceo4ONDFLJNZcA717hzo1m`
  //      }
  //    })
  //    .then(res => {
  //        if (res.status !== 200) {
  //            throw new Error('Payload not posted!');
  //        }                
  //        alert('Transaction is successful!')
  //        redirectToHome();
  //    })
  //    .catch(err => {
  //        console.log(err);
  //    }) 
      
  //   Get Account Number
  //   const getAssetBalance = () => {
  //       axios.post('', payload, {
  //           headers: {
  //               'x-api-key': ``
  //           }
  //       })
  //           .then(res => setAsset(res)
  //           .catch(err => console.log(err))
  //   }

  //   Get Asset Price
  //   const getStockData = () => {
  //       axios.post('https://849rs099m3.execute-api.ap-southeast-1.amazonaws.com/techtrek/pricing/current', payload, {
  //           headers: {
  //               'x-api-key': `Jkx76CEYnp3NaTpwSXceo4ONDFLJNZcA717hzo1m`
  //           } 
  //       })
  //           .then(res => setStockData(res)
  //           .catch(err => console.log(err))
  //   }
    

    return(
      <>
        <div className="mt-2">
          <div className="row">
            <div> Balance: ${balance}</div>
            <button type="button" class="btn btn-primary" onClick={toggleModal}>Buy or Sell Stocks</button>
            <button type="button" class="btn btn-secondary" onClick={assetsHandler}>Check Assets</button>
            <button onClick={logoutHandler}>Logout!</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Stock Code</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Amount</th>
                <th scope="col">Purchase?</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(({date, stockCode, price, qty, amount, purchase, balance }) => (
                <tr>
                  <td>{date}</td>
                  <td>{stockCode}</td>
                  <td>{price}</td>
                  <td>{qty}</td>
                  <td>{amount}</td>
                  <td>{purchase}</td>
                  <td>${balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="modal" tabindex="-1" style={showModal ? {display: 'block'} : {display: 'none'}}>
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Purchase Stocks</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <label for="stock">Stock Code: </label>
                    <input type="text" name="stockCode" onChange={handleChange} /><small>Balance: ${balance}</small><br></br>
                    <label for="price">Order Type: </label>
                    <input type="number" required name="price" onChange={handleChange} /> <br></br>
                    <label for="price">assetAmount: </label>
                    <input type="number" required name="assetAmount" onChange={handleChange} /><small>Current Price: ${currentAssetPrice}</small><br></br>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onTransact()}>Transact</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default withRouter(Transact);
