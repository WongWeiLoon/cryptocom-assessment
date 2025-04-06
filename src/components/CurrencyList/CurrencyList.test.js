import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CurrencyList from "./index";

// Mock data
const mockCurrencyList = [
  { id: "1", name: "Bitcoin", symbol: "BTC" },
  { id: "2", name: "Ethereum", symbol: "ETH" },
  { id: "3", name: "Cronos", symbol: "CRO" },
  { id: "4", name: "US Dollar", symbol: "USD" },
];

const mockOnSearch = jest.fn();

describe("CurrencyList Component", () => {
  beforeEach(() => {
    mockOnSearch.mockClear(); // Clear mock function calls between tests
  });

  // Test 1: Renders correctly with initial props
  test("renders correctly with initial list", () => {
    const { getByText, getByPlaceholderText } = render(
      <CurrencyList onSearch={mockOnSearch} currencyList={mockCurrencyList} />
    );

    // Check if input is rendered
    expect(getByPlaceholderText("Search currency")).toBeTruthy();

    // Check if all initial items are rendered
    expect(getByText("Bitcoin")).toBeTruthy();
    expect(getByText("Ethereum")).toBeTruthy();
    expect(getByText("Cronos")).toBeTruthy();
    expect(getByText("US Dollar")).toBeTruthy();
  });

  // Test 2: Filtering works correctly (starts with name)
  test("filters list when typing a search term", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <CurrencyList onSearch={mockOnSearch} currencyList={mockCurrencyList} />
    );

    const input = getByPlaceholderText("Search currency");
    fireEvent.changeText(input, "Bit");

    // Bitcoin should still be visible
    expect(getByText("Bitcoin")).toBeTruthy();

    // Other items should not be visible
    expect(queryByText("Ethereum")).toBeNull();
    expect(queryByText("Cronos")).toBeNull();
    expect(queryByText("US Dollar")).toBeNull();
  });

  // Test 3: Filtering by symbol
  test("filters the list by symbol", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <CurrencyList onSearch={mockOnSearch} currencyList={mockCurrencyList} />
    );

    const input = getByPlaceholderText("Search currency");
    fireEvent.changeText(input, "CRO");

    // Cronos should be visible
    expect(getByText("Cronos")).toBeTruthy();

    // Others should not
    expect(queryByText("Bitcoin")).toBeNull();
    expect(queryByText("Ethereum")).toBeNull();
    expect(queryByText("US Dollar")).toBeNull();
  });

  // Test 4: Shows EmptyView when no results are found
  test("shows EmptyView when no matches are found", async () => {
    const { getByPlaceholderText, getByText } = render(
      <CurrencyList onSearch={mockOnSearch} currencyList={mockCurrencyList} />
    );

    const searchInput = getByPlaceholderText("Search currency");

    // Search for non-existent currency
    fireEvent.changeText(searchInput, "xyz");

    // Check for EmptyView content
    expect(getByText("No Results")).toBeTruthy();
    expect(getByText('Try "CRO"')).toBeTruthy();
    // No items should be visible
    expect(queryByText("Bitcoin")).toBeNull();
  });
});
