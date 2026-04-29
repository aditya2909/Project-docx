import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/API";

const CreateDocument = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await API.get("/product");
      setProducts(data.product);
    };
    getProducts();
  }, []);

  const [formData, setFormData] = useState({
    projName: "",
    projLocation: "",
    clientName: "",
    clientLocation: "",
    productName: "",
    orderDate: "",
    engineNo: "",
    alternatorNo: "",
    orderNo: "",
    installationDate: "",
    dateOfSubstantial: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value,
    };

    if (name === "warrantyStartDate" && value) {
      const date = new Date(value);

      // +2 years
      date.setFullYear(date.getFullYear() + 2);

      // -1 day
      date.setDate(date.getDate() - 1);

      updatedData.warrantyEndDate = date.toISOString().split("T")[0];
    }

    setFormData(updatedData);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    await API.post("/document/create", formData);

    // 👉 Later connect API here

    navigate("/"); // redirect after submit
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-[80%] py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold">Create Document</h1>

          <div></div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <div className="flex flex-col gap-1">
            <label>Project Name</label>
            {/* Project Name */}
            <input
              type="text"
              name="projName"
              placeholder="Project Name *"
              value={formData.projName}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Project Location</label>
            {/* Project Location */}
            <input
              type="text"
              name="projLocation"
              placeholder="Project Location *"
              value={formData.projLocation}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Client Name</label>
            {/* Client Name */}
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Client Location</label>
            {/* Client Location */}
            <input
              type="text"
              name="clientLocation"
              placeholder="Client Location"
              value={formData.clientLocation}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product</label>
            {/* Product Name (ID for now) */}
            <select
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            >
              <option value="">Select Product *</option>

              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.prodName} {/* or product.productName */}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Order Date</label>
            {/* Order Date */}
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Engine No</label>
            {/* Engine No */}
            <input
              type="text"
              name="engineNo"
              placeholder="Engine No"
              value={formData.engineNo}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Alternator No</label>
            {/* Alternator No */}
            <input
              type="text"
              name="alternatorNo"
              placeholder="Alternator No"
              value={formData.alternatorNo}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Order No</label>
            {/* Order No */}
            <input
              type="text"
              name="orderNo"
              placeholder="Order No"
              value={formData.orderNo}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Date of Substantial</label>
            {/* Date of Substantial */}
            <input
              type="date"
              name="dateOfSubstantial"
              value={formData.dateOfSubstantial}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Date of Installation</label>
            <input
              type="date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Warranty Start Date</label>
            {/* Warranty Date */}
            <input
              type="date"
              name="warrantyStartDate"
              placeholder="Warranty Date"
              value={formData.warrantyStartDate}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Warranty End Date</label>
            <input
              type="date"
              name="warrantyEndDate"
              value={formData.warrantyEndDate}
              readOnly
              className="border p-2 rounded-lg bg-gray-100"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
