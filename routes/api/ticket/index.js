const router = require("express").Router();
const auth = require("../../auth");
const Ticket = require("../../../models/Tickets");
const Notification = require("../../../models/Notifications");
const upload = require("../../../config/upload");

router.get("/", auth.required, (req, res) => {
  Ticket.find({ ...req.query, isDeleted: false })
    .populate("owner", "_id name email")
    .populate("product")
    .populate("order")
    .then((data) =>
      res.status(200).send({
        data,
        message: "Tickets fetched successfully",
        error: false,
      })
    )
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

router.post("/", auth.required, upload, (req, res) => {
  const image = req.data ? req.data.image : null;

  new Ticket({ ...req.body, image: image })
    .save()
    .then((data) =>
      res.status(200).send({
        data,
        message: "Tickets added successfully",
        error: false,
      })
    )
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

router.get("/:id", auth.required, (req, res) => {
  const { id } = req.params;

  Ticket.findById(id)
    .then((data) => {
      if (!data)
        return res.status(404).send({
          data: null,
          message: "Ticket not found",
          error: true,
        });

      return res.status(200).send({
        data,
        message: "Ticket fetched successfully",
        error: false,
      });
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

router.put("/:id", auth.required, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Ticket.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((data) => {
      if (status) {
        new Notification({
          title: "Ticket status changed",
          description: `The status of one of your tickets: ${id} has changed to ${status}`,
          type: 'ticket',
          identifier: id,
          user: data.user,
        })
          .save()
          .then(() => null)
          .catch(() => null);
      }

      return res.status(200).send({
        data,
        message: "Ticket updated successfully",
        error: false,
      });
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

router.delete("/:id", auth.required, (req, res) => {
  const { id } = req.params;

  Ticket.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() =>
      res.status(200).send({
        data: null,
        message: "Ticket deleted successfully",
        error: false,
      })
    )
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

router.post("/add-response/:id", auth.required, (req, res) => {
  const { id } = req.params;

  Ticket.findById(id)
    .then((data) => {
      if (!data)
        return res.status(404).send({
          data: null,
          message: "Ticket not found",
          error: true,
        });

      Ticket.findByIdAndUpdate(
        id,
        { responses: [...data.responses, { ...req.body }] },
        { new: true }
      )
        .then((_data) =>
          res.status(200).send({
            data: _data,
            message: "Response added",
            error: false,
          })
        )
        .catch((err) =>
          res.status(500).send({
            data: null,
            message: err,
            error: true,
          })
        );
    })
    .catch((err) =>
      res.status(500).send({
        data: null,
        message: err,
        error: true,
      })
    );
});

module.exports = router;
