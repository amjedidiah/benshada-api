const router = require("express").Router();
const auth = require("../../auth");
const upload = require("../../../config/upload");
const DeliveryCompanies = require("../../../models/DeliveryCompanies");

router.get("/", auth.required, (req, res) => {
  DeliveryCompanies.find({ ...req.query, isDeleted: false })
    .populate("contactPerson", "_id name email")
    .populate("deliveryPackages")
    .then((data) =>
      res.status(200).send({
        data,
        message: "Delivery Companies fetched successfully",
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

router.post("/", auth.required, (req, res) => {
  new DeliveryCompanies({ ...req.body })
    .save()
    .then((data) =>
      res.status(200).send({
        data,
        message: "Delivery Company added successfully",
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

router.put("/:id", auth.required, upload, (req, res) => {
  const { id } = req.params;
  const image = req.data ? req.data.image : null;
  const company = image ? { ...req.body, image: image[0] } : { ...req.body };

  DeliveryCompanies.findByIdAndUpdate(id, company, { new: true })
    .populate("contactPerson", "_id name email")
    .populate("deliveryPackages")
    .then((data) =>
      res.status(200).send({
        data,
        message: "Delivery Company updated successfully",
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

router.delete("/:id", auth.required, (req, res) => {
  const { id } = req.params;
  DeliveryCompanies.findOneAndUpdate(id, { isDeleted: true }, { new: true })
    .then(() =>
      res.status(200).send({
        data: null,
        message: "Delivery Company deleted successfully",
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

module.exports = router;
