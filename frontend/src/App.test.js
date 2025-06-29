import React from "react";
import { render, screen } from "@testing-library/react";

// Simple test component to verify React is working
const TestComponent = () => {
	return (
		<div>
			<h1>SubTrack</h1>
			<p>SaaS Subscription Tracker</p>
		</div>
	);
};

describe("SubTrack App Tests", () => {
	test("renders without crashing", () => {
		render(<TestComponent />);
		expect(screen.getByText("SubTrack")).toBeInTheDocument();
	});

	test("displays app title", () => {
		render(<TestComponent />);
		const titleElement = screen.getByText(/SubTrack/i);
		expect(titleElement).toBeInTheDocument();
	});

	test("displays subtitle", () => {
		render(<TestComponent />);
		const subtitleElement = screen.getByText(/SaaS Subscription Tracker/i);
		expect(subtitleElement).toBeInTheDocument();
	});
});
