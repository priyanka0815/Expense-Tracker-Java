import React, { useEffect, useState } from "react";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [formResponse, setFormResponse] = useState({});
	const [categoryItem, setCategoryItem] = useState([]);

	const CategoryItem = (prop) => {
		return (
			<tr data-id={prop.id}>
				<td>{prop.id}</td>
				<td>{prop.name}</td>
				<td>
					<button className="edit" data-data={JSON.stringify(prop)} data-id={prop.id} onClick={editCategory}>
						Edit
					</button>
					<button className="delete" data-id={prop.id} onClick={deleteCategory}>
						Delete
					</button>
				</td>
			</tr>
		);
	};

	async function editCategory(e) {
		const elem = e.target;

		setFormResponse({ ...JSON.parse(elem.dataset.data), open: true });
		// setEditData();
	}

	async function deleteCategory(e) {
		if (!confirm("Do you really want to delete this expense")) {
			return;
		}

		const elem = e.target;

		const res = await fetch(`http://localhost:8080/api/category/${elem.dataset.id}`, {
			method: "DELETE",
			"Cache-Control": "no-cache",
		});
		if (res.ok) {
			elem.closest("tr").remove();
		} else {
			alert("Can't remove the Expense");
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();

		var res;

		if (formResponse?.id) {
			res = await fetch(`http://localhost:8080/api/category/${formResponse?.id}`, {
				method: "put",
				body: JSON.stringify(formResponse),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			res = await fetch("http://localhost:8080/api/category", {
				method: "post",
				body: JSON.stringify(formResponse),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		if (res.ok) {
			// alert("SuccessFul");
			const data = await res.json();

			if (formResponse.id) {
				// searching for index
				const index = Array(...document.querySelectorAll("tr[data-id")).findLastIndex((e) => {
					return e.dataset.id == formResponse.id;
				});

				setCategoryItem((prevCategoryItem) =>
					prevCategoryItem.map((item, idx) => (idx == index ? <CategoryItem {...data} key={idx} /> : item))
				);
			} else setCategoryItem((prevCategoryItem) => [...prevCategoryItem, <CategoryItem {...data} />]);

			setFormResponse({});
		} else {
			alert("Not able to add the expense at the Moment");
		}
	}

	function inputChange(e) {
		e.persist();

		setFormResponse((prevFormResponse) => ({
			...prevFormResponse,
			[e.target.name]: e.target.value,
		}));

		setFormResponse((prevFormResponse) => ({
			...prevFormResponse,
		}));
	}

	useEffect(() => {
		async function fetchData() {
			// loading all categories
			try {
				const res = await fetch("http://localhost:8080/api/categories");
				if (!res.ok) {
					throw new Error("Unable to get data at the moment");
				}

				const data = await res.json();

				setCategoryItem(data.map((category, idx) => <CategoryItem key={idx} {...category} />));
			} catch (e) {}
		}
		fetchData();
	}, []);

	return (
		<div id="categories">
			<div id="add_btn">
				<button
					onClick={() => {
						setFormResponse((prevFormResponse) => ({ open: !prevFormResponse.open }));
					}}
				>
					Add New Category
				</button>
			</div>

			{formResponse.open && (
				<div className="form">
					<form onSubmit={handleSubmit}>
						<input type="hidden" name="id" value={formResponse?.id} />

						<div className="form-field">
							<label htmlFor="">Category</label>

							<input type="text" name="name" value={formResponse.name} onChange={inputChange} />
						</div>

						<div className="form-field">
							<button type="submit">Continue</button>
						</div>
					</form>
				</div>
			)}

			<div id="category-record" className="record">
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>{categoryItem}</tbody>
				</table>
			</div>
		</div>
	);
};

export default Category;
