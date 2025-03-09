const { v4: uuidv4 } = require("uuid");
const BetForm = require("../models/bet_form.model.js");

const activeTimers = {}; // Store timers for WebSocket rooms

exports.createGoldbet = async (req, res) => {
  console.log("Server started");

  const startTimestamp = Date.now();
  const { Image, touch, bet_stopdate, bet_stoptime, order_enddate, order_endtime, interception, description, category } = req.body;

  if (!Image || !touch || !bet_stopdate || !bet_stoptime || !order_enddate || !order_endtime || !interception || !description || !category) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const endTimestamp = new Date(`${bet_stopdate} ${bet_stoptime}`).getTime();
  if (isNaN(endTimestamp)) {
    return res.status(401).json({ message: "Invalid end date or time" });
  }

  let remainingTime = endTimestamp - startTimestamp;
  if (remainingTime <= 0) {
    return res.status(402).json({ message: "Timer has already ended" });
  }

  const roomID = uuidv4();
  activeTimers[roomID] = true;

  const timerInterval = setInterval(async () => {
    remainingTime = endTimestamp - Date.now();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      delete activeTimers[roomID];
      io.to(roomID).emit("timer_update", { timeLeft: "00:00:00", status: "Ended" });
    } else {
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const betData = await BetForm.findOne({ roomID: roomID });
      if (betData) {
        io.to(roomID).emit("timer_update", { timeLeft: `${hours}:${minutes}:${seconds}`, status: "Running", touch: betData.touch });
      }
    }
  }, 1000);

  try {
    const newBet = await BetForm.create({ Image, touch, bet_stopdate, bet_stoptime, order_enddate, order_endtime, interception, description, category, roomID });
    return res.status(200).json({ message: "Data Added Successfully", data: newBet, roomId: roomID });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
