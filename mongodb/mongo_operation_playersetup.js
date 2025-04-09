const express = require('express');
const router = express.Router();
const playerSetupModel = require('./model/player_setup.js');
// Home endpoint
router.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the PlayerSetUp API" });
});

//list display
router.route('/list_player').get(async (req, res) => {
  try {
    const data = await playerSetupModel.find();
    if (data == null || data.length === 0) {
      res.status(404).json({
        status: false,
        message: 'No players found',
        totalResult: null,
        data: data,
      });
    } else {
      res.status(200).json({
        status: true,
        message: 'List players retrieved successfully',
        totalResult: data.length,
        data: data,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'An error occurred while retrieving Members',
      error: err.message,
    });
  }
});


// Create a new member
router.route('/create_player').post(async (req, res) => {
  try {
    const {id_tnm,customer_name,customer_number,customer_name_full,round,machine, fee,remark,available ,play_count} = req.body;
    const newmember = new playerSetupModel({id_tnm,customer_name,customer_number,customer_name_full,round,machine, fee,remark,available ,play_count});
    // Save the new display to the database
    await newmember.save();
    res.status(201).json({
      status: true,
      message: 'Create new member successfully',
      data: newmember,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'An error occurred while creating the display',
      error: err.message,
    });
  }
});

// Update a display by its _id
router.route('/update_player/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name,customer_number,customer_name_full,round,machine, fee,remark,available ,play_count } = req.body;
    // Find the display by _id and update its fields
    const updatedDisplay = await playerSetupModel.findByIdAndUpdate(id, {customer_name,customer_number,customer_name_full,round,machine, fee,remark,available ,play_count }, { new: true });
    if (!updatedDisplay) {
      return res.status(404).json({
        status: false,
        message: 'Player not found',
        data: null,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Member updated successfully',
      data: updatedDisplay,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'An error occurred while updating the display',
      error: err.message,
    });
  }
});

// DELETE route to delete a round by its _id
router.delete('/delete_player/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRound = await playerSetupModel.findByIdAndDelete(id);
    if (!deletedRound) {
      return res.status(404).json({
        status: false,
        message: 'Member not found'
      });
    }
    res.status(200).json({
      status: true,
      message: 'Member deleted successfully',
      data: deletedRound
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'An error occurred while deleting the round',
      error: err.message
    });
  }
});


router.route('/filter_player').get(async (req, res) => {
  try {
    const { remark, fee, round, machine, available } = req.query;

    let filter = {};

    if (remark) filter.remark = { $regex: new RegExp(remark, 'i') }; // Case-insensitive search
    if (fee) filter.fee = fee; // Exact match
    if (round) filter.round = Number(round); // Convert to Number
    if (machine) filter.machine = Number(machine); // Convert to Number
    if (available !== undefined) filter.available = available === 'true'; // Convert string to boolean

    const data = await playerSetupModel.find(filter);

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No players found with the given filters',
        totalResult: 0,
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: 'Filtered players retrieved successfully',
      totalResult: data.length,
      data: data,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'An error occurred while retrieving Members',
      error: err.message,
    });
  }
});

//export router for use
module.exports = router;
