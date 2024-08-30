import axios from "axios";
import Record from "../models/record.model.js";
import Operation from "../models/operation.model.js";
import User from "../models/user.model.js";

export const getRecords = async (req, res) => {
  const records = await Record.find({
    user_id: req.user.id,
    isDeleted: false,
  });
  res.json(records);
};

export const saveRecord = async (req, res) => {
  try {
    const { type, values } = req.body;

    if (type !== "random_string") {
      if (!Array.isArray(values) || values.length === 0) {
        return res
          .status(400)
          .json({ message: "You must provide at least one number." });
      }
    }

    if (!values.every((val) => typeof val === "number")) {
      return res.status(400).json({ message: "All values ​​must be numbers." });
    }

    const operation = await Operation.findOne({ type });

    if (!operation)
      return res.status(404).json({ message: "Operation not found" });

    let result;

    switch (type) {
      case "addition":
        result = values.reduce((acc, val) => acc + val, 0);
        break;
      case "subtraction":
        result = values.reduce((acc, val) => acc - val);
        break;
      case "multiplication":
        result = values.reduce((acc, val) => acc * val, 1);
        break;
      case "division":
        result = values.reduce((acc, val) => acc / val);
        break;
      case "square_root":
        if (values.length !== 1) {
          return res.status(400).json({
            message: "Only one value is required for the square root.",
          });
        }
        result = Math.sqrt(values[0]);
        break;
      case "random_string":
        try {
          if (!values || values.length !== 2) {
            return res
              .status(400)
              .json({ message: "Error: Exactly two values are required" });
          }

          const min = Math.min(values[0], values[1]);
          const max = Math.max(values[0], values[1]);

          const randomResponse = await axios.get(
            `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
          );
          result = randomResponse.data; // Procesa la respuesta para obtener la cadena
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error generating random string" });
        }
        break;
      default:
        return res.status(400).json({ message: "Invalid transaction type" });
    }

    const user = await User.findById(req.user.id);
    if (user.balance < operation.cost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= operation.cost;
    await user.save();

    const newRecord = new Record({
      operation_id: operation._id,
      user_id: user._id,
      amount: operation.cost,
      user_balance: user.balance,
      operation_response: result,
      date: new Date(),
    });

    await newRecord.save();

    console.log(newRecord);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Record not found" });

  res.json(record);
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    record.isDeleted = true;
    await record.save();

    res.json({ message: "Record marked as deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; //SoftDelete

export const updateRecord = async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!record) return res.status(404).json({ message: "Record not found" });

  res.json(record);
};

/*
export const createRecord = async (req, res) => {
  const { operation_id, amount, user_balance, operation_response } =
    req.body;
  const newRecord = new Record({
    operation_id,
    user_id: req.user.id,
    amount,
    user_balance,
    operation_response,
  });
  const savedRecord = await newRecord.save();
  res.json(savedRecord);
};
*/
