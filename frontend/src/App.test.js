import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
global.localStorage = localStorageMock;

const AppWithRouter = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

test("renders SubTrack title", () => {
	localStorageMock.getItem.mockReturnValue(null);
	render(<AppWithRouter />);
	const titleElement = screen.getByText(/SubTrack/i);
	expect(titleElement).toBeInTheDocument();
});

test("redirects to login when not authenticated", () => {
	localStorageMock.getItem.mockReturnValue(null);
	render(<AppWithRouter />);
	const loginTitle = screen.getByText(/Login to SubTrack/i);
	expect(loginTitle).toBeInTheDocument();
});

test("shows logout button when authenticated", () => {
	localStorageMock.getItem
		.mockReturnValueOnce("fake-token")
		.mockReturnValueOnce(
			'{"id": 1, "name": "Test User", "email": "test@example.com"}'
		);

	render(<AppWithRouter />);
	const logoutButton = screen.getByText(/Logout/i);
	expect(logoutButton).toBeInTheDocument();
});
