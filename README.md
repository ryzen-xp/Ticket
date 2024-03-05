<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Contract Interface</title>
    <script
    src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
    type="application/javascript"
  ></script>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Ticket Contract Interface</h1>
        <h3 style="color: blue;" id="acc">0x...............</h3>
        <button onclick="connect()">Connect Wallet</button>
        <div>
            <h2>Set Ticket Price</h2>
            <input type="number" id="priceInput" placeholder="Enter Price">
            <button onclick="setTicketPrice()">Set Price (only Manger)</button>
        </div>
        <div>
            <h2>Buy Ticket</h2>
            <input type="number" id="buyTicketInput" placeholder="Enter Number of Tickets">
            <button onclick="buyTicket()">Buy Ticket</button>
            
            <h3>Ticket Price (ETH):</h3><p id="price"></p>
        </div>
        <div>
            <h2>Enter Event</h2>
            <button onclick="enterEvent()">Enter</button>
            
        </div>
        <div id="message"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
