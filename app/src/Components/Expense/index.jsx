import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../AuthenticationProvider";

const Expense = () => {
	const [categories, setCategories] = useState([]);
	const [formResponse, setFormResponse] = useState({});
	const { authData } = useContext(AuthenticationContext);
	const [expenseItem, setExpenseItem] = useState([]);

	function getDate(time) {
		if (!time) return;
		const date = new Date(time);
		return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getDate()).padStart(
			2,
			"0"
		)}`;
	}

	const ExpenseItem = (prop) => {
		return (
			<tr data-id={prop.id}>
				<td>{getDate(prop.expensedate)}</td>
				<td>{prop.amount}</td>
				<td>{prop.description}</td>
				<td>{prop.category.name}</td>
				<td>
					<button className="edit" data-data={JSON.stringify(prop)} data-id={prop.id} onClick={editExpense}>
						Edit
					</button>
					<button className="delete" data-id={prop.id} onClick={deleteExpense}>
						Delete
					</button>
				</td>
			</tr>
		);
	};

	async function editExpense(e) {
		const elem = e.target;

		setFormResponse({ ...JSON.parse(elem.dataset.data), open: true });
		// setEditData();
	}

	async function deleteExpense(e) {
		if (!confirm("Do you really want to delete this expense")) {
			return;
		}

		const elem = e.target;

		const res = await fetch(`http://localhost:8080/api/expense/${elem.dataset.id}`, {
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
			res = await fetch(`http://localhost:8080/api/expense/${formResponse?.id}`, {
				method: "put",
				body: JSON.stringify(formResponse),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			res = await fetch("http://localhost:8080/api/expenses", {
				method: "post",
				body: JSON.stringify(formResponse),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		if (res.ok) {
			const data = await res.json();
			// alert("SuccessFul");

			if (formResponse.id) {
				// searching for index
				const index = Array(...document.querySelectorAll("tr[data-id")).findLastIndex((e) => {
					return e.dataset.id == formResponse.id;
				});

				setExpenseItem((prevExpenseItem) =>
					prevExpenseItem.map((item, idx) => (idx == index ? <ExpenseItem {...data} /> : item))
				);
			} else setExpenseItem((prevExpenseItem) => [...prevExpenseItem, <ExpenseItem {...data} />]);

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
			expensedate: new Date(prevFormResponse.expensedate || null)?.toISOString(),
			category:
				typeof prevFormResponse?.category == "object"
					? prevFormResponse.category
					: categories.find((cat) => cat.id == prevFormResponse.category),
			user: authData,
		}));
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(`http://localhost:8080/api/expenses/user/${authData?.id}`, {
					method: "get",
				});
				if (!res.ok) {
					throw new Error("Unable to get data at the moment");
				}

				const data = await res.json();
				setExpenseItem(data.map((expense, idx) => <ExpenseItem key={idx} {...expense} />));
			} catch (e) {
				console.log(e);
				alert(e.message);
			}

			// loading all categories
			try {
				const res = await fetch("http://localhost:8080/api/categories");
				if (!res.ok) {
					throw new Error("Unable to get data at the moment");
				}

				const data = await res.json();

				setCategories(data);
			} catch (e) {}
		}
		fetchData();
	}, []);

	return (
		<div id="expenses">
			<div id="add_btn">
				<button
					onClick={() => {
						setFormResponse((prevFormResponse) => ({ open: !prevFormResponse.open }));
					}}
				>
					Add New Expense
				</button>
			</div>

			{formResponse.open && (
				<div className="form">
					<form onSubmit={handleSubmit}>
						<input type="hidden" name="id" value={formResponse?.id} />
						<div className="form-field">
							<label htmlFor="">Amount</label>
							<input
								type="number"
								name="amount"
								id="amount"
								value={formResponse?.amount}
								onChange={inputChange}
								required
							/>
						</div>

						<div className="form-field">
							<label htmlFor="d">Description</label>
							<input
								type="text"
								name="description"
								value={formResponse?.description}
								onChange={inputChange}
								required
							/>
						</div>

						<div className="form-field">
							<label htmlFor="">Date</label>
							<input
								type="date"
								name="expensedate"
								value={getDate(formResponse?.expensedate)}
								onChange={inputChange}
								required
							/>
						</div>

						<div className="form-field">
							<label htmlFor="">Category</label>

							<select name="category" value={formResponse?.category?.id} onChange={inputChange} required>
								<option disabled selected>
									-- Choose --
								</option>
								{categories.map((category, idx) => (
									<option value={category.id} key={idx}>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className="form-field">
							<button type="submit">Continue</button>
						</div>
					</form>
				</div>
			)}

			<div id="expese-record" className="record">
				<table>
					<thead>
						<tr>
							<th>Time</th>
							<th>Amount</th>
							<th>Description</th>
							<th>Category</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>{expenseItem}</tbody>
				</table>
			</div>
		</div>
	);
};

export default Expense;
