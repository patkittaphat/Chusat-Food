
import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import "./Admin.css";

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
		<div className="admin-layout">
			<AdminSidebar currentPage="add" setPage={() => {}} />
			<div className="admin-main-content">
				<div className="add">
					<form className="flex-col" onSubmit={onSubmitHandler}>
						<div className="add-img-upload flex-col">
							<p>Upload image</p>
							<input
								onChange={(e) => {
									setImage(e.target.files[0]);
									e.target.value = "";
								}}
								type="file"
								accept="image/*"
								id="image"
								hidden
							/>
							<label htmlFor="image">
								<img
									src={!image ? assets.upload_area : URL.createObjectURL(image)}
									alt=""
								/>
							</label>
						</div>
						<div className="add-product-name flex-col">
							<p>Product name</p>
							<input
								name="name"
								onChange={onChangeHandler}
								value={data.name}
								type="text"
								placeholder="Type here"
								required
							/>
						</div>
						<div className="add-product-description flex-col">
							<p>Product description</p>
							<textarea
								name="description"
								onChange={onChangeHandler}
								value={data.description}
								type="text"
								rows={6}
								placeholder="Write content here"
								required
							/>
						</div>
						<div className="add-category-price">
							<div className="add-category flex-col">
								<p>Product category</p>
								<select
									name="category"
									onChange={onChangeHandler}
									value={data.category}
									required
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
							<div className="add-price flex-col">
								<p>Product Price</p>
								<input
									type="Number"
									name="price"
									onChange={onChangeHandler}
									value={data.price}
									placeholder="25"
								/>
							</div>
						</div>
						<button type="submit" className="add-btn">
							ADD
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddItem;
