const getAll = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec();

    if (!docs) {
      return res.status(400).end();
    }

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const getOne = model => async (req, res) => {
  try {
    const doc = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const createOne = model => async (req, res) => {
  const test = {
    address: "3 Hello Ave.",
    city: "San Diego",
    zip: "11100",
    code: "0000"
  };
  try {
    const doc = await model.create(test);
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const updateOne = model => async (req, res) => {
  try {
    const testUpdate = {
      address: "1 Goodbye Ave.",
      city: "San Diego",
      zip: "99900",
      code: "1111"
    };

    const update = await model.findByIdAndUpdate(
      { _id: req.params.id },
      testUpdate,
      { new: true }
    );

    if (!update) {
      res.status(400).end();
    }

    res.status(200).json(update);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findByIdAndDelete({ _id: req.params.id });

    if (!removed) {
      res.status(400).end();
    }

    res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = crudControllers = model => ({
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});
