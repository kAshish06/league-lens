import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import LeagueList from "../LeagueList";
import { useLeaguesQuery } from "../queries/leaguesQuery";
import type { UseQueryResult } from "@tanstack/react-query";
import type { League } from "../types"; // Import League type from types.ts

// Mock react-router to control useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

// Mock the leagues query hook
jest.mock("../queries/leaguesQuery");

const mockLeagues: League[] = [
  {
    idLeague: "1",
    strLeague: "Premier League",
    strSport: "Soccer",
    strLeagueAlternate: "EPL",
  },
  {
    idLeague: "2",
    strLeague: "NBA",
    strSport: "Basketball",
    strLeagueAlternate: "National Basketball Association",
  },
  {
    idLeague: "3",
    strLeague: "La Liga",
    strSport: "Soccer",
    strLeagueAlternate: "La Liga Santander",
  },
];

describe("LeagueList Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Reset the mock navigate function
    mockNavigate.mockClear();

    // Default mock implementation for useLeaguesQuery
    (useLeaguesQuery as jest.Mock).mockReturnValue({
      data: mockLeagues,
      isLoading: false,
      isError: false,
      error: null,
    } as UseQueryResult<League[], Error>);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <LeagueList />
      </MemoryRouter>
    );
  };

  it("renders loading state", () => {
    (useLeaguesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as UseQueryResult<League[], Error>);

    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useLeaguesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
    } as UseQueryResult<League[], Error>);

    renderComponent();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders all leagues initially", () => {
    renderComponent();

    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("NBA")).toBeInTheDocument();
    expect(screen.getByText("La Liga")).toBeInTheDocument();
    expect(screen.getByText("3 leagues found")).toBeInTheDocument();
  });

  it("filters leagues by search term", async () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search leagues...");
    await userEvent.type(searchInput, "premier");

    await waitFor(() => {
      expect(screen.getByText("1 league found")).toBeInTheDocument();
      expect(screen.getByText("Premier League")).toBeInTheDocument();
      expect(screen.queryByText("La Liga")).not.toBeInTheDocument();
      expect(screen.queryByText("NBA")).not.toBeInTheDocument();
    });
  });

  it("filters leagues by sport", async () => {
    renderComponent();

    const sportFilterContainer = screen.getByTestId("sport-filter");
    const sportSelectButton = within(sportFilterContainer).getByRole("button");

    // Click the button to open the dropdown
    await userEvent.click(sportSelectButton);

    // Click the desired option in the dropdown using role and name
    await userEvent.click(screen.getByRole("option", { name: "Basketball" }));

    await waitFor(() => {
      expect(screen.getByText("1 league found")).toBeInTheDocument();
      expect(screen.getByText("NBA")).toBeInTheDocument();
      expect(screen.queryByText("Premier League")).not.toBeInTheDocument();
      expect(screen.queryByText("La Liga")).not.toBeInTheDocument();
    });
  });

  it("shows no results message when no leagues match filters", async () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search leagues...");
    await userEvent.type(searchInput, "NonExistentLeague");

    await waitFor(() => {
      expect(
        screen.getByText("No leagues found matching your search.")
      ).toBeInTheDocument();
      expect(screen.getByText("0 leagues found")).toBeInTheDocument();
    });
  });

  it("combines search and sport filters", async () => {
    renderComponent();

    // First filter by sport
    const sportFilterContainer = screen.getByTestId("sport-filter");
    const sportSelectButton = within(sportFilterContainer).getByRole("button");
    await userEvent.click(sportSelectButton);

    // Click the desired option in the dropdown using role and name
    await userEvent.click(screen.getByRole("option", { name: "Soccer" }));

    // Then search within soccer leagues
    const searchInput = screen.getByPlaceholderText("Search leagues...");
    await userEvent.type(searchInput, "Premier");

    await waitFor(() => {
      expect(screen.getByText("1 league found")).toBeInTheDocument();
      expect(screen.getByText("Premier League")).toBeInTheDocument();
      expect(screen.queryByText("La Liga")).not.toBeInTheDocument();
      expect(screen.queryByText("NBA")).not.toBeInTheDocument();
    });
  });

  it("navigates to league details when a card is clicked", async () => {
    renderComponent();

    // Find the Premier League card by its text content
    const premierLeagueCard = screen.getByText("Premier League");

    // Click the card
    await userEvent.click(premierLeagueCard);

    // Assert that the mockNavigate function was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/leagues/1");
  });
});
