import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Dashboard = ({ token, user }) => {
	const [subscriptions, setSubscriptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		service_name: "",
		monthly_cost: "",
		next_payment_date: "",
		payment_method: "",
	});

	const fetchSubscriptions = useCallback(async () => {
		try {
			const response = await axios.get(
				`${
					process.env.REACT_APP_API_URL ||
					"https://subtrack-backend.azurewebsites.net"
				}/api/subscriptions`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setSubscriptions(response.data);
		} catch (error) {
			console.error("Error fetching subscriptions:", error);
		} finally {
			setLoading(false);
		}
	}, [token]);

	useEffect(() => {
		fetchSubscriptions();
	}, [fetchSubscriptions]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`${
					process.env.REACT_APP_API_URL ||
					"https://subtrack-backend.azurewebsites.net"
				}/api/subscriptions`,
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setFormData({
				service_name: "",
				monthly_cost: "",
				next_payment_date: "",
				payment_method: "",
			});
			setShowForm(false);
			fetchSubscriptions();
		} catch (error) {
			console.error("Error adding subscription:", error);
		}
	};

	const calculateTotalMonthly = () => {
		return subscriptions
			.reduce((total, sub) => total + parseFloat(sub.monthly_cost || 0), 0)
			.toFixed(2);
	};

	if (loading) return <div className="loading">Loading subscriptions...</div>;

	return (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1>
					Welcome {user.name}! Today's date is {new Date().toLocaleDateString()}
				</h1>
				<h2>Your Subscriptions</h2>
				<div className="dashboard-stats">
					<span className="stat-item">
						📊 Total Monthly: ${calculateTotalMonthly()}
					</span>
					<span className="stat-item">
						📅 Active Subscriptions: {subscriptions.length}
					</span>
				</div>
				<button onClick={() => setShowForm(!showForm)} className="add-btn">
					{showForm ? "Cancel" : "Add Subscription"}
				</button>
			</div>

			{showForm && (
				<form onSubmit={handleSubmit} className="subscription-form">
					<div className="form-row">
						<input
							type="text"
							name="service_name"
							placeholder="Service Name (e.g., Netflix)"
							value={formData.service_name}
							onChange={handleInputChange}
							required
						/>
						<input
							type="number"
							step="0.01"
							name="monthly_cost"
							placeholder="Monthly Cost"
							value={formData.monthly_cost}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-row">
						<input
							type="date"
							name="next_payment_date"
							value={formData.next_payment_date}
							onChange={handleInputChange}
							required
						/>
						<input
							type="text"
							name="payment_method"
							placeholder="Payment Method"
							value={formData.payment_method}
							onChange={handleInputChange}
							required
						/>
					</div>
					<button type="submit" className="submit-btn">
						Add Subscription
					</button>
				</form>
			)}

			<div className="stats">
				<div className="stat-card">
					<h3>Total Monthly Cost</h3>
					<p className="stat-value">${calculateTotalMonthly()}</p>
				</div>
				<div className="stat-card">
					<h3>Active Subscriptions</h3>
					<p className="stat-value">{subscriptions.length}</p>
				</div>
			</div>

			<div className="subscriptions-list">
				{subscriptions.length === 0 ? (
					<p className="no-subscriptions">
						No subscriptions yet. Add your first one!
					</p>
				) : (
					subscriptions.map((subscription) => (
						<div key={subscription.id} className="subscription-card">
							<div className="subscription-info">
								<h4>{subscription.service_name}</h4>
								<p className="cost">${subscription.monthly_cost}/month</p>
								<p className="next-payment">
									Next payment:{" "}
									{new Date(
										subscription.next_payment_date
									).toLocaleDateString()}
								</p>
								<p className="payment-method">
									via {subscription.payment_method}
								</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Dashboard;
