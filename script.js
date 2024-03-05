let account = "0x";

async function connect() {
  try {
    const accountList = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accountList[0];
    document.getElementById("acc").innerHTML = account;
  } catch (error) {
    console.log("Error connecting:", error);
  }
}

function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(account);
  const contract = new ethers.Contract(Contract, ABI, signer);
  return contract;
}

const Contract = "0x1AA48D0d9027350446800b59c6B603E49EF3f615";
const ABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "Guest",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "Price",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "Status",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "manger",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_price",
      "type": "uint256"
    }],
    "name": "Set_ticket_price",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "total",
      "type": "uint256"
    }],
    "name": "Buy_ticket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "Entery",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
let price;

async function setTicketPrice() {
   price = document.getElementById('priceInput').value;

  try {
    const contract = getContract();
    const transaction = await contract.Set_ticket_price(price);
    await transaction.wait();
   
    console.log("Ticket Price set successfully");
  } catch (error) {
    console.log("Error:: Price not set yet", error);
  }
}
document.getElementById('price').innerHTML = price;

async function buyTicket() {
  const total = document.getElementById('buyTicketInput').value;
  try {
    const contract = await getContract();
    const Price = await contract.Price(); // Assuming Price is a function in your contract
    const transaction = await contract.Buy_ticket(total, { value: total * Price });
    await transaction.wait();
    alert(`You have bought ${total} tickets for ${total * Price / 1e18} Eth`);
  } catch (err) {
    console.log("error ", err);
  }
}

async function enterEvent() {
  try {
    const contract = await getContract();
    const transaction = await contract.Entery();
    await transaction.wait();
    showMessage('Entered the event successfully', 'success');
  } catch (error) {
    console.log(error);
    showMessage('Failed to Enter The Event', 'danger')
  }
}

async function getContractInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(Contract, ABI, signer);
  return contract;
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.style.display = 'block';

  if (type === 'success') {
    messageDiv.style.backgroundColor = '#d4edda';
    messageDiv.style.color = '#155724';
  } else if (type === 'error') {
    messageDiv.style.backgroundColor = '#f8d7da';
    messageDiv.style.color = '#721c24';
  }

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}
