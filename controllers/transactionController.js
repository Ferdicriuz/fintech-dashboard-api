const User = require("../models/User");
const Transaction = require("../models/Transaction");

// ✅ Make sure this is exported as a function
exports.makeTransaction = async (req, res, next) => {
  try {
    const { type, amount } = req.body;
    const userId = req.user._id;

    if (!type || !amount) {
      return res.status(400).json({ message: "Type and amount are required" });
    }

    if (!["credit", "debit"].includes(type)) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let newBalance = user.balance;

    if (type === "debit") {
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      newBalance -= amount;
    } else {
      newBalance += amount;
    }

    user.balance = newBalance;
    await user.save();

    const transaction = await Transaction.create({
      user: user._id,
      type,
      amount,
      balanceAfter: newBalance,
    });

    res.status(201).json({
      success: true,
      transaction,
      currentBalance: newBalance,
    });
  } catch (error) {
    next(error); // send to global error handler
  }
};

// Optional: Get transactions for the logged-in user
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.status(200).json({ count: transactions.length, transactions });
  } catch (error) {
    next(error);
  }
};
