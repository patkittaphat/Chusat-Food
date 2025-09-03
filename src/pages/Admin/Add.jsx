import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddItem = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Rice",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Image not selected");
      return null;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${apiUrl}/api/food/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: data.category,
      });
      setImage(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Food Item</h1>
      <form onSubmit={onSubmitHandler} className="space-y-6 bg-white rounded-lg shadow p-6">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Upload image
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              e.target.value = "";
            }}
            type="file"
            accept="image/*"
            id="image"
            className="hidden"
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-md text-gray-500 cursor-pointer hover:bg-gray-50"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <span className="text-sm">Click to upload</span>
            )}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product description</label>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product category</label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Rice">Rice</option>
              <option value="Sidedish">Sidedish</option>
              <option value="Noodle">Noodle</option>
              <option value="Soup">Soup</option>
              <option value="Dimsum">Dimsum</option>
              <option value="Drink">Drink</option>
              <option value="ingredients">ingredients</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product price</label>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
