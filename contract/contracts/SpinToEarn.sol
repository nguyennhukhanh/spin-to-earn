// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract SpinToEarn {
    uint256 public ticketPrice = 0.000001 ether; // 0.000001 BNB per ticket
    mapping(address => uint256) public pointsBalance; // Track user points
    mapping(address => uint256) public ticketsBalance; // Track user tickets
    address public owner; // Contract owner/operator

    // Event to log ticket purchase
    event TicketsPurchased(address indexed user, uint256 amount);
    // Event to log reward claim
    event RewardClaimed(address indexed user, uint256 points, uint256 reward);
    // Event to log points assignment by operator
    event PointsAssigned(address indexed user, uint256 points);

    // Modifier to restrict access to the owner (operator)
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Constructor to set the contract owner/operator
    constructor() {
        owner = msg.sender;
    }

    // Assign points to user wallets (called by operator)
    function setPoints(
        address[] calldata users,
        uint256[] calldata points
    ) external onlyOwner {
        require(
            users.length == points.length,
            "Users and points array must have the same length"
        );
        for (uint256 i = 0; i < users.length; i++) {
            pointsBalance[users[i]] = points[i];
            emit PointsAssigned(users[i], points[i]);
        }
    }

    // Buy tickets by sending BNB
    function buyTickets() external payable {
        require(msg.value >= ticketPrice, "Insufficient BNB to buy tickets");

        // Calculate number of tickets based on BNB sent
        uint256 tickets = msg.value / ticketPrice;
        ticketsBalance[msg.sender] += tickets;

        emit TicketsPurchased(msg.sender, tickets);
    }

    // Withdraw rewards based on points
    function withdrawFunds() external {
        uint256 points = pointsBalance[msg.sender];
        require(
            points >= 100,
            "You need at least 100 points to withdraw rewards"
        );

        uint256 reward = points * 0.000000001 ether; // 0.000000001 BNB per point
        require(reward > 0, "Reward is too small");

        // Deduct points after withdrawal
        pointsBalance[msg.sender] = 0;

        // Transfer BNB as reward to the user
        payable(msg.sender).transfer(reward);

        emit RewardClaimed(msg.sender, points, reward);
    }

    // Get user points balance
    function getPoints() external view returns (uint256) {
        return pointsBalance[msg.sender];
    }

    // Fallback function to accept BNB directly
    receive() external payable {}
}
